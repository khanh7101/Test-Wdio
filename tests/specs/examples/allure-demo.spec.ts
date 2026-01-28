import { expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import { ExamplePage } from '../../pageObjects/website/ExamplePage';

/**
 * Allure Demo Test Suite
 * Demonstrates Allure reporting features with WDIO
 */
describe('Allure Reporting Demo', () => {
    let examplePage: ExamplePage;

    before(async () => {
        examplePage = new ExamplePage();
    });

    beforeEach(async () => {
        // Add metadata for each test
        await allure.addFeature('Demo Feature');
        await allure.addStory('Example.com Navigation');
    });

    it('should demonstrate basic Allure reporting', async () => {
        // Add test metadata
        await allure.addSeverity('critical');
        await allure.addTag('smoke');
        await allure.addTag('regression');

        // Test steps
        await allure.startStep('Navigate to example.com');
        await examplePage.open();
        await allure.endStep();

        await allure.startStep('Verify page title');
        const title = await examplePage.getTitle();
        expect(title).toContain('Example');
        await allure.endStep();

        await allure.startStep('Verify heading text');
        const heading = await examplePage.getHeadingText();
        expect(heading).toContain('Example Domain');
        await allure.endStep();

        await allure.startStep('Take screenshot');
        const screenshot = await browser.takeScreenshot();
        await allure.addAttachment(
            'Page Screenshot',
            Buffer.from(screenshot, 'base64'),
            'image/png'
        );
        await allure.endStep();
    });

    it('should demonstrate page object usage', async () => {
        await allure.addSeverity('normal');
        await allure.addTag('smoke');

        await allure.startStep('Open example page');
        await examplePage.open();
        await allure.endStep();

        await allure.startStep('Verify more info link is displayed');
        const isDisplayed = await examplePage.isMoreInfoLinkDisplayed();
        expect(isDisplayed).toBe(true);
        await allure.endStep();

        await allure.startStep('Get paragraph text');
        const paragraph = await examplePage.getParagraphText();
        expect(paragraph).toBeTruthy();
        await allure.endStep();
    });

    it('should demonstrate execution mode context', async () => {
        await allure.addSeverity('minor');
        await allure.addTag('regression');

        const executionMode = process.env.EXECUTION_MODE || 'local';
        const environment = process.env.TEST_ENV || 'dev';

        await allure.startStep(`Running in ${executionMode} mode on ${environment} environment`);
        await examplePage.open();
        await allure.endStep();

        await allure.startStep('Verify page loaded');
        const url = await examplePage.getCurrentUrl();
        expect(url).toContain('example.com');
        await allure.endStep();

        // Add environment info as attachment
        const envInfo = {
            executionMode,
            environment,
            browser: browser.capabilities.browserName,
            platform: browser.capabilities.platformName,
            timestamp: new Date().toISOString(),
        };

        await allure.addAttachment(
            'Environment Info',
            JSON.stringify(envInfo, null, 2),
            'application/json'
        );
    });

    it('should demonstrate different severity levels @critical', async () => {
        await allure.addSeverity('blocker');
        await allure.addTag('critical');
        await allure.addTag('cloudOnly');

        await allure.startStep('Critical test step');
        await examplePage.open();
        const title = await examplePage.getTitle();
        expect(title).toBeDefined();
        await allure.endStep();
    });

    it('should demonstrate mobile-specific test @mobile', async () => {
        await allure.addSeverity('normal');
        await allure.addTag('mobile');

        await allure.startStep('Open page on mobile');
        await examplePage.open();
        await allure.endStep();

        await allure.startStep('Verify mobile rendering');
        const heading = await examplePage.getHeadingText();
        expect(heading).toBeTruthy();
        await allure.endStep();
    });
});
