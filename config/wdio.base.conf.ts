import type { Options } from '@wdio/types';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

// Load environment from single .env file
const envPath = path.resolve(process.cwd(), '.env');
dotenvConfig({ path: envPath });

// Get environment from TEST_ENV variable
const env = process.env.TEST_ENV || 'dev';

export const baseConfig: Partial<Options.Testrunner> = {
    // ====================
    // Test Specs
    // ====================
    specs: ['./tests/specs/**/*.spec.ts'],
    exclude: [],

    // ====================
    // Test Configuration
    // ====================
    // Maximum instances to run in parallel
    maxInstances: parseInt(process.env.WORKERS || '4'),

    // Level of logging verbosity
    logLevel: (process.env.LOG_LEVEL as Options.Testrunner['logLevel']) || 'info',

    // If you only want to run your tests until a specific amount of tests have failed
    bail: 0,

    // Base URL for browser.url() commands
    baseUrl: process.env[`BASE_URL_${env.toUpperCase()}`] || 'http://localhost',

    // Default timeout for all waitFor* commands
    waitforTimeout: 10000,

    // Default timeout in milliseconds for request
    connectionRetryTimeout: 120000,

    // Default request retries count
    connectionRetryCount: 3,

    // ====================
    // Test Framework
    // ====================
    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    // ====================
    // Reporters
    // ====================
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: false,
                addConsoleLogs: true,
            },
        ],
        [
            'junit',
            {
                outputDir: './junit',
                outputFileFormat: () => 'results.xml',
                errorOptions: {
                    error: 'message',
                    failure: 'message',
                    stacktrace: 'stack',
                },
            },
        ],
        // Slack reporter (conditional based on env variable)
        ...(process.env.SLACK_ENABLED === 'true' && process.env.SLACK_WEBHOOK_URL
            ? [
                [
                    '@moroo/wdio-slack-reporter',
                    {
                        slackOptions: {
                            type: 'web-api',
                            webhook: process.env.SLACK_WEBHOOK_URL,
                            slackName: 'WDIO Test Reporter',
                            slackIconUrl:
                                'https://webdriver.io/img/webdriverio.png',
                        },
                        title: 'WDIO Test Results',
                        resultsUrl: process.env.REPORT_URL || '',
                    },
                ],
            ]
            : []),
    ] as any,

    // ====================
    // Hooks
    // ====================
    /**
     * Gets executed once before all workers get launched
     */
    onPrepare: async function () {
        console.log('🚀 Starting WDIO test execution...');
        console.log(`📍 Environment: ${env}`);
        console.log(`🔧 Execution Mode: ${process.env.EXECUTION_MODE || 'local'}`);
    },

    /**
     * Gets executed before test execution begins
     */
    before: async function () {
        // Import custom commands
        await import('../tests/support/custom-commands')

        // Set global timeout
        browser.setTimeout({
            implicit: 5000,
            pageLoad: 30000,
        })
    },

    /**
     * Runs after a test
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        // Take screenshot on failure
        if (!passed) {
            const timestamp = new Date().getTime();
            const testName = test.title.replace(/\s+/g, '_');
            const screenshotPath = `./screenshots/${testName}_${timestamp}.png`;

            await browser.saveScreenshot(screenshotPath);
            console.log(`📸 Screenshot saved: ${screenshotPath}`);
        }
    },

    /**
     * Gets executed after all workers got shut down and the process is about to exit
     */
    onComplete: async function (exitCode, config, capabilities, results) {
        console.log('✅ WDIO test execution completed');
    },
};
