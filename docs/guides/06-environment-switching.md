# CI/CD Environment Switching

Complete guide on switching test environments and execution modes in CI/CD pipelines.

---

## 🎯 Two Key Variables

### 1. `TEST_ENV` - Environment
- `dev` - Development
- `staging` - Staging  
- `prod` - Production

### 2. `EXECUTION_MODE` - Execution Mode
- `local` - Local Chrome
- `fast` - DevTools (headless)
- `cloud` - Sauce Labs
- `mobile` - Appium

---

## 🔧 GitLab CI

### Quick Switch

**Method 1: Pipeline Variables (UI)**

Settings → CI/CD → Variables:
```
TEST_ENV = staging
EXECUTION_MODE = cloud
```

**Method 2: Manual Pipeline**

CI/CD → Pipelines → Run Pipeline:
```
TEST_ENV = prod
EXECUTION_MODE = cloud
```

**Method 3: Edit `.gitlab-ci.yml`**

```yaml
variables:
  EXECUTION_MODE: "cloud"
  TEST_ENV: "staging"
```

---

## 🔧 GitHub Actions

### Quick Switch

**Method 1: Manual Workflow**

Actions → WDIO Test Automation → Run workflow

Select from dropdowns:
- Execution Mode: local/fast/cloud/mobile
- Test Environment: dev/staging/prod

**Method 2: Edit Workflow**

```yaml
env:
  EXECUTION_MODE: 'cloud'
  TEST_ENV: 'staging'
```

---

## 🔧 Jenkins

### Quick Switch

**Method 1: Build with Parameters**

Build with Parameters:
- TEST_ENV: staging
- EXECUTION_MODE: cloud

**Method 2: Environment Variables**

Manage Jenkins → Configure System → Environment variables:
```
TEST_ENV = staging
EXECUTION_MODE = cloud
```

---

## 📊 Common Scenarios

| Scenario | TEST_ENV | EXECUTION_MODE |
|----------|----------|----------------|
| PR Checks | `dev` | `fast` |
| Main Branch | `prod` | `cloud` |
| Nightly Tests | `staging` | `cloud` |
| Mobile Testing | `dev` | `mobile` |
| Local Debug | `dev` | `local` |

---

## 🔐 Required Secrets

### All Platforms

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_RECIPIENTS_PASSED=team@example.com
EMAIL_RECIPIENTS_FAILED=team@example.com,dev@example.com
```

### Cloud Mode Only
```
SAUCE_USERNAME=your-username
SAUCE_ACCESS_KEY=your-access-key
```

---

## 📖 Detailed Guides

For platform-specific details, see:
- [GitLab CI Setup](../cicd-templates/00-setup-guide.md#gitlab-ci)
- [GitHub Actions Setup](../cicd-templates/00-setup-guide.md#github-actions)
- [Jenkins Setup](../cicd-templates/00-setup-guide.md#jenkins)
