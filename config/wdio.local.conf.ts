import { baseConfig } from './wdio.base.conf';
import type { Options } from '@wdio/types';

/**
 * Local Execution Configuration
 * Uses WDIO v9 built-in driver management
 * No need for chromedriver service - WDIO handles it automatically
 */
export const config: Partial<WebdriverIO.Config> = {
    ...baseConfig,

    // ====================
    // Capabilities
    // ====================
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--window-size=1920,1080',
                ],
            },
            acceptInsecureCerts: true,
        },
    ],

    // ====================
    // Services
    // ====================
    services: [],
};
