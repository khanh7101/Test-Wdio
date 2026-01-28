# 🎯 Quick Start - CI/CD Setup

## When You Start a New Project

### Step 1: Choose ONE CI/CD Platform

Pick the platform your team uses:

#### GitLab CI
```bash
cp .cicd-templates/gitlab-ci.yml .gitlab-ci.yml
```

#### GitHub Actions  
```bash
mkdir -p .github/workflows
cp .cicd-templates/github-actions.yml .github/workflows/wdio.yml
```

#### Jenkins
```bash
cp .cicd-templates/Jenkinsfile Jenkinsfile
```

---

### Step 2: Delete Templates Folder
```bash
rm -rf .cicd-templates
```

---

### Step 3: Setup Environment
```bash
# Copy env template
cp .env.example .env

# Edit with your values
vim .env
```

---

### Step 4: Configure CI/CD Secrets

#### GitLab CI
**Settings → CI/CD → Variables**

Add these variables:
```
GMAIL_USER = your-email@gmail.com
GMAIL_APP_PASSWORD = xxxx-xxxx-xxxx-xxxx
EMAIL_RECIPIENTS_PASSED = team@example.com
EMAIL_RECIPIENTS_FAILED = team@example.com,dev@example.com
```

#### GitHub Actions
**Settings → Secrets → Actions → New repository secret**

Add these secrets:
```
GMAIL_USER = your-email@gmail.com
GMAIL_APP_PASSWORD = xxxx-xxxx-xxxx-xxxx
EMAIL_RECIPIENTS_PASSED = team@example.com
EMAIL_RECIPIENTS_FAILED = team@example.com,dev@example.com
```

#### Jenkins
**Manage Jenkins → Credentials → Add Credentials**

Add:
- **gmail-credentials** (Username with password)
  - Username: your-email@gmail.com
  - Password: your-app-password

---

### Step 5: Commit and Push
```bash
git add .
git commit -m "Setup CI/CD for [platform-name]"
git push
```

---

## ✅ Done!

Your CI/CD pipeline will automatically run on:
- Push to main branch
- Pull requests
- Manual triggers

---

## 📝 Default Configuration

All templates come with:
- **Execution Mode:** `local`
- **Test Environment:** `dev`
- **Node Version:** 18
- **Java Version:** 17

To change these, edit variables in your CI/CD file.

---

## 🔗 Need Help?

See detailed guides:
- [.cicd-templates/README.md](.cicd-templates/README.md) - Full setup instructions
- [ci-cd-environment-switching.md](ci-cd-environment-switching.md) - Advanced configurations
