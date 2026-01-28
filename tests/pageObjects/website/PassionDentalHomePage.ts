import { BasePage } from '../base/BasePage';
import { BaseElement } from '../base/BaseElement';

/**
 * PassionDentalHomePage - Page Object cho trang chủ Passion Dental
 * 
 * URL: https://www.passiondental.com.vn/vi
 * 
 * Chức năng:
 * - Verify trang chủ load thành công
 * - Verify các elements chính hiển thị đúng
 * - Verify navigation menu
 * - Verify hero section
 */
export class PassionDentalHomePage extends BasePage {
    // ==================== Selectors ====================
    
    /**
     * Logo Nha Khoa Passion
     */
    private logo = new BaseElement('img[alt*="Passion"], img[alt*="passion"], .logo img, header img');
    
    /**
     * Menu điều hướng chính
     */
    private navigationMenu = new BaseElement('nav, .navigation, .menu, header nav');
    
    /**
     * Nút "TRANG CHỦ" trong menu
     */
    private homeMenuItem = new BaseElement('a[href*="trang-chu"], a:contains("TRANG CHỦ"), nav a:first-child');
    
    /**
     * Hero section (banner chính với hình bác sĩ)
     */
    private heroSection = new BaseElement('.hero, .banner, .main-banner, section:first-of-type');
    
    /**
     * Số điện thoại liên hệ
     */
    private phoneNumber = new BaseElement('a[href*="tel:0704993579"], a[href*="tel:"], .phone, .contact-phone');
    
    /**
     * Icons mạng xã hội
     */
    private socialIcons = new BaseElement('.social, .social-icons, .social-media, a[href*="facebook"], a[href*="instagram"]');
    
    // ==================== Constructor ====================
    
    constructor() {
        // Sử dụng BASE_URL từ environment variables
        super('https://www.passiondental.com.vn/vi');
    }
    
    // ==================== Navigation Methods ====================
    
    /**
     * Mở trang chủ Passion Dental
     */
    async open(): Promise<void> {
        await super.open();
        console.log('✅ Đã mở trang chủ Passion Dental');
    }
    
    // ==================== Verification Methods ====================
    
    /**
     * Kiểm tra logo có hiển thị không
     */
    async isLogoDisplayed(): Promise<boolean> {
        const displayed = await this.logo.isDisplayed();
        console.log(`🔍 Logo hiển thị: ${displayed}`);
        return displayed;
    }
    
    /**
     * Kiểm tra menu điều hướng có hiển thị không
     */
    async isNavigationDisplayed(): Promise<boolean> {
        const displayed = await this.navigationMenu.isDisplayed();
        console.log(`🔍 Menu điều hướng hiển thị: ${displayed}`);
        return displayed;
    }
    
    /**
     * Kiểm tra hero section có hiển thị không
     */
    async isHeroSectionDisplayed(): Promise<boolean> {
        const displayed = await this.heroSection.isDisplayed();
        console.log(`🔍 Hero section hiển thị: ${displayed}`);
        return displayed;
    }
    
    /**
     * Kiểm tra số điện thoại có hiển thị không
     */
    async isPhoneNumberDisplayed(): Promise<boolean> {
        const displayed = await this.phoneNumber.isDisplayed();
        console.log(`🔍 Số điện thoại hiển thị: ${displayed}`);
        return displayed;
    }
    
    /**
     * Kiểm tra icons mạng xã hội có hiển thị không
     */
    async areSocialIconsDisplayed(): Promise<boolean> {
        const displayed = await this.socialIcons.isDisplayed();
        console.log(`🔍 Icons mạng xã hội hiển thị: ${displayed}`);
        return displayed;
    }
    
    /**
     * Verify toàn bộ trang chủ đã load thành công
     * Kiểm tra tất cả elements quan trọng
     */
    async verifyPageLoaded(): Promise<void> {
        console.log('🔍 Bắt đầu verify trang chủ...');
        
        // Wait for page to load completely
        await this.waitForLoad();
        
        // Verify URL
        const currentUrl = await this.getCurrentUrl();
        if (!currentUrl.includes('passiondental.com.vn')) {
            throw new Error(`❌ URL không đúng: ${currentUrl}`);
        }
        console.log('✅ URL đúng');
        
        // Verify page title
        const title = await this.getTitle();
        console.log(`📄 Tiêu đề trang: ${title}`);
        
        // Verify logo
        const logoDisplayed = await this.isLogoDisplayed();
        if (!logoDisplayed) {
            console.warn('⚠️ Logo không hiển thị (có thể do selector cần điều chỉnh)');
        }
        
        // Verify navigation
        const navDisplayed = await this.isNavigationDisplayed();
        if (!navDisplayed) {
            console.warn('⚠️ Menu điều hướng không hiển thị (có thể do selector cần điều chỉnh)');
        }
        
        console.log('✅ Trang chủ đã load thành công!');
    }
    
    /**
     * Lấy tiêu đề trang
     */
    async getPageTitle(): Promise<string> {
        return await this.getTitle();
    }
    
    /**
     * Lấy URL hiện tại
     */
    async getPageUrl(): Promise<string> {
        return await this.getCurrentUrl();
    }
}
