import { baseConfig } from './wdio.base.conf'
import type { Options } from '@wdio/types'

/**
 * Mobile Execution Configuration
 * Uses Appium Service for mobile web and native app testing
 * Supports both iOS and Android platforms
 */

// Determine platform from environment variable
const platform = (process.env.MOBILE_PLATFORM || 'Android').toLowerCase()
const isIOS = platform === 'ios'
const isAndroid = platform === 'android'

// Platform-specific capabilities
const getCapabilities = () => {
    if (isIOS) {
        return {
            platformName: 'iOS',
            'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 14',
            'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '16.0',
            'appium:automationName': 'XCUITest',
            'appium:browserName': 'Safari',
            'appium:newCommandTimeout': 240,
            'appium:wdaLaunchTimeout': 120000,
            'appium:wdaConnectionTimeout': 120000,
        }
    }

    // Android (default)
    return {
        platformName: 'Android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:browserName': 'Chrome',
        'appium:newCommandTimeout': 240,
    }
}

export const config: Partial<WebdriverIO.Config> = {
    ...baseConfig,

    // ====================
    // Appium Configuration
    // ====================
    port: parseInt(process.env.APPIUM_PORT || '4723'),
    hostname: process.env.APPIUM_HOST || 'localhost',

    // ====================
    // Capabilities
    // ====================
    capabilities: [getCapabilities()],

    // ====================
    // Services
    // ====================
    services: [
        [
            'appium',
            {
                command: 'appium',
                args: {
                    address: process.env.APPIUM_HOST || 'localhost',
                    port: parseInt(process.env.APPIUM_PORT || '4723'),
                    relaxedSecurity: true,
                },
                logPath: './logs/',
            },
        ],
    ],

    // ====================
    // Mobile-specific timeouts
    // ====================
    waitforTimeout: 15000,
    connectionRetryTimeout: 180000,

    // ====================
    // Hooks
    // ====================
    onPrepare: async function () {
        console.log(`🚀 Starting mobile test execution...`)
        console.log(`📱 Platform: ${isIOS ? 'iOS' : 'Android'}`)
        console.log(`📍 Appium: ${process.env.APPIUM_HOST || 'localhost'}:${process.env.APPIUM_PORT || '4723'}`)
    },
}
