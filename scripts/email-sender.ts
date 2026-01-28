#!/usr/bin/env ts-node

import nodemailer from 'nodemailer';
// @ts-ignore - No types available for nodemailer-express-handlebars
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { logger } from './utils/logger';
import { detectCI } from './utils/ci-detector';

/**
 * Email Notification Service
 * Sends test reports via Gmail SMTP with Handlebars templates
 */

interface TestStats {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
}

interface EmailOptions {
    to: string[];
    subject: string;
    template: string;
    context: any;
}

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Validate credentials
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            throw new Error('Gmail credentials not configured (GMAIL_USER, GMAIL_APP_PASSWORD)');
        }

        // Create transporter
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Setup Handlebars
        this.transporter.use(
            'compile',
            hbs({
                viewEngine: {
                    extname: '.hbs',
                    layoutsDir: path.resolve('./config/views/'),
                    defaultLayout: false,
                    partialsDir: path.resolve('./config/views/'),
                },
                viewPath: path.resolve('./config/views/'),
                extName: '.hbs',
            })
        );
    }

    async sendEmail(options: EmailOptions): Promise<void> {
        try {
            const info = await this.transporter.sendMail({
                from: `"${process.env.COMPANY_NAME} QA" <${process.env.GMAIL_USER}>`,
                to: options.to.join(','),
                subject: options.subject,
                template: options.template,
                context: options.context,
            } as any);

            logger.success(`Email sent: ${(info as any).messageId}`);
            logger.info(`Recipients: ${options.to.join(', ')}`);
        } catch (error) {
            logger.error('Failed to send email:', error);
            throw error;
        }
    }

    async verifyConnection(): Promise<boolean> {
        try {
            await this.transporter.verify();
            logger.success('Gmail SMTP connection verified');
            return true;
        } catch (error) {
            logger.error('Gmail SMTP connection failed:', error);
            return false;
        }
    }
}

/**
 * Parse JUnit XML to extract test statistics
 */
function parseJUnitResults(): TestStats {
    const junitPath = path.resolve('./junit/results.xml');

    if (!existsSync(junitPath)) {
        logger.warning('JUnit results not found, using default stats');
        return { total: 0, passed: 0, failed: 0, skipped: 0 };
    }

    try {
        const xml = readFileSync(junitPath, 'utf-8');

        // Simple regex parsing (for production, use xml2js or similar)
        const testsMatch = xml.match(/tests="(\d+)"/);
        const failuresMatch = xml.match(/failures="(\d+)"/);
        const skippedMatch = xml.match(/skipped="(\d+)"/);

        const total = testsMatch ? parseInt(testsMatch[1]) : 0;
        const failed = failuresMatch ? parseInt(failuresMatch[1]) : 0;
        const skipped = skippedMatch ? parseInt(skippedMatch[1]) : 0;
        const passed = total - failed - skipped;

        return { total, passed, failed, skipped };
    } catch (error) {
        logger.error('Failed to parse JUnit results:', error);
        return { total: 0, passed: 0, failed: 0, skipped: 0 };
    }
}

/**
 * Send test report email
 */
export async function sendTestReport(): Promise<void> {
    logger.header('Sending Email Report');

    // Parse test results
    const stats = parseJUnitResults();
    const passed = stats.failed === 0;

    logger.info(`Test Results: ${stats.passed}/${stats.total} passed`);

    // Determine recipients
    const recipientsEnv = passed
        ? process.env.EMAIL_RECIPIENTS_PASSED
        : process.env.EMAIL_RECIPIENTS_FAILED;

    const recipients = recipientsEnv?.split(',').map((r) => r.trim()) || [];

    if (recipients.length === 0) {
        logger.warning('No email recipients configured, skipping email');
        return;
    }

    // Get execution context
    const executionMode = process.env.EXECUTION_MODE || 'local';
    const environment = process.env.TEST_ENV || 'dev';
    const browser = process.env.BROWSERS || 'chrome';
    const ciInfo = detectCI();

    // Determine report URL
    let reportUrl = process.env.REPORT_URL || '';
    if (!reportUrl && ciInfo.platform === 'gitlab') {
        const namespace = process.env.CI_PROJECT_NAMESPACE;
        const project = process.env.CI_PROJECT_NAME;
        const pipelineId = process.env.CI_PIPELINE_ID;
        reportUrl = `https://${namespace}.gitlab.io/${project}/reports/${pipelineId}`;
    }

    // Create email service
    const emailService = new EmailService();

    // Verify connection
    const connected = await emailService.verifyConnection();
    if (!connected) {
        logger.error('Email service not available');
        return;
    }

    // Send email
    await emailService.sendEmail({
        to: recipients,
        subject: `[${executionMode.toUpperCase()}] WDIO Test Report - ${passed ? 'PASSED ✅' : 'FAILED ❌'} - ${environment}`,
        template: 'test-report',
        context: {
            passed,
            stats,
            executionMode,
            environment,
            browser,
            platform: ciInfo.platform,
            buildNumber: ciInfo.buildNumber || 'N/A',
            buildUrl: ciInfo.buildUrl || '#',
            branch: ciInfo.branch || 'N/A',
            reportUrl: reportUrl || '#',
            companyName: process.env.COMPANY_NAME || 'QA Team',
            companyWebsite: process.env.COMPANY_WEBSITE || '',
            companyLogo: process.env.COMPANY_LOGO_URL || '',
            timestamp: new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        },
    });

    logger.success('✅ Email sent successfully!\n');
}

// Run if executed directly
if (require.main === module) {
    sendTestReport().catch((error) => {
        logger.error('Failed to send test report:', error);
        process.exit(1);
    });
}
