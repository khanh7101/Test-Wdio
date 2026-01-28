# 🚀 WDIO Test Automation Framework

Comprehensive WebdriverIO test automation framework với Allure reporting, email notifications, và multi-platform CI/CD support.

[![WDIO](https://img.shields.io/badge/WDIO-9.x-green.svg)](https://webdriver.io/)
[![Node](https://img.shields.io/badge/Node-18+-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Execution Modes](#-execution-modes)
- [Environment Configuration](#-environment-configuration)
- [Jenkins CI/CD Setup](#-jenkins-cicd-setup)
- [Reports](#-reports)
- [Writing Tests](#-writing-tests)
- [Available Scripts](#-available-scripts)
- [Documentation](#-documentation)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Core Features
- ✅ **WebdriverIO 9.x** - Latest WDIO với built-in driver management
- ✅ **TypeScript** - Type-safe test automation
- ✅ **Page Object Model** - Platform-specific base pages (Web + Mobile)
- ✅ **Centralized Configuration** - Type-safe CONFIG object
- ✅ **Custom Commands** - Enhanced element interactions
- ✅ **Allure Reports** - Beautiful test reports với screenshots
- ✅ **Email Notifications** - Automated email với test results

### Enhanced Testing Capabilities
- ✅ **Data Factories** - Generate test data với Faker.js
- ✅ **Helper Utilities** - CSV/Excel/PDF reading support
- ✅ **Platform-Specific Pages** - Separate Web và Mobile base pages
- ✅ **Custom Commands** - safeClick, waitAndSetValue, waitForLoader
- ✅ **Automated Synchronization** - Auto-wait for loaders

### Execution Modes
- ✅ **Local Mode** - Development và debugging
- ✅ **Fast Mode** - Headless Chrome với DevTools Protocol
- ✅ **Cloud Mode** - BrowserStack cross-browser testing
- ✅ **Mobile Mode** - Appium iOS/Android testing

### Code Quality
- ✅ **Husky** - Git hooks for code quality
- ✅ **Lint-staged** - Pre-commit linting
- ✅ **Commitlint** - Conventional commit messages
- ✅ **Prettier** - Code formatting
- ✅ **ESLint** - TypeScript linting

### CI/CD Integration
- ✅ **Jenkins** - Comprehensive pipeline với email notifications
- ✅ **GitHub Actions** - Automated workflows
- ✅ **GitLab CI** - GitLab pipelines

### Environment Support
- ✅ **Multi-Environment** - Dev, Staging, Production
- ✅ **Environment Variables** - Flexible configuration
- ✅ **Parallel Execution** - Faster test runs

---

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 18 or higher
node --version  # v18.x.x or higher

# Java 17 or higher (for Allure reports)
java --version  # 17.x.x or higher

# npm 9 or higher
npm --version   # 9.x.x or higher
```

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd wdio-code-base

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your values

# 4. Run tests
npm run test:local
```

### First Test Run

```bash
# Run in local mode (Chrome)
npm run test:local

# Generate and view Allure report
npm run allure:generate
npm run allure:open
```

---

## 📁 Project Structure

```
wdio-code-base/
├── config/                      # WDIO configurations
│   ├── wdio.base.conf.ts       # Base configuration
│   ├── wdio.local.conf.ts      # Local mode (Chrome)
│   ├── wdio.fast.conf.ts       # Fast mode (Headless)
│   ├── wdio.cloud.conf.ts      # Cloud mode (BrowserStack)
│   └── wdio.mobile.conf.ts     # Mobile mode (Appium)
│
├── tests/
│   ├── config/                 # ✨ NEW: Centralized configuration
│   │   └── index.ts           # Type-safe CONFIG object
│   │
│   ├── pageObjects/            # Page Object Model
│   │   ├── base.page.ts       # ✨ NEW: Common base page
│   │   ├── web.page.ts        # ✨ NEW: Web-specific base page
│   │   ├── mobile.page.ts     # ✨ NEW: Mobile-specific base page
│   │   ├── base/              # Legacy base classes
│   │   │   ├── BaseElement.ts
│   │   │   └── BasePage.ts
│   │   └── website/           # Page objects
│   │       └── ExamplePage.ts
│   │
│   ├── fixtures/               # ✨ NEW: Test data
│   │   └── factories/         # Data factories
│   │       └── index.ts       # UserFactory, ProductFactory, OrderFactory
│   │
│   ├── support/                # ✨ NEW: Support utilities
│   │   ├── custom-commands.ts # Custom WDIO commands
│   │   ├── types/             # TypeScript declarations
│   │   │   └── custom-commands.d.ts
│   │   └── helpers/           # Helper utilities
│   │       ├── csv-reader.ts  # CSV file reading
│   │       ├── excel-reader.ts # Excel file reading
│   │       └── pdf-reader.ts  # PDF file reading
│   │
│   └── specs/                 # Test specifications
│       └── examples/
│           ├── allure-demo.spec.ts
│           └── new-features-demo.spec.ts
│
├── scripts/                    # Utility scripts
│   ├── test-runner.js         # Test execution script
│   ├── validate-env.ts        # Environment validation
│   ├── email-sender.ts        # Email notification
│   └── cleanup-reports.ts     # Report cleanup
│
├── docs/                       # Documentation
│   ├── README.md              # Documentation index
│   ├── cicd-templates/        # CI/CD templates
│   ├── architecture/          # Architecture docs
│   └── guides/                # User guides
│
├── .husky/                     # ✨ NEW: Git hooks
│   ├── pre-commit            # Lint-staged hook
│   └── commit-msg            # Commitlint hook
│
├── allure-results/            # Allure test results
├── allure-report/             # Generated Allure reports
├── junit/                     # JUnit XML results
├── logs/                      # Test execution logs
├── screenshots/               # Test screenshots
│
├── .env                       # Environment variables
├── .env.example              # Environment template (updated)
├── .commitlintrc.json        # ✨ NEW: Commitlint config
├── .prettierrc               # ✨ NEW: Prettier config
├── eslint.config.js          # ✨ NEW: ESLint v9 config
├── package.json              # Dependencies (updated)
└── tsconfig.json             # TypeScript config
```

---

## 🎯 Execution Modes

### 1. Local Mode (Development)

Run tests on local Chrome browser.

```bash
npm run test:local
```

**Features:**
- ✅ WDIO 9.x built-in driver management
- ✅ Visible browser (good for debugging)
- ✅ Screenshots on failure
- ✅ Best for: Development, debugging

**Configuration:** `config/wdio.local.conf.ts`

---

### 2. Fast Mode (CI/CD)

Run tests with Chrome DevTools Protocol (headless).

```bash
npm run test:fast
```

**Features:**
- ✅ Headless execution
- ✅ Faster than local mode
- ✅ No browser UI overhead
- ✅ Best for: PR checks, quick validation

**Configuration:** `config/wdio.fast.conf.ts`

---

### 3. Cloud Mode (Cross-Browser)

Run tests on Sauce Labs cloud.

```bash
npm run test:cloud
```

**Features:**
- ✅ Cross-browser testing
- ✅ Multiple OS support
- ✅ Video recording
- ✅ Best for: Production, regression

**Configuration:** `config/wdio.cloud.conf.ts`

**Required Environment Variables:**
```env
SAUCE_USERNAME=your-username
SAUCE_ACCESS_KEY=your-access-key
SAUCE_REGION=us
```

---

### 4. Mobile Mode (Appium)

Run mobile tests with Appium.

```bash
npm run test:mobile
```

**Features:**
- ✅ Mobile web testing
- ✅ Native app testing
- ✅ Android/iOS support
- ✅ Best for: Mobile testing

**Configuration:** `config/wdio.mobile.conf.ts`

**Required Environment Variables:**
```env
APPIUM_HOST=localhost
APPIUM_PORT=4723
MOBILE_PLATFORM=Android
```

---

## 🌍 Environment Configuration

### Environment Variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

### Required Variables

```env
# Test Environment
TEST_ENV=dev                    # dev, staging, prod

# Execution Mode
EXECUTION_MODE=local            # local, fast, cloud, mobile

# Environment URLs
BASE_URL_DEV=https://example.com
BASE_URL_STAGING=https://staging.example.com
BASE_URL_PROD=https://prod.example.com

# Email Notifications (Gmail SMTP)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_RECIPIENTS_PASSED=team@example.com
EMAIL_RECIPIENTS_FAILED=team@example.com,dev@example.com

# Company Branding
COMPANY_NAME=Your Company
COMPANY_WEBSITE=https://yourcompany.com
COMPANY_LOGO_URL=https://yourcompany.com/logo.png
```

### Optional Variables (Cloud Mode)

```env
SAUCE_USERNAME=your-sauce-username
SAUCE_ACCESS_KEY=your-sauce-access-key
SAUCE_REGION=us
```

### Optional Variables (Mobile Mode)

```env
APPIUM_HOST=localhost
APPIUM_PORT=4723
MOBILE_PLATFORM=Android
```

### Optional Variables (Slack Notifications)

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_ENABLED=true
REPORT_URL=https://your-ci-server.com/allure-report
```

**Setup Slack:**
1. Tạo Slack Incoming Webhook tại [https://api.slack.com/apps](https://api.slack.com/apps)
2. Copy webhook URL vào `.env`
3. Set `SLACK_ENABLED=true`
4. Xem hướng dẫn chi tiết: [docs/guides/slack-setup.md](docs/guides/slack-setup.md)

### Switching Environments

```bash
# Development
TEST_ENV=dev npm run test:local

# Staging
TEST_ENV=staging npm run test:local

# Production
TEST_ENV=prod npm run test:local
```

---

## 🔧 Jenkins CI/CD Setup

Framework supports Jenkins pipeline with comprehensive configuration.

### Quick Setup

```bash
# 1. Copy Jenkinsfile to root
cp docs/cicd-templates/Jenkinsfile Jenkinsfile

# 2. Commit to Git
git add Jenkinsfile
git commit -m "Add Jenkins pipeline"
git push
```

### Jenkins Configuration

#### 1. Install Required Plugins

- **Email Extension Plugin** - Email notifications
- **Allure Plugin** - Allure reports
- **HTML Publisher Plugin** - HTML reports
- **NodeJS Plugin** - NodeJS management

#### 2. Configure NodeJS Tool

**Manage Jenkins → Global Tool Configuration → NodeJS:**
- Name: `NodeJS 18`
- Version: `NodeJS 18.x.x`

#### 3. Configure Email SMTP

**Manage Jenkins → Configure System → Extended E-mail Notification:**
- SMTP server: `smtp.gmail.com`
- SMTP port: `587`
- Use SSL: ✅
- Credentials: Add Gmail credentials

#### 4. Create Pipeline Job

1. **New Item** → Pipeline → OK
2. **Pipeline** → Definition: **Pipeline script from SCM**
3. **SCM**: Git
4. **Repository URL**: your-repo-url
5. **Script Path**: `Jenkinsfile`
6. **Save**

### Pipeline Features

✅ **Automatic Checkout** - Clone source code  
✅ **Dependency Installation** - npm install  
✅ **Test Execution** - Run WDIO tests  
✅ **Allure Reports** - Generate and publish reports  
✅ **Email Notifications** - Send test results  
✅ **Workspace Cleanup** - Clean after build  

### Pipeline Parameters

**EXECUTION_MODE:**
- `local` - Local Chrome
- `fast` - Headless Chrome
- `cloud` - Sauce Labs
- `mobile` - Appium

**TEST_ENV:**
- `dev` - Development
- `staging` - Staging
- `prod` - Production

### Email Notification

Email automatically sent after each build with:

- ✅ Build information (project, build number, time, duration)
- ✅ Test results (total, passed, failed, skipped)
- ✅ Report links (Allure, HTML, Console)
- ✅ Vietnam timezone support

### Scheduled Runs (Optional)

Uncomment in Jenkinsfile to enable:

```groovy
triggers {
  cron('H 2 * * *')  // Run daily at 2 AM
}
```

### Detailed Jenkins Documentation

See [docs/cicd-templates/README.md](docs/cicd-templates/README.md) for:
- Detailed setup instructions
- Troubleshooting guide
- Advanced configuration
- Best practices

---

## 📊 Reports

### Allure Reports

Allure provides beautiful, interactive test reports.

```bash
# Generate report
npm run allure:generate

# Open report in browser
npm run allure:open

# Serve report (alternative)
npm run allure:serve
```

**Features:**
- ✅ Test execution timeline
- ✅ Test suites overview
- ✅ Graphs and charts
- ✅ Screenshots on failure
- ✅ Test history trends
- ✅ Categories and tags

### JUnit Reports

JUnit XML reports are automatically generated at `junit/results.xml`.

**Usage:**
- CI/CD integration
- Test result tracking
- Jenkins/GitLab/GitHub integration

### Email Reports

Email notifications with HTML template include:
- Build information
- Test results summary
- Links to detailed reports

---

## 📝 Writing Tests

### Page Object Pattern

```typescript
// tests/pageObjects/website/LoginPage.ts
import { BasePage } from '../base/BasePage';
import { BaseElement } from '../base/BaseElement';

export class LoginPage extends BasePage {
    private usernameInput = new BaseElement('#username');
    private passwordInput = new BaseElement('#password');
    private loginButton = new BaseElement('#login-btn');

    async login(username: string, password: string) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    async open() {
        await super.open('/login');
    }
}
```

### Test Specification

```typescript
// tests/specs/login.spec.ts
import { expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import { LoginPage } from '../pageObjects/website/LoginPage';

describe('Login Feature', () => {
    let loginPage: LoginPage;

    before(async () => {
        loginPage = new LoginPage();
    });

    it('should login successfully with valid credentials', async () => {
        await allure.addSeverity('critical');
        await allure.addTag('smoke');
        await allure.addFeature('Authentication');

        await allure.startStep('Navigate to login page');
        await loginPage.open();
        await allure.endStep();

        await allure.startStep('Enter credentials and login');
        await loginPage.login('testuser', 'password123');
        await allure.endStep();

        await allure.startStep('Verify successful login');
        const url = await browser.getUrl();
        expect(url).toContain('/dashboard');
        await allure.endStep();
    });
});
```

### Best Practices

1. **Use Page Object Model** - Separate UI logic from test logic
2. **Add Allure Annotations** - Severity, tags, features
3. **Use Descriptive Names** - Clear test and step names
4. **Handle Waits Properly** - Use WDIO auto-waiting
5. **Take Screenshots** - On failures automatically
6. **Organize Tests** - By feature/module

---

## 🛠️ Available Scripts

### Test Execution

```bash
npm run test                # Interactive test runner
npm run test:local          # Local mode (Chrome)
npm run test:fast           # Fast mode (Headless)
npm run test:cloud          # Cloud mode (BrowserStack)
npm run test:mobile         # Mobile mode (Appium)
npm run test:ios            # iOS testing (Appium)
npm run test:android        # Android testing (Appium)
npm run test:browserstack   # BrowserStack cloud testing
```

### Reports

```bash
npm run allure:generate     # Generate Allure report
npm run allure:open         # Open Allure report
npm run allure:serve        # Serve Allure report
```

### Code Quality

```bash
npm run lint                # Run ESLint
npm run lint:fix            # Fix ESLint errors
npm run format              # Format code with Prettier
npm run type-check          # TypeScript type checking
```

### Utilities

```bash
npm run validate:env        # Validate environment setup
npm run report:clean        # Clean old reports
```

### Combined

```bash
npm run test:report         # Run tests + generate report
```

---

## 📚 Documentation

### Quick Links

- **[Documentation Index](docs/README.md)** - Complete documentation
- **[New Features Guide](docs/guides/new-features.md)** - ✨ NEW: All new features explained
- **[Quick Start Guide](docs/cicd-templates/01-quick-start.md)** - 5-minute setup
- **[Jenkins Setup Guide](docs/cicd-templates/README.md)** - Detailed Jenkins configuration

### Guides

- **Installation Guide** - Setup and installation
- **Writing Tests** - How to write tests
- **Page Object Model** - Using POM pattern
- **New Features** - ✨ Custom commands, data factories, helpers
- **Running Tests** - Execute tests locally
- **CI/CD Setup** - CI/CD integration
- **Environment Switching** - Switch environments
- **Allure Reports** - Generate reports
- **Email Notifications** - Configure emails

### Architecture

- **Framework Overview** - Architecture overview
- **WDIO 9.x Services** - Services explanation
- **Execution Modes** - 4 execution modes
- **Project Structure** - Folder structure

### Reference

- **Environment Variables** - All env vars
- **WDIO Configs** - Config files explained
- **NPM Scripts** - Available scripts
- **Custom Commands** - ✨ NEW: Custom command reference
- **Data Factories** - ✨ NEW: Factory pattern usage
- **Helper Utilities** - ✨ NEW: CSV/Excel/PDF readers
- **BaseElement API** - Element methods
- **BasePage API** - Page methods

---

## 🆘 Troubleshooting

### Tests Not Running?

```bash
# Validate environment
npm run validate:env

# Check Node version (requires 18+)
node --version

# Check Java version (requires 17+)
java --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Email Not Sending?

**Check Gmail App Password:**
- Don't use regular password
- Create App Password at [Google Account Security](https://myaccount.google.com/apppasswords)
- Update `GMAIL_APP_PASSWORD` in `.env`

**Verify SMTP Settings:**
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

**Check Firewall:**
- Port 587 must be open
- Check network/firewall settings

### Sauce Labs Not Working?

**Verify Credentials:**
```env
SAUCE_USERNAME=your-username
SAUCE_ACCESS_KEY=your-access-key
SAUCE_REGION=us
```

**Check Account:**
- Active subscription
- Correct region (us, eu, apac)
- Valid credentials

### Allure Report Not Generated?

```bash
# Check Java installation
java --version  # Should be 17+

# Manually generate
npm run allure:generate

# Check results folder
ls -la allure-results/
```

### Jenkins Pipeline Failing?

**Common Issues:**

1. **NodeJS Tool Not Found**
   - Configure `NodeJS 18` in Global Tool Configuration

2. **Email Not Sending**
   - Configure SMTP settings
   - Add Gmail credentials

3. **Allure Plugin Missing**
   - Install Allure Plugin
   - Configure Allure Commandline

**See details:** [docs/cicd-templates/README.md](docs/cicd-templates/README.md)

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests locally
4. Run linter: `npm run lint:fix`
5. Create pull request

---

## 📄 License

ISC

---

## 📞 Support

- **Documentation:** [docs/README.md](docs/README.md)
- **Issues:** Create GitHub issue
- **Email:** team@example.com

---

## 🔗 External Resources

- [WebdriverIO Documentation](https://webdriver.io/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [Mocha Documentation](https://mochajs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Sauce Labs Documentation](https://docs.saucelabs.com/)

---

**Framework Version:** 1.0.0  
**WDIO Version:** 9.x  
**Node Version:** 18+  
**Java Version:** 17+  
**Last Updated:** 2026-01-26

