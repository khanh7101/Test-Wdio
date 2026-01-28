import type { ChainablePromiseElement } from 'webdriverio'
import { CONFIG } from '../config'

/**
 * Base Page Object
 *
 * Abstract base class for all page objects.
 * Provides common helper methods for page interactions.
 *
 * @abstract
 */
export abstract class BasePage {
    /**
     * Navigate to a specific path relative to base URL
     *
     * @param path - The path to navigate to (default: '')
     * @example
     * await this.navigateTo('login')
     * await this.navigateTo('dashboard/profile')
     */
    async navigateTo(path: string = ''): Promise<void> {
        const baseUrl = this.getBaseUrl()
        const url = path ? `${baseUrl}/${path}`.replace(/\/+/g, '/') : baseUrl
        await browser.safeNavigate(url)
    }

    /**
     * Get base URL based on current environment
     *
     * @returns The base URL for the current environment
     */
    protected getBaseUrl(): string {
        const env = CONFIG.ENV.toLowerCase()

        switch (env) {
            case 'production':
            case 'prod':
                return CONFIG.URLS.PRODUCTION || CONFIG.URLS.BASE
            case 'staging':
            case 'stg':
                return CONFIG.URLS.STAGING || CONFIG.URLS.BASE
            case 'development':
            case 'dev':
                return CONFIG.URLS.DEVELOPMENT || CONFIG.URLS.BASE
            default:
                return CONFIG.URLS.BASE
        }
    }

    /**
     * Wait for element and return it
     *
     * @param element - The element to wait for
     * @param timeout - Maximum time to wait (default: from CONFIG)
     * @returns The element after it exists
     */
    async waitForElement(
        element: ChainablePromiseElement,
        timeout: number = CONFIG.TIMEOUTS.DEFAULT
    ): Promise<ChainablePromiseElement> {
        await element.waitForExist({ timeout })
        return element
    }

    /**
     * Safe click with automatic loader wait
     *
     * @param element - The element to click
     */
    async safeClick(element: ChainablePromiseElement): Promise<void> {
        await element.safeClick()
        await browser.waitForLoader()
    }

    /**
     * Set value with automatic wait
     *
     * @param element - The element to set value on
     * @param value - The value to set
     */
    async setValue(
        element: ChainablePromiseElement,
        value: string
    ): Promise<void> {
        await element.waitAndSetValue(value)
    }

    /**
     * Get text from element
     *
     * @param element - The element to get text from
     * @returns The text content of the element
     */
    async getText(element: ChainablePromiseElement): Promise<string> {
        return await element.safeGetText()
    }

    /**
     * Check if element is displayed
     *
     * @param element - The element to check
     * @returns True if element is displayed, false otherwise
     */
    async isDisplayed(element: ChainablePromiseElement): Promise<boolean> {
        try {
            return await element.isDisplayed()
        } catch {
            return false
        }
    }

    /**
     * Check if element exists
     *
     * @param element - The element to check
     * @returns True if element exists, false otherwise
     */
    async isExisting(element: ChainablePromiseElement): Promise<boolean> {
        try {
            return await element.isExisting()
        } catch {
            return false
        }
    }

    /**
     * Wait for element to be displayed
     *
     * @param element - The element to wait for
     * @param timeout - Maximum time to wait (default: from CONFIG)
     */
    async waitForDisplayed(
        element: ChainablePromiseElement,
        timeout: number = CONFIG.TIMEOUTS.DEFAULT
    ): Promise<void> {
        await element.waitForDisplayed({ timeout })
    }

    /**
     * Wait for element to be clickable
     *
     * @param element - The element to wait for
     * @param timeout - Maximum time to wait (default: from CONFIG)
     */
    async waitForClickable(
        element: ChainablePromiseElement,
        timeout: number = CONFIG.TIMEOUTS.DEFAULT
    ): Promise<void> {
        await element.waitForClickable({ timeout })
    }

    /**
     * Scroll to element
     *
     * @param element - The element to scroll to
     */
    async scrollToElement(element: ChainablePromiseElement): Promise<void> {
        await element.scrollIntoView({ block: 'center' })
    }

    /**
     * Get current URL
     *
     * @returns The current URL
     */
    async getCurrentUrl(): Promise<string> {
        return await browser.getUrl()
    }

    /**
     * Get page title
     *
     * @returns The page title
     */
    async getTitle(): Promise<string> {
        return await browser.getTitle()
    }

    /**
     * Wait for URL to contain specific text
     *
     * @param text - The text to wait for in URL
     * @param timeout - Maximum time to wait (default: from CONFIG)
     */
    async waitForUrlContains(
        text: string,
        timeout: number = CONFIG.TIMEOUTS.DEFAULT
    ): Promise<void> {
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl()
                return url.includes(text)
            },
            {
                timeout,
                timeoutMsg: `URL did not contain "${text}" within ${timeout}ms`,
            }
        )
    }

    /**
     * Pause execution for debugging
     *
     * @param milliseconds - Time to pause in milliseconds
     */
    async pause(milliseconds: number = 1000): Promise<void> {
        await browser.pause(milliseconds)
    }
}
