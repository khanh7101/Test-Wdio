import { BasePage } from './base.page'
import type { ChainablePromiseElement } from 'webdriverio'

/**
 * Web Page Object
 *
 * Base class for web-specific page objects.
 * Extends BasePage with web-specific functionality.
 *
 * @abstract
 */
export abstract class WebPage extends BasePage {
    /**
     * Handle browser alert - Accept
     */
    async acceptAlert(): Promise<void> {
        await browser.acceptAlert()
    }

    /**
     * Handle browser alert - Dismiss
     */
    async dismissAlert(): Promise<void> {
        await browser.dismissAlert()
    }

    /**
     * Get alert text
     */
    async getAlertText(): Promise<string> {
        return await browser.getAlertText()
    }

    /**
     * Switch to iframe
     */
    async switchToFrame(frame: ChainablePromiseElement | number): Promise<void> {
        await browser.switchToFrame(frame)
    }

    /**
     * Switch back to parent frame
     */
    async switchToParentFrame(): Promise<void> {
        await browser.switchToParentFrame()
    }

    /**
     * Switch to window by index or handle
     */
    async switchToWindow(handleOrIndex: string | number): Promise<void> {
        if (typeof handleOrIndex === 'number') {
            const handles = await browser.getWindowHandles()
            await browser.switchToWindow(handles[handleOrIndex])
        } else {
            await browser.switchToWindow(handleOrIndex)
        }
    }

    /**
     * Close current window and switch to previous
     */
    async closeWindow(): Promise<void> {
        await browser.closeWindow()
        const handles = await browser.getWindowHandles()
        if (handles.length > 0) {
            await browser.switchToWindow(handles[0])
        }
    }

    /**
     * Execute JavaScript in browser
     */
    async executeScript<T = any>(script: string, ...args: any[]): Promise<T> {
        return (await browser.execute(script, ...args)) as T
    }

    /**
     * Execute async JavaScript in browser
     */
    async executeAsyncScript<T = any>(
        script: string,
        ...args: any[]
    ): Promise<T> {
        return (await browser.executeAsync(script, ...args)) as T
    }

    /**
     * Refresh the page
     */
    async refresh(): Promise<void> {
        await browser.refresh()
        await browser.waitForPageLoad()
        await browser.waitForLoader()
    }

    /**
     * Navigate back in browser history
     */
    async back(): Promise<void> {
        await browser.back()
        await browser.waitForPageLoad()
        await browser.waitForLoader()
    }

    /**
     * Navigate forward in browser history
     */
    async forward(): Promise<void> {
        await browser.forward()
        await browser.waitForPageLoad()
        await browser.waitForLoader()
    }

    /**
     * Set browser window size
     */
    async setWindowSize(width: number, height: number): Promise<void> {
        await browser.setWindowSize(width, height)
    }

    /**
     * Maximize browser window
     */
    async maximizeWindow(): Promise<void> {
        await browser.maximizeWindow()
    }

    /**
     * Get cookies
     */
    async getCookies(name?: string): Promise<any[]> {
        if (name) {
            return await browser.getCookies([name])
        }
        return await browser.getCookies()
    }

    /**
     * Set cookie
     */
    async setCookie(cookie: any): Promise<void> {
        await browser.setCookies(cookie)
    }

    /**
     * Delete cookie
     */
    async deleteCookie(name: string): Promise<void> {
        await browser.deleteCookies(name)
    }

    /**
     * Delete all cookies
     */
    async deleteAllCookies(): Promise<void> {
        await browser.deleteCookies()
    }

    /**
     * Take screenshot
     */
    async takeScreenshot(filename?: string): Promise<string> {
        const screenshot = await browser.takeScreenshot()
        if (filename) {
            const fs = await import('fs')
            fs.writeFileSync(filename, screenshot, 'base64')
        }
        return screenshot
    }

    /**
     * Hover over element
     */
    async hover(element: ChainablePromiseElement): Promise<void> {
        await element.moveTo()
    }

    /**
     * Double click element
     */
    async doubleClick(element: ChainablePromiseElement): Promise<void> {
        await element.doubleClick()
    }

    /**
     * Right click element
     */
    async rightClick(element: ChainablePromiseElement): Promise<void> {
        await element.click({ button: 'right' })
    }

    /**
     * Drag and drop element
     */
    async dragAndDrop(
        source: ChainablePromiseElement,
        target: ChainablePromiseElement
    ): Promise<void> {
        await source.dragAndDrop(target)
    }

    /**
     * Select option by value
     */
    async selectByValue(
        element: ChainablePromiseElement,
        value: string
    ): Promise<void> {
        await element.selectByAttribute('value', value)
    }

    /**
     * Select option by visible text
     */
    async selectByText(
        element: ChainablePromiseElement,
        text: string
    ): Promise<void> {
        await element.selectByVisibleText(text)
    }

    /**
     * Select option by index
     */
    async selectByIndex(
        element: ChainablePromiseElement,
        index: number
    ): Promise<void> {
        await element.selectByIndex(index)
    }

    /**
     * Upload file to input element
     */
    async uploadFile(
        element: ChainablePromiseElement,
        filePath: string
    ): Promise<void> {
        const remoteFilePath = await browser.uploadFile(filePath)
        await element.setValue(remoteFilePath)
    }

    /**
     * Press keyboard key
     */
    async pressKey(key: string): Promise<void> {
        await browser.keys(key)
    }

    /**
     * Clear input field
     */
    async clearValue(element: ChainablePromiseElement): Promise<void> {
        await element.clearValue()
    }
}
