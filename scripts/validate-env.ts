#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { logger } from './utils/logger';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

/**
 * Environment Validation Script
 * Validates all required dependencies and configurations before running tests
 */

interface ValidationResult {
    passed: boolean;
    message: string;
}

class EnvironmentValidator {
    private results: ValidationResult[] = [];
    private env: string;
    private executionMode: string;

    constructor() {
        this.env = process.env.TEST_ENV || 'dev';
        this.executionMode = process.env.EXECUTION_MODE || 'local';

        // Load environment file
        const envPath = path.resolve(process.cwd(), `.env.${this.env}`);
        if (existsSync(envPath)) {
            dotenvConfig({ path: envPath });
        }
    }

    async validate(): Promise<boolean> {
        logger.header('Environment Validation');

        this.checkJava();
        this.checkNodeVersion();
        this.checkEnvFile();
        this.checkGmailCredentials();
        this.checkExecutionMode();
        this.checkServiceCredentials();
        this.checkBaseUrl();

        this.printResults();

        return this.results.every((r) => r.passed);
    }

    private checkJava(): void {
        try {
            const version = execSync('java -version 2>&1', { encoding: 'utf-8' });
            const match = version.match(/version "(.+?)"/);
            const javaVersion = match ? match[1] : 'unknown';

            this.results.push({
                passed: true,
                message: `Java installed (${javaVersion})`,
            });
        } catch {
            this.results.push({
                passed: false,
                message: 'Java not found (required for Allure CLI)',
            });
        }
    }

    private checkNodeVersion(): void {
        const version = process.version;
        const majorVersion = parseInt(version.slice(1).split('.')[0]);

        if (majorVersion >= 18) {
            this.results.push({
                passed: true,
                message: `Node.js version ${version}`,
            });
        } else {
            this.results.push({
                passed: false,
                message: `Node.js version ${version} (requires >= 18)`,
            });
        }
    }

    private checkEnvFile(): void {
        const envFile = `.env.${this.env}`;

        if (existsSync(envFile)) {
            this.results.push({
                passed: true,
                message: `Environment file found: ${envFile}`,
            });
        } else {
            this.results.push({
                passed: false,
                message: `Environment file not found: ${envFile}`,
            });
        }
    }

    private checkGmailCredentials(): void {
        const user = process.env.GMAIL_USER;
        const password = process.env.GMAIL_APP_PASSWORD;

        if (user && password) {
            const maskedPassword = password.slice(0, 4) + '*'.repeat(password.length - 4);
            this.results.push({
                passed: true,
                message: `Gmail credentials configured (${user}, ${maskedPassword})`,
            });
        } else {
            this.results.push({
                passed: false,
                message: 'Gmail credentials missing (GMAIL_USER, GMAIL_APP_PASSWORD)',
            });
        }
    }

    private checkExecutionMode(): void {
        const validModes = ['local', 'fast', 'cloud', 'mobile'];

        if (validModes.includes(this.executionMode)) {
            this.results.push({
                passed: true,
                message: `Execution mode: ${this.executionMode}`,
            });
        } else {
            this.results.push({
                passed: false,
                message: `Invalid execution mode: ${this.executionMode} (must be: ${validModes.join(', ')})`,
            });
        }
    }

    private checkServiceCredentials(): void {
        if (this.executionMode === 'cloud') {
            const user = process.env.SAUCE_USERNAME;
            const key = process.env.SAUCE_ACCESS_KEY;

            if (user && key) {
                const maskedKey = key.slice(0, 4) + '*'.repeat(key.length - 4);
                this.results.push({
                    passed: true,
                    message: `Sauce Labs credentials configured (${user}, ${maskedKey})`,
                });
            } else {
                this.results.push({
                    passed: false,
                    message: 'Sauce Labs credentials required for cloud mode (SAUCE_USERNAME, SAUCE_ACCESS_KEY)',
                });
            }
        }

        if (this.executionMode === 'mobile') {
            const host = process.env.APPIUM_HOST;
            const port = process.env.APPIUM_PORT;

            if (host && port) {
                this.results.push({
                    passed: true,
                    message: `Appium configuration: ${host}:${port}`,
                });
            } else {
                this.results.push({
                    passed: false,
                    message: 'Appium configuration required for mobile mode (APPIUM_HOST, APPIUM_PORT)',
                });
            }
        }
    }

    private checkBaseUrl(): void {
        const baseUrl = process.env[`BASE_URL_${this.env.toUpperCase()}`];

        if (baseUrl) {
            try {
                new URL(baseUrl);
                this.results.push({
                    passed: true,
                    message: `Base URL: ${baseUrl}`,
                });
            } catch {
                this.results.push({
                    passed: false,
                    message: `Invalid BASE_URL format: ${baseUrl}`,
                });
            }
        } else {
            this.results.push({
                passed: false,
                message: `BASE_URL_${this.env.toUpperCase()} not configured`,
            });
        }
    }

    private printResults(): void {
        logger.divider();
        console.log('');

        this.results.forEach((r) => {
            if (r.passed) {
                logger.success(r.message);
            } else {
                logger.error(r.message);
            }
        });

        const passed = this.results.filter((r) => r.passed).length;
        const total = this.results.length;

        console.log('');
        logger.divider();
        console.log(`\n${passed}/${total} checks passed\n`);

        if (passed === total) {
            logger.success('✅ Environment validation passed!\n');
        } else {
            logger.error('❌ Environment validation failed!\n');
            process.exit(1);
        }
    }
}

// Run validation
(async () => {
    const validator = new EnvironmentValidator();
    await validator.validate();
})();
