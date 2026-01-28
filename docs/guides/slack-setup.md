# Slack Integration Setup Guide

## 🎯 Tổng Quan

Hướng dẫn setup Slack notifications cho WDIO test automation framework.

---

## 📋 Yêu Cầu

- Slack workspace
- Quyền tạo Incoming Webhooks
- WDIO framework đã cài đặt

---

## 🔧 Bước 1: Tạo Slack Webhook

### 1.1. Truy cập Slack App Directory

1. Vào [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Chọn **"From scratch"**

### 1.2. Cấu Hình App

1. **App Name:** `WDIO Test Reporter`
2. **Workspace:** Chọn workspace của bạn
3. Click **"Create App"**

### 1.3. Enable Incoming Webhooks

1. Trong app settings, click **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** → ON
3. Click **"Add New Webhook to Workspace"**
4. Chọn channel muốn nhận notifications (ví dụ: `#test-automation`)
5. Click **"Allow"**

### 1.4. Copy Webhook URL

Webhook URL sẽ có dạng:
```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

**⚠️ Lưu ý:** Giữ URL này bí mật!

---

## 🔧 Bước 2: Cấu Hình Project

### 2.1. Cập Nhật .env File

Tạo/cập nhật file `.env`:

```env
# Slack Configuration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_ENABLED=true
REPORT_URL=https://your-ci-server.com/allure-report
```

**Giải thích:**
- `SLACK_WEBHOOK_URL`: Webhook URL từ bước 1.4
- `SLACK_ENABLED`: `true` để enable, `false` để disable
- `REPORT_URL`: (Optional) Link đến Allure report trên CI/CD

### 2.2. Verify Configuration

File `config/wdio.base.conf.ts` đã được config sẵn với Slack reporter.

**Kiểm tra:**
```typescript
reporters: [
  // ... other reporters
  ...(process.env.SLACK_ENABLED === 'true' && process.env.SLACK_WEBHOOK_URL
    ? [['@moroo/wdio-slack-reporter', { ... }]]
    : [])
]
```

---

## 🧪 Bước 3: Test Slack Integration

### 3.1. Test Local

```bash
# Enable Slack trong .env
SLACK_ENABLED=true

# Chạy test
npm run test:local
```

### 3.2. Test Với Specific Webhook

```bash
SLACK_ENABLED=true \
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL \
npm run test:local
```

### 3.3. Verify Notification

Sau khi test chạy xong, kiểm tra Slack channel:

**Message sẽ bao gồm:**
- ✅ Test results summary
- 📊 Pass/Fail statistics
- 🔗 Link to detailed report (nếu có REPORT_URL)
- ⏱️ Execution time
- 🖥️ Environment info

---

## 📊 Bước 4: Customize Notifications

### 4.1. Chỉ Notify Khi Fail

Thêm vào `.env`:
```env
SLACK_NOTIFY_ON_FAIL_ONLY=true
```

### 4.2. Custom Message Format

Edit `config/wdio.base.conf.ts`:

```typescript
[
  '@moroo/wdio-slack-reporter',
  {
    slackOptions: {
      type: 'web-api',
      webhook: process.env.SLACK_WEBHOOK_URL,
      slackName: 'WDIO Test Reporter',
      slackIconUrl: 'https://your-custom-icon.png',
    },
    title: 'Custom Test Results Title',
    resultsUrl: process.env.REPORT_URL || '',
    notifyOnlyOnFailure: process.env.SLACK_NOTIFY_ON_FAIL_ONLY === 'true',
  },
]
```

---

## 🚀 Bước 5: CI/CD Integration

### 5.1. Jenkins

Thêm vào Jenkinsfile:

```groovy
environment {
  SLACK_WEBHOOK_URL = credentials('slack-webhook-url')
  SLACK_ENABLED = 'true'
  REPORT_URL = "${BUILD_URL}allure"
}
```

### 5.2. GitLab CI

Thêm vào `.gitlab-ci.yml`:

```yaml
variables:
  SLACK_ENABLED: "true"
  REPORT_URL: "$CI_JOB_URL/artifacts/browse/allure-report"

test:
  script:
    - npm run test:local
  variables:
    SLACK_WEBHOOK_URL: $SLACK_WEBHOOK_URL_SECRET
```

### 5.3. GitHub Actions

Thêm vào workflow:

```yaml
env:
  SLACK_ENABLED: true
  SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
  REPORT_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

---

## 🔍 Troubleshooting

### Issue 1: Không Nhận Được Notification

**Kiểm tra:**
1. ✅ `SLACK_ENABLED=true` trong .env
2. ✅ Webhook URL đúng
3. ✅ Slack app có quyền post vào channel
4. ✅ Network không block Slack API

**Test webhook:**
```bash
curl -X POST -H 'Content-type: application/json' \
--data '{"text":"Test message"}' \
YOUR_WEBHOOK_URL
```

### Issue 2: Error "Invalid Webhook URL"

**Nguyên nhân:** Webhook URL sai format

**Giải pháp:**
- Verify URL có đúng format: `https://hooks.slack.com/services/...`
- Tạo lại webhook nếu cần

### Issue 3: Message Format Lỗi

**Nguyên nhân:** Reporter config sai

**Giải pháp:**
- Check `wdio.base.conf.ts` config
- Verify all required fields có giá trị

---

## 📝 Best Practices

### 1. Security

- ❌ **KHÔNG** commit webhook URL vào git
- ✅ Dùng environment variables
- ✅ Dùng CI/CD secrets
- ✅ Rotate webhooks định kỳ

### 2. Notification Strategy

- ✅ Chỉ notify khi có failures (production)
- ✅ Notify all results (development)
- ✅ Separate channels cho different environments

### 3. Message Content

- ✅ Include link to detailed report
- ✅ Show summary statistics
- ✅ Mention relevant team members khi fail
- ✅ Include environment info

---

## 📚 Tham Khảo

- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [@moroo/wdio-slack-reporter](https://www.npmjs.com/package/@moroo/wdio-slack-reporter)
- [WebdriverIO Reporters](https://webdriver.io/docs/reporters)

---

## ✅ Checklist

- [ ] Tạo Slack webhook
- [ ] Cập nhật .env với webhook URL
- [ ] Set SLACK_ENABLED=true
- [ ] Test local
- [ ] Verify notification nhận được
- [ ] Configure CI/CD
- [ ] Document cho team

---

**Last Updated:** 2026-01-28
