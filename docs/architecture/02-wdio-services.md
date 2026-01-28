# WDIO 9.x Services & Architecture

## 🎯 Framework Architecture

This framework uses **WDIO 9.x** with 4 different services for 4 execution modes.

---

## 📦 Services Overview

### Service Matrix

| Execution Mode | Primary Service | Secondary Service | Driver Management |
|----------------|-----------------|-------------------|-------------------|
| **Local** | Built-in | `shared-store-service` | WDIO v9 auto-manages ChromeDriver |
| **Fast** | `@wdio/devtools-service` | `shared-store-service` | Chrome DevTools Protocol (no driver) |
| **Cloud** | `@wdio/sauce-service` | `shared-store-service` | Sauce Labs manages drivers |
| **Mobile** | `@wdio/appium-service` | `shared-store-service` | Appium manages drivers |

---

## 🔧 Service Details

### 1. Local Mode - Built-in Driver Management

**No service needed!** WDIO v9 automatically manages ChromeDriver.

```typescript
// config/wdio.local.conf.ts
services: [
    'shared-store-service',  // Only for parallel execution
]
```

**Features:**
- ✅ Auto-download ChromeDriver
- ✅ Auto-update driver versions
- ✅ Zero configuration
- ✅ Works out of the box

**Use Cases:**
- Local development
- Debugging
- Quick testing=

---

### 2. Fast Mode - DevTools Service

Uses Chrome DevTools Protocol for ultra-fast execution.

```typescript
// config/wdio.fast.conf.ts
services: [
    'devtools',
    'shared-store-service',
]
```

**Features:**
- ✅ No WebDriver needed
- ✅ Headless by default
- ✅ Fastest execution
- ✅ Chrome only

**Use Cases:**
- PR checks
- Smoke tests
- Quick validation

---

### 3. Cloud Mode - Sauce Labs Service

Cross-browser testing on Sauce Labs cloud.

```typescript
// config/wdio.cloud.conf.ts
services: [
    ['sauce', { sauceConnect: true }],
    'shared-store-service',
]
```

**Features:**
- ✅ Cross-browser (Chrome, Firefox, Safari, Edge)
- ✅ Multiple OS (Windows, macOS, Linux)
- ✅ Parallel execution
- ✅ Video recording

**Use Cases:**
- Production testing
- Cross-browser validation
- Large-scale regression

---

### 4. Mobile Mode - Appium Service

Mobile web and native app testing.

```typescript
// config/wdio.mobile.conf.ts
services: [
    ['appium', { command: 'appium', ... }],
    'shared-store-service',
]
```

**Features:**
- ✅ Android & iOS support
- ✅ Mobile web testing
- ✅ Native app testing
- ✅ Hybrid app support

**Use Cases:**
- Mobile testing
- Responsive design validation
- Mobile-specific features

---

## 🌟 Shared Store Service

**Purpose:** Share data between parallel test workers.

**Available in:** All 4 execution modes

**Use Cases:**
- Share authentication tokens
- Share test data
- Coordinate test execution
- Prevent race conditions

**Example:**
```typescript
import { getValue, setValue } from '@wdio/shared-store-service';

// Worker 1
await setValue('authToken', 'abc123');

// Worker 2
const token = await getValue('authToken');
```

---

## 📊 Comparison: WDIO v8 vs v9

| Feature | WDIO v8 | WDIO v9 |
|---------|---------|---------|
| **Driver Management** | Manual (need service) | Built-in auto-management |
| **ChromeDriver Service** | `wdio-chromedriver-service` | Not needed |
| **DevTools Service** | v8.x | v10.x (improved) |
| **Setup Complexity** | Higher | Lower |
| **Maintenance** | More dependencies | Fewer dependencies |

---

## 🎯 Choosing the Right Mode

```
┌─────────────────────────────────────────┐
│     Choose Execution Mode               │
└─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┬───────────┐
        │           │           │           │
   ┌────▼────┐ ┌───▼────┐ ┌───▼────┐ ┌────▼────┐
   │  Local  │ │  Fast  │ │ Cloud  │ │ Mobile  │
   └─────────┘ └────────┘ └────────┘ └─────────┘
        │           │           │           │
   Developer   Smoke Test  Cross-    Mobile
   Testing     PR Check    Browser   Testing
```

---

## 📦 Dependencies

```json
{
  "@wdio/cli": "^9.0.0",
  "@wdio/devtools-service": "^10.0.0",
  "@wdio/sauce-service": "^9.0.0",
  "@wdio/appium-service": "^9.0.0",
  "@wdio/shared-store-service": "^9.0.0",
  "webdriverio": "^9.0.0"
}
```

**Note:** No `wdio-chromedriver-service` needed in v9!

---

## ✅ Benefits

### 1. Simplified Local Testing
- No manual driver management
- Auto-updates
- Zero config

### 2. Flexible Execution
- 4 modes for different needs
- Easy to switch
- Optimized for each use case

### 3. Parallel Ready
- Shared Store in all modes
- Data sharing between workers
- Better coordination

### 4. Future-Proof
- Latest WDIO version
- Active development
- Modern features

---

**See Also:**
- [Execution Modes](03-execution-modes.md)
- [Environment Switching](../guides/06-environment-switching.md)
