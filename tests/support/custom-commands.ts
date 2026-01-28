/**
 * Custom WebdriverIO Commands
 *
 * This file extends WebdriverIO with custom commands to handle common
 * synchronization issues and provide more robust interactions.
 *
 * Commands are automatically registered when this file is imported.
 */

/**
 * Safe click with automatic scroll and wait for clickable
 * Reduces flakiness by ensuring element is ready before clicking
 *
 * @example
 * await element.safeClick()
 */
async function safeClick(this: WebdriverIO.Element): Promise<void> {
    try {
        // Scroll element into view
        await this.scrollIntoView({ block: 'center', behavior: 'smooth' })

        // Wait for element to be clickable
        await this.waitForClickable({ timeout: 10000 })

        // Perform click
        await this.click()
    } catch (error) {
        console.error(`safeClick failed for element:`, error)
        throw error
    }
}

/**
 * Wait and set value with automatic scroll and existence check
 * Ensures element is ready before setting value
 *
 * @param value - The value to set
 * @example
 * await element.waitAndSetValue('test@example.com')
 */
async function waitAndSetValue(
    this: WebdriverIO.Element,
    value: string
): Promise<void> {
    try {
        // Scroll element into view
        await this.scrollIntoView({ block: 'center', behavior: 'smooth' })

        // Wait for element to exist
        await this.waitForExist({ timeout: 10000 })

        // Clear existing value
        await this.clearValue()

        // Set new value
        await this.setValue(value)
    } catch (error) {
        console.error(`waitAndSetValue failed for element:`, error)
        throw error
    }
}

/**
 * Safe get text with automatic wait
 * Ensures element exists before getting text
 *
 * @returns The text content of the element
 * @example
 * const text = await element.safeGetText()
 */
async function safeGetText(this: WebdriverIO.Element): Promise<string> {
    try {
        await this.waitForExist({ timeout: 10000 })
        return await this.getText()
    } catch (error) {
        console.error(`safeGetText failed for element:`, error)
        throw error
    }
}

/**
 * Wait for global loader to disappear
 * Automatically detects common loading indicators and waits for them to disappear
 *
 * @param timeout - Maximum time to wait (default: 30000ms)
 * @example
 * await browser.waitForLoader()
 */
async function waitForLoader(
    this: WebdriverIO.Browser,
    timeout: number = 30000
): Promise<void> {
    const loaderSelectors = [
        '.loading',
        '.spinner',
        '.loader',
        '[data-testid="loader"]',
        '[data-testid="loading"]',
        '.loader-overlay',
        '.loading-spinner',
        '#loading',
        '.MuiCircularProgress-root', // Material UI
        '.ant-spin', // Ant Design
    ]

    try {
        for (const selector of loaderSelectors) {
            const loader = await $(selector)
            if (await loader.isExisting()) {
                await loader.waitForDisplayed({
                    reverse: true,
                    timeout,
                    timeoutMsg: `Loader "${selector}" did not disappear within ${timeout}ms`,
                })
            }
        }
    } catch (error) {
        // Loader might not exist, which is fine
        console.log('No loader found or loader disappeared')
    }
}

/**
 * Wait for page to be fully loaded
 * Waits for document.readyState to be 'complete'
 *
 * @param timeout - Maximum time to wait (default: 30000ms)
 * @example
 * await browser.waitForPageLoad()
 */
async function waitForPageLoad(
    this: WebdriverIO.Browser,
    timeout: number = 30000
): Promise<void> {
    await this.waitUntil(
        async () => {
            const state = await this.execute(() => document.readyState)
            return state === 'complete'
        },
        {
            timeout,
            timeoutMsg: `Page did not load within ${timeout}ms`,
        }
    )
}

/**
 * Safe navigate with automatic loader wait
 * Navigates to URL and waits for page load and loaders
 *
 * @param url - The URL to navigate to
 * @example
 * await browser.safeNavigate('https://example.com')
 */
async function safeNavigate(
    this: WebdriverIO.Browser,
    url: string
): Promise<void> {
    await this.url(url)
    await this.waitForPageLoad()
    await this.waitForLoader()
}

/**
 * Scroll to element with smooth behavior
 *
 * @param element - The element to scroll to
 * @param block - Alignment option (default: 'center')
 * @example
 * await browser.scrollToElement(element)
 */
async function scrollToElement(
    this: WebdriverIO.Browser,
    element: WebdriverIO.Element,
    block: ScrollLogicalPosition = 'center'
): Promise<void> {
    await element.scrollIntoView({ block, behavior: 'smooth' })
}

// Register browser commands
browser.addCommand('waitForLoader', waitForLoader)
browser.addCommand('waitForPageLoad', waitForPageLoad)
browser.addCommand('safeNavigate', safeNavigate)
browser.addCommand('scrollToElement', scrollToElement)

// Register element commands
browser.addCommand('safeClick', safeClick, true)
browser.addCommand('waitAndSetValue', waitAndSetValue, true)
browser.addCommand('safeGetText', safeGetText, true)

console.log('✅ Custom WebdriverIO commands registered successfully')

// Export to make this file a module
export { }
