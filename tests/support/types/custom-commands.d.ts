/**
 * TypeScript declarations for custom WebdriverIO commands
 *
 * This file extends the WebdriverIO type definitions to include
 * our custom commands, providing full TypeScript IntelliSense support.
 */

declare global {
    namespace WebdriverIO {
        interface Browser {
            /**
             * Wait for global loader to disappear
             * @param timeout - Maximum time to wait (default: 30000ms)
             */
            waitForLoader(timeout?: number): Promise<void>

            /**
             * Wait for page to be fully loaded
             * @param timeout - Maximum time to wait (default: 30000ms)
             */
            waitForPageLoad(timeout?: number): Promise<void>

            /**
             * Safe navigate with automatic loader wait
             * @param url - The URL to navigate to
             */
            safeNavigate(url: string): Promise<void>

            /**
             * Scroll to element with smooth behavior
             * @param element - The element to scroll to
             * @param block - Alignment option (default: 'center')
             */
            scrollToElement(
                element: WebdriverIO.Element,
                block?: ScrollLogicalPosition
            ): Promise<void>
        }

        interface Element {
            /**
             * Safe click with automatic scroll and wait for clickable
             */
            safeClick(): Promise<void>

            /**
             * Wait and set value with automatic scroll and existence check
             * @param value - The value to set
             */
            waitAndSetValue(value: string): Promise<void>

            /**
             * Safe get text with automatic wait
             * @returns The text content of the element
             */
            safeGetText(): Promise<string>
        }
    }
}

export { }
