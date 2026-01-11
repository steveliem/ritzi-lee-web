# Ritzi-Lee.com — Static Site + Secure Contact Form (Cloudflare)

This repository contains the full source and configuration for **ritzi-lee.com**.  
The site is fully static, edge-hosted on Cloudflare Pages, with a hardened contact form using Cloudflare Turnstile and Resend for email delivery.

---

## 🧱 Architecture Overview

**Frontend**
- Static HTML / CSS / JS
- Hosted on **Cloudflare Pages**
- Contact form shown in an overlay (iframe submit)

**Backend (Edge)**
- Cloudflare Pages Functions (TypeScript)
- `@cloudflare/pages-plugin-static-forms`
- Server-side Turnstile validation
- Strict Origin / Referer / HTTPS enforcement

**Email**
- **Resend** (HTTP email API)
- From address under `ritzi-lee.com`
- Delivery to `contact@ritzi-lee.com`
- Cloudflare Email Routing forwards to real inbox

**No servers. No SMTP. No cron jobs.**

---

## 🔐 Security Model (Important)

The contact form is protected by **three independent layers**:

1. **Origin / Referer validation**
   - Only `https://ritzi-lee.com` (and `https://www.ritzi-lee.com`) allowed
   - All cross-site POSTs return `403`

2. **Cloudflare Turnstile**
   - Client-side widget
   - **Server-side verification** (mandatory)
   - Curl / scripts without JS always fail

3. **Email delivery isolation**
   - Email is only sent *after* Turnstile + origin validation
   - No direct mail endpoints exposed

This means:
- Bots fail
- Curl fails
- CSRF fails
- Humans with browsers succeed

---

## 📁 Project Structure

```

/
├─ public/
│  └─ (static assets)
│
├─ functions/
│  ├─ index.ts            # Pages Function (Turnstile + Resend + Static Forms)
│  └─ _middleware.ts      # Origin / Referer gate
│
├─ package.json
├─ wrangler.jsonc
└─ README.md

```

---

## ⚙️ Cloudflare Configuration

### 1. Cloudflare Pages
- Create a Pages project
- Connect to this Git repository
- Build command: **none**
- Output directory: `/`

### 2. DNS
- Domain: `ritzi-lee.com`
- DNS managed by Cloudflare
- Proxy **disabled** for all mail-related records

---

## 🔑 Required Secrets (Pages → Settings → Environment Variables)

### Production Environment

| Name | Description |
|----|----|
| `TURNSTILE_SECRET` | Cloudflare Turnstile **secret key** |
| `RESEND_API_KEY` | Resend API key |

> ⚠️ Never commit secrets to Git.

---

## 🧩 Turnstile Setup

### Cloudflare Dashboard
1. Security → Turnstile
2. Create a widget
3. Add allowed domain:
```

ritzi-lee.com

```

### Frontend
- Widget rendered client-side
- Uses **implicit rendering**
- Token is sent as `cf-turnstile-response`

### Backend
- Token is verified server-side via:
```

[https://challenges.cloudflare.com/turnstile/v0/siteverify](https://challenges.cloudflare.com/turnstile/v0/siteverify)

```

Requests without a valid token return:
```

403 FORBIDDEN_TURNSTILE_MISSING_TOKEN

```

---

## ✉️ Resend Setup

### 1. Add Domain
- Domain: `ritzi-lee.com`
- Add all DNS records shown by Resend (SPF / DKIM)
- Wait for **Verified**

### 2. Sender Address
Example:
```

[no-reply@ritzi-lee.com](mailto:no-reply@ritzi-lee.com)

````

Must match verified domain.

### 3. Email Flow
- Pages Function → Resend API
- Resend → `contact@ritzi-lee.com`
- Cloudflare Email Routing forwards mail to real inbox

---

## 🧪 Test Checklist

### 1️⃣ Curl (should FAIL)
```bash
curl -i https://ritzi-lee.com/ \
  -X POST \
  -H "Origin: https://ritzi-lee.com" \
  -H "Referer: https://ritzi-lee.com/" \
  --data "name=Test&email=test@test.com&text=Hello"
````

**Expected**

```
403 FORBIDDEN_TURNSTILE_MISSING_TOKEN
```

---

### 2️⃣ Wrong Origin (should FAIL)

```bash
curl -i https://ritzi-lee.com/ \
  -X POST \
  -H "Origin: https://evil.example" \
  -H "Referer: https://evil.example/" \
  --data "name=Test"
```

**Expected**

```
403 Forbidden
```

---

### 3️⃣ Browser Submit (should SUCCEED)

* Open site
* Fill form
* Complete Turnstile
* Submit

**Expected**

* HTTP 200 `OK`
* Email arrives at `contact@ritzi-lee.com`

---

## 🚀 Deployment Steps (From Scratch)

1. Clone repository
2. Create Cloudflare Pages project
3. Add environment variables
4. Configure Turnstile widget
5. Configure Resend + DNS
6. Verify domain
7. Push to `master`
8. Done

No build step required.

---

## 🛑 What NOT to Do

* ❌ Do not add SMTP libraries
* ❌ Do not disable Turnstile server verification
* ❌ Do not accept POSTs without Origin checks
* ❌ Do not proxy mail DNS records in Cloudflare

---

## 🧠 Final Notes

* This setup is **stateless**, **serverless**, and **edge-native**
* Zero backend maintenance
* Zero spam exposure
* Fully compliant with modern security practices (2026+)

---

**Site status:** ✅ Production
**Last verified:** January 2026
**Maintainer:** Steve Liem

