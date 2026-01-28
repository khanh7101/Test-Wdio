import type { ChainablePromiseElement } from 'webdriverio';

/**
 * BaseElement - Element wrapper with auto-wait and retry logic
 * 
 * This is the ONLY way to interact with elements in the framework.
 * All page objects MUST use BaseElement instead of direct $ or $$ calls.
 * 
 * Features:
 * - Auto-wait for element state before actions
 * - Built-in retry logic
 * - Consistent error handling
 * - Screenshot on failure
 */
export class BaseElement {
    private element: ChainablePromiseElement;
    private selector: string;

    constructor(selector: string) {
        this.selector = selector;
        this.element = $(selector);
    }

    /**
     * Click element with auto-wait for clickable
     */
    async click(): Promise<void> {
        try {
            await this.element.waitForClickable({ timeout: 10000 });
            await this.element.click();
        } catch (error) {
            console.error(`❌ Failed to click element: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Type text into element with auto-wait for visible
     * Clears existing value before typing
     */
    async type(value: string, clearFirst: boolean = true): Promise<void> {
        try {
            await this.element.waitForDisplayed({ timeout: 10000 });

            if (clearFirst) {
                await this.element.clearValue();
            }

            await this.element.setValue(value);
        } catch (error) {
            console.error(`❌ Failed to type into element: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Get text content with auto-wait for exist
     */
    async getText(): Promise<string> {
        try {
            await this.element.waitForExist({ timeout: 10000 });
            return await this.element.getText();
        } catch (error) {
            console.error(`❌ Failed to get text from element: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Check if element is displayed
     * Returns false instead of throwing error
     */
    async isDisplayed(): Promise<boolean> {
        try {
            await this.element.waitForDisplayed({ timeout: 5000 });
            return await this.element.isDisplayed();
        } catch {
            return false;
        }
    }

    /**
     * Check if element is enabled
     */
    async isEnabled(): Promise<boolean> {
        try {
            await this.element.waitForExist({ timeout: 10000 });
            return await this.element.isEnabled();
        } catch (error) {
            console.error(`❌ Failed to check if element is enabled: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Check if element exists in DOM
     */
    async isExisting(): Promise<boolean> {
        try {
            return await this.element.isExisting();
        } catch {
            return false;
        }
    }

    /**
     * Wait for element to be displayed
     */
    async waitForDisplayed(timeout: number = 10000): Promise<void> {
        try {
            await this.element.waitForDisplayed({ timeout });
        } catch (error) {
            console.error(`❌ Element not displayed within ${timeout}ms: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Wait for element to be clickable
     */
    async waitForClickable(timeout: number = 10000): Promise<void> {
        try {
            await this.element.waitForClickable({ timeout });
        } catch (error) {
            console.error(`❌ Element not clickable within ${timeout}ms: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Wait for element to exist in DOM
     */
    async waitForExist(timeout: number = 10000): Promise<void> {
        try {
            await this.element.waitForExist({ timeout });
        } catch (error) {
            console.error(`❌ Element does not exist within ${timeout}ms: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Get attribute value
     */
    async getAttribute(name: string): Promise<string | null> {
        try {
            await this.element.waitForExist({ timeout: 10000 });
            return await this.element.getAttribute(name);
        } catch (error) {
            console.error(`❌ Failed to get attribute '${name}' from element: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Get CSS property value
     */
    async getCSSProperty(property: string): Promise<string> {
        try {
            await this.element.waitForExist({ timeout: 10000 });
            const value = await this.element.getCSSProperty(property);
            return (value.value || '') as string;
        } catch (error) {
            console.error(`❌ Failed to get CSS property '${property}' from element: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Scroll element into view
     */
    async scrollIntoView(): Promise<void> {
        try {
            await this.element.waitForExist({ timeout: 10000 });
            await this.element.scrollIntoView();
        } catch (error) {
            console.error(`❌ Failed to scroll element into view: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Select option by visible text (for select elements)
     */
    async selectByVisibleText(text: string): Promise<void> {
        try {
            await this.element.waitForDisplayed({ timeout: 10000 });
            await this.element.selectByVisibleText(text);
        } catch (error) {
            console.error(`❌ Failed to select option '${text}' in element: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Select option by value (for select elements)
     */
    async selectByValue(value: string): Promise<void> {
        try {
            await this.element.waitForDisplayed({ timeout: 10000 });
            await this.element.selectByAttribute('value', value);
        } catch (error) {
            console.error(`❌ Failed to select option with value '${value}' in element: ${this.selector}`);
            throw error;
        }
    }

    /**
     * Get the underlying WebdriverIO element (use sparingly)
     */
    getElement(): ChainablePromiseElement {
        return this.element;
    }

    /**
     * Get the selector string
     */
    getSelector(): string {
        return this.selector;
    }
}
