import { BasePage } from './base.page'
import type { ChainablePromiseElement } from 'webdriverio'
import { CONFIG } from '../config'

/**
 * Mobile Page Object
 *
 * Base class for mobile-specific page objects (iOS & Android).
 * Extends BasePage with mobile-specific functionality.
 *
 * @abstract
 */
export abstract class MobilePage extends BasePage {
    /**
     * Check if platform is iOS
     */
    protected get isIOS(): boolean {
        return CONFIG.PLATFORM.IS_IOS
    }

    /**
     * Check if platform is Android
     */
    protected get isAndroid(): boolean {
        return CONFIG.PLATFORM.IS_ANDROID
    }

    /**
     * Tap on element (mobile-specific click)
     *
     * @param element - The element to tap
     */
    async tap(element: ChainablePromiseElement): Promise<void> {
        await element.waitForDisplayed()
        await element.click()
    }

    /**
     * Long press on element
     *
     * @param element - The element to long press
     * @param duration - Duration in milliseconds (default: 1000)
     */
    async longPress(
        element: ChainablePromiseElement,
        duration: number = 1000
    ): Promise<void> {
        await element.waitForDisplayed()
        await element.touchAction([
            { action: 'press' },
            { action: 'wait', ms: duration },
            { action: 'release' },
        ])
    }

    /**
     * Swipe on element
     *
     * @param element - The element to swipe on
     * @param direction - Swipe direction ('up', 'down', 'left', 'right')
     * @param distance - Swipe distance as percentage (0-1, default: 0.5)
     */
    async swipe(
        element: ChainablePromiseElement,
        direction: 'up' | 'down' | 'left' | 'right',
        distance: number = 0.5
    ): Promise<void> {
        await element.waitForDisplayed()
        const location = await element.getLocation()
        const size = await element.getSize()
        const centerX = location.x + size.width / 2
        const centerY = location.y + size.height / 2

        let startX = centerX
        let startY = centerY
        let endX = centerX
        let endY = centerY

        switch (direction) {
            case 'up':
                startY = centerY + (size.height * distance) / 2
                endY = centerY - (size.height * distance) / 2
                break
            case 'down':
                startY = centerY - (size.height * distance) / 2
                endY = centerY + (size.height * distance) / 2
                break
            case 'left':
                startX = centerX + (size.width * distance) / 2
                endX = centerX - (size.width * distance) / 2
                break
            case 'right':
                startX = centerX - (size.width * distance) / 2
                endX = centerX + (size.width * distance) / 2
                break
        }

        await browser.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 100 },
            { action: 'moveTo', x: endX, y: endY },
            { action: 'release' },
        ])
    }

    /**
     * Scroll to element (mobile-specific)
     *
     * @param element - The element to scroll to
     * @param maxScrolls - Maximum number of scroll attempts (default: 10)
     */
    async scrollToElement(
        element: ChainablePromiseElement,
        maxScrolls: number = 10
    ): Promise<void> {
        let scrollCount = 0

        while (scrollCount < maxScrolls) {
            const isDisplayed = await element.isDisplayed().catch(() => false)
            if (isDisplayed) {
                return
            }

            // Scroll down
            await this.swipeScreen('up')
            scrollCount++
        }

        throw new Error(
            `Element not found after ${maxScrolls} scroll attempts`
        )
    }

    /**
     * Swipe on screen
     *
     * @param direction - Swipe direction ('up', 'down', 'left', 'right')
     * @param distance - Swipe distance as percentage (0-1, default: 0.5)
     */
    async swipeScreen(
        direction: 'up' | 'down' | 'left' | 'right',
        distance: number = 0.5
    ): Promise<void> {
        const { width, height } = await browser.getWindowSize()
        const centerX = width / 2
        const centerY = height / 2

        let startX = centerX
        let startY = centerY
        let endX = centerX
        let endY = centerY

        switch (direction) {
            case 'up':
                startY = height * 0.8
                endY = height * 0.2
                break
            case 'down':
                startY = height * 0.2
                endY = height * 0.8
                break
            case 'left':
                startX = width * 0.8
                endX = width * 0.2
                break
            case 'right':
                startX = width * 0.2
                endX = width * 0.8
                break
        }

        await browser.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 100 },
            { action: 'moveTo', x: endX, y: endY },
            { action: 'release' },
        ])
    }

    /**
     * Hide keyboard (mobile-specific)
     */
    async hideKeyboard(): Promise<void> {
        if (this.isIOS) {
            await browser.hideKeyboard('pressKey', 'Done')
        } else if (this.isAndroid) {
            await browser.hideKeyboard()
        }
    }

    /**
     * Check if keyboard is shown
     *
     * @returns True if keyboard is shown
     */
    async isKeyboardShown(): Promise<boolean> {
        return await browser.isKeyboardShown()
    }

    /**
     * Get device orientation
     *
     * @returns Current orientation ('PORTRAIT' or 'LANDSCAPE')
     */
    async getOrientation(): Promise<string> {
        return await browser.getOrientation()
    }

    /**
     * Set device orientation
     *
     * @param orientation - Orientation to set ('PORTRAIT' or 'LANDSCAPE')
     */
    async setOrientation(orientation: 'PORTRAIT' | 'LANDSCAPE'): Promise<void> {
        await browser.setOrientation(orientation)
    }

    /**
     * Launch app
     */
    async launchApp(): Promise<void> {
        await browser.execute('mobile: launchApp', {})
    }

    /**
     * Close app
     */
    async closeApp(): Promise<void> {
        await browser.execute('mobile: terminateApp', {})
    }

    /**
     * Reset app
     */
    async resetApp(): Promise<void> {
        // Close and relaunch app
        await this.closeApp()
        await browser.pause(1000)
        await this.launchApp()
    }

    /**
     * Put app in background
     *
     * @param seconds - Seconds to keep app in background (default: 3)
     */
    async backgroundApp(seconds: number = 3): Promise<void> {
        await browser.background(seconds)
    }

    /**
     * Install app
     *
     * @param appPath - Path to app file
     */
    async installApp(appPath: string): Promise<void> {
        await browser.installApp(appPath)
    }

    /**
     * Remove app
     *
     * @param bundleId - App bundle ID (iOS) or package name (Android)
     */
    async removeApp(bundleId: string): Promise<void> {
        await browser.removeApp(bundleId)
    }

    /**
     * Check if app is installed
     *
     * @param bundleId - App bundle ID (iOS) or package name (Android)
     * @returns True if app is installed
     */
    async isAppInstalled(bundleId: string): Promise<boolean> {
        return await browser.isAppInstalled(bundleId)
    }

    /**
     * Get device time
     *
     * @returns Device time as string
     */
    async getDeviceTime(): Promise<string> {
        return await browser.getDeviceTime()
    }

    /**
     * Accept alert (mobile-specific)
     */
    async acceptAlert(): Promise<void> {
        if (this.isIOS) {
            await browser.acceptAlert()
        } else if (this.isAndroid) {
            // Android might need different handling
            await browser.acceptAlert()
        }
    }

    /**
     * Dismiss alert (mobile-specific)
     */
    async dismissAlert(): Promise<void> {
        if (this.isIOS) {
            await browser.dismissAlert()
        } else if (this.isAndroid) {
            await browser.dismissAlert()
        }
    }
}
