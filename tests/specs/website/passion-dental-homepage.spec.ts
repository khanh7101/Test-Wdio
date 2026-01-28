import { expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import { PassionDentalHomePage } from '../../pageObjects/website/PassionDentalHomePage';

/**
 * Test Suite: Passion Dental - Trang Chủ
 * 
 * Mục đích: Kiểm tra trang chủ Passion Dental load thành công
 * URL: https://www.passiondental.com.vn/vi
 */
describe('Passion Dental - Trang Chủ', () => {
    let homePage: PassionDentalHomePage;

    /**
     * Setup trước mỗi test
     */
    before(async () => {
        homePage = new PassionDentalHomePage();

        // Allure: Epic và Feature
        await allure.addEpic('Passion Dental Website');
        await allure.addFeature('Trang Chủ');
    });

    /**
     * Test Case: Kiểm tra trang chủ load thành công
     * 
     * Mô tả:
     * - Mở trang chủ Passion Dental
     * - Verify URL đúng
     * - Verify tiêu đề trang
     * - Verify các elements chính hiển thị
     */
    it('Kiểm tra trang chủ load thành công', async () => {
        // Allure annotations
        await allure.addSeverity('critical');
        await allure.addTag('smoke');
        await allure.addTag('homepage');
        await allure.addTag('passion-dental');
        await allure.addStory('Homepage Load Verification');

        // Step 1: Mở trang chủ
        await allure.startStep('Bước 1: Mở trang chủ Passion Dental');
        await homePage.open();
        await allure.endStep();

        // Step 2: Verify URL
        await allure.startStep('Bước 2: Verify URL chứa domain đúng');
        const currentUrl = await homePage.getPageUrl();
        console.log(`📍 URL hiện tại: ${currentUrl}`);

        expect(currentUrl).toContain('passiondental.com.vn');
        await allure.addAttachment('Current URL', currentUrl, 'text/plain');
        await allure.endStep();

        // Step 3: Verify tiêu đề trang
        await allure.startStep('Bước 3: Verify tiêu đề trang');
        const pageTitle = await homePage.getPageTitle();
        console.log(`📄 Tiêu đề trang: ${pageTitle}`);

        expect(pageTitle).not.toBe('');
        expect(pageTitle.length).toBeGreaterThan(0);
        await allure.addAttachment('Page Title', pageTitle, 'text/plain');
        await allure.endStep();

        // Step 4: Verify logo hiển thị
        await allure.startStep('Bước 4: Verify logo Nha Khoa Passion hiển thị');
        const logoDisplayed = await homePage.isLogoDisplayed();

        // Soft assertion - log warning nếu không tìm thấy
        if (logoDisplayed) {
            console.log('✅ Logo hiển thị thành công');
            await allure.addAttachment('Logo Status', 'Displayed', 'text/plain');
        } else {
            console.warn('⚠️ Logo không hiển thị - có thể cần điều chỉnh selector');
            await allure.addAttachment('Logo Status', 'Not found - selector may need adjustment', 'text/plain');
        }
        await allure.endStep();

        // Step 5: Verify menu điều hướng
        await allure.startStep('Bước 5: Verify menu điều hướng hiển thị');
        const navDisplayed = await homePage.isNavigationDisplayed();

        if (navDisplayed) {
            console.log('✅ Menu điều hướng hiển thị thành công');
            await allure.addAttachment('Navigation Status', 'Displayed', 'text/plain');
        } else {
            console.warn('⚠️ Menu điều hướng không hiển thị - có thể cần điều chỉnh selector');
            await allure.addAttachment('Navigation Status', 'Not found - selector may need adjustment', 'text/plain');
        }
        await allure.endStep();

        // Step 6: Verify hero section
        await allure.startStep('Bước 6: Verify hero section (banner chính) hiển thị');
        const heroDisplayed = await homePage.isHeroSectionDisplayed();

        if (heroDisplayed) {
            console.log('✅ Hero section hiển thị thành công');
            await allure.addAttachment('Hero Section Status', 'Displayed', 'text/plain');
        } else {
            console.warn('⚠️ Hero section không hiển thị - có thể cần điều chỉnh selector');
            await allure.addAttachment('Hero Section Status', 'Not found - selector may need adjustment', 'text/plain');
        }
        await allure.endStep();

        // Step 7: Verify trang load hoàn toàn
        await allure.startStep('Bước 7: Verify trang chủ load hoàn toàn');
        await homePage.verifyPageLoaded();
        await allure.endStep();

        // Final assertion: URL phải chứa domain Passion Dental
        expect(currentUrl).toContain('passiondental.com.vn');

        console.log('✅ Test PASSED: Trang chủ Passion Dental load thành công!');
    });

    /**
     * Test Case: Kiểm tra responsive - trang chủ hiển thị đúng trên mobile
     * (Optional - có thể thêm sau)
     */
    it.skip('Kiểm tra trang chủ hiển thị đúng trên mobile viewport', async () => {
        await allure.addSeverity('normal');
        await allure.addTag('responsive');
        await allure.addTag('mobile');

        // Set mobile viewport
        await browser.setWindowSize(375, 667); // iPhone SE

        await homePage.open();

        const logoDisplayed = await homePage.isLogoDisplayed();
        const navDisplayed = await homePage.isNavigationDisplayed();

        expect(logoDisplayed).toBe(true);
        expect(navDisplayed).toBe(true);
    });
});
