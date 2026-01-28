import { expect } from '@wdio/globals'
import { WebPage } from '../../pageObjects/web.page'
import { UserFactory } from '../../fixtures/factories'

/**
 * Example Test using new Base Page and Data Factory
 */
describe('Example Test - New Features Demo', () => {
    class ExamplePage extends WebPage {
        get heading() {
            return $('h1')
        }

        get searchInput() {
            return $('input[name="search"]')
        }

        get searchButton() {
            return $('button[type="submit"]')
        }
    }

    const page = new ExamplePage()

    it('should demonstrate custom commands', async () => {
        // Using safeNavigate from custom commands
        await browser.safeNavigate('https://webdriver.io')

        // Using waitForLoader from custom commands
        await browser.waitForLoader()

        // Page should load
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })

    it('should demonstrate data factory', async () => {
        // Generate test user data
        const testUser = UserFactory.create({
            email: 'test@example.com',
        })

        console.log('Generated test user:', testUser.email)
        expect(testUser.email).toBe('test@example.com')
        expect(testUser.firstName).toBeDefined()
        expect(testUser.lastName).toBeDefined()
    })

    it('should demonstrate base page methods', async () => {
        await browser.url('https://webdriver.io')

        // Using base page methods
        const currentUrl = await page.getCurrentUrl()
        expect(currentUrl).toContain('webdriver.io')

        const title = await page.getTitle()
        expect(title).toBeDefined()
    })
})
