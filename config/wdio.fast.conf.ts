import { baseConfig } from './wdio.base.conf';
import type { Options } from '@wdio/types';

/**
 * Fast Execution Configuration
 * Uses DevTools Service for Chrome-only fast execution
 * Perfect for smoke tests and PR checks
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
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--window-size=1920,1080',
                ],
            },
        },
    ],

    // ====================
    // Services
    // ====================
    services: [
        'devtools',
        'shared-store-service',
    ],

    // ====================
    // Optimized Timeouts for Speed
    // ====================
    waitforTimeout: 5000,
    connectionRetryTimeout: 60000,
};
