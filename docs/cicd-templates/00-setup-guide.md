# CI/CD Templates

This folder contains CI/CD configuration files for different platforms.

## 📋 Available Templates

1. **GitLab CI** - `gitlab-ci.yml`
2. **GitHub Actions** - `github-actions.yml`
3. **Jenkins** - `Jenkinsfile`

---

## 🚀 How to Use

### When Starting a New Project:

**Choose ONE platform and copy its file:**

#### Option 1: GitLab CI
```bash
cp .cicd-templates/gitlab-ci.yml .gitlab-ci.yml
```

#### Option 2: GitHub Actions
```bash
mkdir -p .github/workflows
cp .cicd-templates/github-actions.yml .github/workflows/wdio.yml
```

#### Option 3: Jenkins
```bash
cp .cicd-templates/Jenkinsfile Jenkinsfile
```

**Then delete this templates folder:**
```bash
rm -rf .cicd-templates
```

---

## 🎯 Quick Setup

### GitLab CI
```bash
# 1. Copy template
cp .cicd-templates/gitlab-ci.yml .gitlab-ci.yml

# 2. Setup GitLab CI/CD Variables (Settings → CI/CD → Variables)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_RECIPIENTS_PASSED=team@example.com
EMAIL_RECIPIENTS_FAILED=team@example.com
SAUCE_USERNAME=your-username (if using cloud mode)
SAUCE_ACCESS_KEY=your-key (if using cloud mode)

# 3. Commit and push
git add .gitlab-ci.yml
git commit -m "Add GitLab CI configuration"
git push

# 4. Clean up
rm -rf .cicd-templates
```

### GitHub Actions
```bash
# 1. Copy template
mkdir -p .github/workflows
cp .cicd-templates/github-actions.yml .github/workflows/wdio.yml

# 2. Setup GitHub Secrets (Settings → Secrets → Actions)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_RECIPIENTS_PASSED=team@example.com
EMAIL_RECIPIENTS_FAILED=team@example.com
SAUCE_USERNAME=your-username (if using cloud mode)
SAUCE_ACCESS_KEY=your-key (if using cloud mode)

# 3. Commit and push
git add .github/workflows/wdio.yml
git commit -m "Add GitHub Actions workflow"
git push

# 4. Clean up
rm -rf .cicd-templates
```

### Jenkins
```bash
# 1. Copy template
cp .cicd-templates/Jenkinsfile Jenkinsfile

# 2. Setup Jenkins Credentials
# Manage Jenkins → Credentials → Add:
# - gmail-credentials (Username with password)
# - sauce-credentials (Username with password, if using cloud)

# 3. Create Jenkins Pipeline Job
# New Item → Pipeline → OK
# Pipeline → Definition: Pipeline script from SCM
# SCM: Git
# Repository URL: your-repo-url
# Script Path: Jenkinsfile

# 4. Commit and push
git add Jenkinsfile
git commit -m "Add Jenkins pipeline"
git push

# 5. Clean up
rm -rf .cicd-templates
```

---

## 📝 Environment Variables

All platforms need these variables:

### Required
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_RECIPIENTS_PASSED=team@example.com
EMAIL_RECIPIENTS_FAILED=team@example.com
```

### Optional (for cloud mode)
```
SAUCE_USERNAME=your-username
SAUCE_ACCESS_KEY=your-access-key
SAUCE_REGION=us
```

### Optional (for mobile mode)
```
APPIUM_HOST=localhost
APPIUM_PORT=4723
```

---

## 🎯 Default Configuration

All templates are pre-configured with:
- **Execution Mode:** `local` (can be changed to `fast`, `cloud`, or `mobile`)
- **Test Environment:** `dev` (can be changed to `staging` or `prod`)
- **Node Version:** `18`
- **Java Version:** `17` (for Allure reports)

To change these, edit the variables in your chosen CI/CD file.

---

## ✅ Best Practices

1. **Choose ONE platform** - Don't keep multiple CI/CD files
2. **Delete templates folder** after copying - Keep repo clean
3. **Set secrets properly** - Never commit credentials
4. **Test locally first** - Run `npm run test:local` before pushing
5. **Review pipeline** - Check CI/CD runs after first push

---

## 🔗 More Information

See [ci-cd-environment-switching.md](../ci-cd-environment-switching.md) for detailed guide on:
- Switching between environments
- Manual pipeline triggers
- Scheduled runs
- Branch-specific configurations
