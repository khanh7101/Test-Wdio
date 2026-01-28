# New Features Guide

This guide covers all the new features and best practices integrated from base-demo.

## 📑 Table of Contents

- [Centralized Configuration](#centralized-configuration)
- [Custom WebdriverIO Commands](#custom-webdriverio-commands)
- [Platform-Specific Base Pages](#platform-specific-base-pages)
- [Data Factories](#data-factories)
- [Helper Utilities](#helper-utilities)
- [Code Quality Tools](#code-quality-tools)

---

## Centralized Configuration

### Overview

All environment variables are now centralized in a type-safe `CONFIG` object.

### Location

`tests/config/index.ts`

### Usage

```typescript
import { CONFIG } from '../config'

// Access URLs
const baseUrl = CONFIG.URLS.BASE
const devUrl = CONFIG.URLS.DEVELOPMENT

// Access credentials
const adminUser = CONFIG.CREDENTIALS.ADMIN.USERNAME
const adminPass = CONFIG.CREDENTIALS.ADMIN.PASSWORD

// Platform detection
if (CONFIG.PLATFORM.IS_MOBILE) {
  // Mobile-specific logic
}

if (CONFIG.PLATFORM.IS_IOS) {
  // iOS-specific logic
}

// Timeouts
const timeout = CONFIG.TIMEOUTS.DEFAULT
```

### Benefits

- ✅ Single source of truth
- ✅ Type-safe with IntelliSense
- ✅ Default values built-in
- ✅ Easy to test and mock

---

## Custom WebdriverIO Commands

### Overview

Enhanced element and browser interactions with custom commands.

### Location

- Implementation: `tests/support/custom-commands.ts`
- Type Declarations: `tests/support/types/custom-commands.d.ts`

### Browser Commands

#### `browser.waitForLoader(timeout?)`

Automatically detect and wait for loading indicators.

```typescript
await browser.waitForLoader() // Uses default timeout
await browser.waitForLoader(5000) // Custom timeout
```

#### `browser.waitForPageLoad(timeout?)`

Wait for document.readyState === 'complete'.

```typescript
await browser.waitForPageLoad()
```

#### `browser.safeNavigate(url)`

Navigate with automatic loader wait.

```typescript
await browser.safeNavigate('https://example.com')
```

#### `browser.scrollToElement(element, block?)`

Smooth scroll to element.

```typescript
await browser.scrollToElement(element)
await browser.scrollToElement(element, 'center')
```

### Element Commands

#### `element.safeClick()`

Auto-scroll + wait-for-clickable + click.

```typescript
await element.safeClick()
```

#### `element.waitAndSetValue(value)`

Auto-scroll + wait-for-exist + setValue.

```typescript
await element.waitAndSetValue('test@example.com')
```

#### `element.safeGetText()`

Wait-for-exist + getText.

```typescript
const text = await element.safeGetText()
```

### Benefits

- ✅ Reduced test flakiness
- ✅ Less boilerplate code
- ✅ Automatic synchronization
- ✅ Full TypeScript support

---

## Platform-Specific Base Pages

### Overview

Separate base pages for Web and Mobile platforms with platform-specific methods.

### Files

- `tests/pageObjects/base.page.ts` - Common base page
- `tests/pageObjects/web.page.ts` - Web-specific methods
- `tests/pageObjects/mobile.page.ts` - Mobile-specific methods (iOS & Android)

### BasePage (Common)

```typescript
import { BasePage } from './base.page'

class MyPage extends BasePage {
  async myMethod() {
    // Navigate to page
    await this.navigateTo('login')
    
    // Wait for element
    await this.waitForElement(element)
    
    // Safe click
    await this.safeClick(element)
    
    // Set value
    await this.setValue(element, 'value')
    
    // Get text
    const text = await this.getText(element)
    
    // Check visibility
    const isVisible = await this.isDisplayed(element)
    
    // Wait for URL
    await this.waitForUrlContains('dashboard')
  }
}
```

### WebPage (Web-Specific)

```typescript
import { WebPage } from './web.page'

class MyWebPage extends WebPage {
  async webSpecificMethod() {
    // Alert handling
    await this.acceptAlert()
    await this.dismissAlert()
    
    // Frame switching
    await this.switchToFrame(iframe)
    await this.switchToParentFrame()
    
    // Window management
    await this.switchToWindow(1)
    await this.closeWindow()
    
    // JavaScript execution
    const result = await this.executeScript('return document.title')
    
    // Cookie management
    const cookies = await this.getCookies()
    await this.setCookie({ name: 'test', value: 'value' })
    
    // Screenshots
    await this.takeScreenshot('screenshot.png')
    
    // Element interactions
    await this.hover(element)
    await this.doubleClick(element)
    await this.rightClick(element)
    await this.dragAndDrop(source, target)
    
    // Form helpers
    await this.selectByValue(select, 'value')
    await this.selectByText(select, 'Option Text')
    await this.uploadFile(input, '/path/to/file.pdf')
  }
}
```

### MobilePage (Mobile-Specific)

```typescript
import { MobilePage } from './mobile.page'

class MyMobilePage extends MobilePage {
  async mobileSpecificMethod() {
    // Platform detection
    if (this.isIOS) {
      // iOS-specific logic
    }
    
    if (this.isAndroid) {
      // Android-specific logic
    }
    
    // Touch actions
    await this.tap(element)
    await this.longPress(element, 2000)
    await this.swipe(element, 'up', 0.5)
    
    // Mobile scrolling
    await this.scrollToElement(element)
    await this.swipeScreen('down')
    
    // Keyboard
    await this.hideKeyboard()
    const isShown = await this.isKeyboardShown()
    
    // Orientation
    await this.setOrientation('LANDSCAPE')
    const orientation = await this.getOrientation()
    
    // App lifecycle
    await this.launchApp()
    await this.closeApp()
    await this.resetApp()
    await this.backgroundApp(5)
    
    // App management
    await this.installApp('/path/to/app.apk')
    await this.removeApp('com.example.app')
    const isInstalled = await this.isAppInstalled('com.example.app')
  }
}
```

---

## Data Factories

### Overview

Generate dynamic test data using Faker.js.

### Location

`tests/fixtures/factories/index.ts`

### UserFactory

```typescript
import { UserFactory } from '../fixtures/factories'

// Create single user
const user = UserFactory.create()

// Create with overrides
const admin = UserFactory.createAdmin({
  email: 'admin@example.com'
})

// Create regular user
const regularUser = UserFactory.createRegular()

// Create multiple users
const users = UserFactory.createMany(5)

// Access user data
console.log(user.firstName)
console.log(user.email)
console.log(user.address.city)
```

### ProductFactory

```typescript
import { ProductFactory } from '../fixtures/factories'

// Create single product
const product = ProductFactory.create()

// Create with overrides
const customProduct = ProductFactory.create({
  name: 'Custom Product',
  price: 99.99
})

// Create multiple products
const products = ProductFactory.createMany(10)
```

### OrderFactory

```typescript
import { OrderFactory } from '../fixtures/factories'

// Create single order
const order = OrderFactory.create()

// Create with overrides
const customOrder = OrderFactory.create({
  status: 'delivered',
  totalAmount: 500
})

// Create multiple orders
const orders = OrderFactory.createMany(3)
```

### Benefits

- ✅ Dynamic test data
- ✅ No hardcoded values
- ✅ Better test isolation
- ✅ Easy customization

---

## Helper Utilities

### CSV Reader

```typescript
import { readCSV } from '../support/helpers/csv-reader'

// Read CSV file
const users = await readCSV<UserData>('./data/users.csv')

// Access data
users.forEach(user => {
  console.log(user.name, user.email)
})

// With custom options
const data = await readCSVWithOptions('./data/file.csv', {
  separator: ';',
  headers: ['col1', 'col2']
})
```

### Excel Reader

```typescript
import { 
  readExcel, 
  readExcelCell, 
  getExcelSheetNames 
} from '../support/helpers/excel-reader'

// Read Excel file
const data = await readExcel('./data/testdata.xlsx', 'Sheet1')

// Read specific cell
const cellValue = await readExcelCell('./data/testdata.xlsx', 'Sheet1', 'A1')

// Get all sheet names
const sheets = await getExcelSheetNames('./data/testdata.xlsx')
```

### PDF Reader

```typescript
import { 
  readPDF, 
  readPDFDetails, 
  searchInPDF 
} from '../support/helpers/pdf-reader'

// Read PDF text
const text = await readPDF('./downloads/invoice.pdf')

// Get PDF details
const details = await readPDFDetails('./downloads/invoice.pdf')
console.log(details.numpages)
console.log(details.info)

// Search in PDF
const found = await searchInPDF('./downloads/invoice.pdf', 'Invoice #12345')
```

---

## Code Quality Tools

### Husky Git Hooks

Automatically run checks before commits.

**Pre-commit Hook:**
- Runs lint-staged
- Formats code with Prettier
- Runs ESLint

**Commit-msg Hook:**
- Validates commit messages
- Enforces conventional commits

### Conventional Commits

```bash
# Valid commit messages
git commit -m "feat: add user login feature"
git commit -m "fix: resolve navigation bug"
git commit -m "docs: update README"
git commit -m "test: add login tests"
git commit -m "refactor: improve page object structure"
```

### Prettier

Auto-format code on save or commit.

```bash
# Format all files
npm run format
```

### ESLint

Lint TypeScript files.

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

---

## Complete Example

```typescript
import { expect } from '@wdio/globals'
import { WebPage } from '../pageObjects/web.page'
import { UserFactory } from '../fixtures/factories'
import { CONFIG } from '../config'

class LoginPage extends WebPage {
  get usernameInput() {
    return $('input[name="username"]')
  }

  get passwordInput() {
    return $('input[name="password"]')
  }

  get loginButton() {
    return $('button[type="submit"]')
  }

  async login(username: string, password: string) {
    await this.navigateTo('login')
    await this.setValue(this.usernameInput, username)
    await this.setValue(this.passwordInput, password)
    await this.safeClick(this.loginButton)
  }
}

describe('Login Feature', () => {
  const loginPage = new LoginPage()

  it('should login with generated user', async () => {
    // Generate test user
    const user = UserFactory.create({
      email: 'test@example.com'
    })

    // Use custom command
    await browser.safeNavigate(CONFIG.URLS.BASE)

    // Use base page methods
    await loginPage.login(user.email, user.password)

    // Verify
    await loginPage.waitForUrlContains('dashboard')
    const url = await loginPage.getCurrentUrl()
    expect(url).toContain('dashboard')
  })
})
```

---

**Last Updated:** 2026-01-26
