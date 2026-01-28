import { BasePage, BaseElement } from '../base';

/**
 * Example Page Object
 * Demonstrates how to use BaseElement and BasePage
 */
export class ExamplePage extends BasePage {
    // Page elements
    private heading = new BaseElement('h1');
    private paragraph = new BaseElement('p');
    private moreInfoLink = new BaseElement('a');

    constructor() {
        super('https://example.com');
    }

    /**
     * Override waitForLoad to add page-specific wait conditions
     */
    async waitForLoad(): Promise<void> {
        await super.waitForLoad();
        await this.heading.waitForDisplayed();
    }

    /**
     * Get heading text
     */
    async getHeadingText(): Promise<string> {
        return await this.heading.getText();
    }

    /**
     * Get paragraph text
     */
    async getParagraphText(): Promise<string> {
        return await this.paragraph.getText();
    }

    /**
     * Click more info link
     */
    async clickMoreInfo(): Promise<void> {
        await this.moreInfoLink.click();
    }

    /**
     * Check if more info link is displayed
     */
    async isMoreInfoLinkDisplayed(): Promise<boolean> {
        return await this.moreInfoLink.isDisplayed();
    }
}
