import { baseConfig } from './wdio.base.conf';
import type { Options } from '@wdio/types';

/**
 * Cloud Execution Configuration
 * Uses Sauce Labs for cross-browser testing in the cloud
 */
export const config: Partial<WebdriverIO.Config> = {
    ...baseConfig,

    // ====================
    // Sauce Labs Credentials
    // ====================
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: (process.env.SAUCE_REGION as 'us' | 'eu') || 'us',

    // ====================
    // Capabilities
    // ====================
    capabilities: [
        // Chrome on Windows
        {
            browserName: 'chrome',
            browserVersion: 'latest',
            platformName: 'Windows 11',
            'sauce:options': {
                build: `Build-${new Date().getTime()}`,
                name: 'WDIO Cloud Test - Chrome',
                screenResolution: '1920x1080',
            },
        },
        // Firefox on Windows
        {
            browserName: 'firefox',
            browserVersion: 'latest',
            platformName: 'Windows 11',
            'sauce:options': {
                build: `Build-${new Date().getTime()}`,
                name: 'WDIO Cloud Test - Firefox',
                screenResolution: '1920x1080',
            },
        },
        // Safari on macOS
        {
            browserName: 'safari',
            browserVersion: 'latest',
            platformName: 'macOS 13',
            'sauce:options': {
                build: `Build-${new Date().getTime()}`,
                name: 'WDIO Cloud Test - Safari',
                screenResolution: '1920x1080',
            },
        },
    ],

    // ====================
    // Services
    // ====================
    services: [
        [
            'sauce',
            {
                sauceConnect: true,
                sauceConnectOpts: {
                    // Add Sauce Connect options if needed
                },
            },
        ],
        'shared-store-service',
    ],

    // ====================
    // Increase timeouts for cloud
    // ====================
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,
};
