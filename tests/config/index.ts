import 'dotenv/config'

/**
 * Centralized Configuration Management
 *
 * This file encapsulates all environment variable lookups and provides
 * a typed interface for the rest of the framework.
 *
 * Usage:
 * import { CONFIG } from '../config'
 * const url = CONFIG.URLS.BASE
 */

export const CONFIG = {
    ENV: process.env.ENV || 'development',
    PROJECT_NAME: process.env.PROJECT_NAME || 'wdio-test-automation',

    URLS: {
        BASE: process.env.BASE_URL || 'https://example.com',
        DEVELOPMENT: process.env.DEV_URL || 'http://localhost:3000',
        STAGING: process.env.STAGING_URL || '',
        PRODUCTION: process.env.PROD_URL || '',
    },

    CREDENTIALS: {
        ADMIN: {
            USERNAME: process.env.ADMIN_USERNAME || '',
            PASSWORD: process.env.ADMIN_PASSWORD || '',
        },
        USER: {
            USERNAME: process.env.USER_USERNAME || '',
            PASSWORD: process.env.USER_PASSWORD || '',
        },
        MANAGER: {
            USERNAME: process.env.MANAGER_USERNAME || '',
            PASSWORD: process.env.MANAGER_PASSWORD || '',
        },
    },

    SLACK: {
        WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
        ENABLED: process.env.SLACK_ENABLED === 'true',
        CHANNEL: process.env.SLACK_CHANNEL || '#test-automation',
    },

    EMAIL: {
        SMTP_HOST: process.env.SMTP_HOST || '',
        SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
        SMTP_USER: process.env.SMTP_USER || '',
        SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
        FROM: process.env.EMAIL_FROM || '',
        TO: process.env.EMAIL_TO || '',
        ENABLED: process.env.EMAIL_ENABLED === 'true',
    },

    BROWSERSTACK: {
        USER: process.env.BROWSERSTACK_USER || '',
        KEY: process.env.BROWSERSTACK_KEY || '',
        ENABLED: process.env.BROWSERSTACK_ENABLED === 'true',
        BUILD_NAME: process.env.BROWSERSTACK_BUILD_NAME || 'WDIO Test Build',
        PROJECT_NAME: process.env.BROWSERSTACK_PROJECT_NAME || 'WDIO Automation',
    },

    APPIUM: {
        HOST: process.env.APPIUM_HOST || 'localhost',
        PORT: parseInt(process.env.APPIUM_PORT || '4723'),
    },

    PLATFORM: {
        IS_MOBILE: ['android', 'ios'].includes(process.env.PLATFORM?.toLowerCase() || ''),
        IS_ANDROID: process.env.PLATFORM?.toLowerCase() === 'android',
        IS_IOS: process.env.PLATFORM?.toLowerCase() === 'ios',
        IS_WEB: !process.env.PLATFORM || process.env.PLATFORM?.toLowerCase() === 'web',
        CURRENT: process.env.PLATFORM?.toLowerCase() || 'web',
    },

    TIMEOUTS: {
        DEFAULT: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
        PAGE_LOAD: parseInt(process.env.PAGE_LOAD_TIMEOUT || '60000'),
        SCRIPT: parseInt(process.env.SCRIPT_TIMEOUT || '30000'),
        IMPLICIT: parseInt(process.env.IMPLICIT_TIMEOUT || '0'),
    },

    EXECUTION: {
        HEADLESS: process.env.HEADLESS === 'true',
        BROWSER: process.env.BROWSER || 'chrome',
        MAX_INSTANCES: parseInt(process.env.MAX_INSTANCES || '1'),
        RETRY: parseInt(process.env.RETRY || '0'),
    },

    REPORTING: {
        ALLURE_ENABLED: process.env.ALLURE_ENABLED !== 'false',
        VIDEO_ENABLED: process.env.VIDEO_ENABLED === 'true',
        SCREENSHOT_ON_FAILURE: process.env.SCREENSHOT_ON_FAILURE !== 'false',
    },
} as const

export type AppConfig = typeof CONFIG
