import { BaseElement } from './BaseElement';

/**
 * BasePage - Base class for all page objects
 * 
 * Provides common page-level functionality:
 * - Navigation
 * - State management
 * - Screenshot capture
 * - URL verification
 * 
 * All page objects MUST extend this class.
 */
export abstract class BasePage {
    protected url: string;

    constructor(url: string = '') {
        this.url = url;
    }

    /**
     * Navigate to page
     * @param path - Optional path to append to base URL
     */
    async open(path: string = ''): Promise<void> {
        const fullUrl = path ? `${this.url}${path}` : this.url;

        console.log(`🌐 Navigating to: ${fullUrl}`);
        await browser.url(fullUrl);
        await this.waitForLoad();
    }

    /**
     * Wait for page to load completely
     * Override this method in subclasses for page-specific load conditions
     */
    async waitForLoad(): Promise<void> {
        await browser.waitUntil(
            async () => {
                const state = await browser.execute(() => document.readyState);
                return state === 'complete';
            },
            {
                timeout: 30000,
                timeoutMsg: 'Page did not load within 30 seconds',
            }
        );

        // Additional wait for network idle (optional)
        await browser.pause(500);
    }

    /**
     * Wait for URL to match pattern
     * @param expected - String or RegExp to match against current URL
     * @param timeout - Maximum time to wait in milliseconds
     */
    async waitForUrl(expected: string | RegExp, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();

                if (typeof expected === 'string') {
                    return currentUrl.includes(expected);
                }

                return expected.test(currentUrl);
            },
            {
                timeout,
                timeoutMsg: `URL did not match ${expected} within ${timeout}ms`,
            }
        );
    }

    /**
     * Get current URL
     */
    async getCurrentUrl(): Promise<string> {
        return await browser.getUrl();
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await browser.getTitle();
    }

    /**
     * Take screenshot with optional name
     * @param name - Optional name for the screenshot file
     */
    async takeScreenshot(name?: string): Promise<void> {
        const timestamp = new Date().getTime();
        const filename = name ? `${name}_${timestamp}.png` : `screenshot_${timestamp}.png`;
        const filepath = `./screenshots/${filename}`;

        await browser.saveScreenshot(filepath);
        console.log(`📸 Screenshot saved: ${filepath}`);
    }

    /**
     * Scroll to element
     * @param element - BaseElement to scroll to
     */
    async scrollTo(element: BaseElement): Promise<void> {
        await element.scrollIntoView();
    }

    /**
     * Scroll to top of page
     */
    async scrollToTop(): Promise<void> {
        await browser.execute(() => {
            window.scrollTo(0, 0);
        });
    }

    /**
     * Scroll to bottom of page
     */
    async scrollToBottom(): Promise<void> {
        await browser.execute(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    /**
     * Refresh the current page
     */
    async refresh(): Promise<void> {
        console.log('🔄 Refreshing page...');
        await browser.refresh();
        await this.waitForLoad();
    }

    /**
     * Navigate back in browser history
     */
    async goBack(): Promise<void> {
        console.log('⬅️ Navigating back...');
        await browser.back();
        await this.waitForLoad();
    }

    /**
     * Navigate forward in browser history
     */
    async goForward(): Promise<void> {
        console.log('➡️ Navigating forward...');
        await browser.forward();
        await this.waitForLoad();
    }

    /**
     * Wait for a specific amount of time
     * Use sparingly - prefer explicit waits
     * @param ms - Milliseconds to wait
     */
    async pause(ms: number): Promise<void> {
        await browser.pause(ms);
    }

    /**
     * Execute JavaScript in browser context
     * @param script - JavaScript code to execute
     * @param args - Arguments to pass to the script
     */
    async executeScript<T>(script: string | ((...args: any[]) => T), ...args: any[]): Promise<T> {
        const result = await browser.execute(script as any, ...args);
        return result as T;
    }

    /**
     * Switch to iframe
     * @param element - BaseElement representing the iframe
     */
    async switchToFrame(element: BaseElement): Promise<void> {
        const frameElement = element.getElement();
        await browser.switchToFrame(frameElement);
    }

    /**
     * Switch back to main frame
     */
    async switchToMainFrame(): Promise<void> {
        await browser.switchToParentFrame();
    }

    /**
     * Accept alert dialog
     */
    async acceptAlert(): Promise<void> {
        await browser.acceptAlert();
    }

    /**
     * Dismiss alert dialog
     */
    async dismissAlert(): Promise<void> {
        await browser.dismissAlert();
    }

    /**
     * Get alert text
     */
    async getAlertText(): Promise<string> {
        return await browser.getAlertText();
    }

    /**
     * Set alert text (for prompt dialogs)
     */
    async setAlertText(text: string): Promise<void> {
        await browser.sendAlertText(text);
    }
}
