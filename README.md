# BALA MODS — Admin Panel

Premium admin panel for the BALA MODS modding/tools app. Manage keys, floating panel buttons, site settings and app updates from one place.

## Features

- **Secure Login** — Firebase Authentication (email + password), save-password toggle, 24h auto-logout
- **Dashboard** — live stats (users, keys, active/expired/banned, floating buttons), recent keys, one-click backup/export (JSON)
- **User Keys** — add/ban/unban/delete keys, random key generator, lifetime or timed expiry, device binding with device-limit chips, clear expired keys
- **Floating Buttons** — user app ka floating panel control: panel ON/OFF, unlimited buttons add/edit/delete, har button ka name + ZIP file link + ON/OFF toggle (app me ON karte hi ZIP download + extract)
- **Settings**
  - Site Settings — site title, Telegram / WhatsApp links, find-password link, maintenance mode, popup, force redirect, app update / version push
- **Responsive** — desktop sidebar + mobile bottom nav
- **Custom SVG icons** — all UI icons are inline SVG (no emoji)

## Tech Stack

- Plain HTML + CSS + JavaScript (no build step)
- Firebase Realtime Database
- Firebase Authentication
- Hosted as static files (Firebase Hosting / any static host)

## File Structure

```
├── index.html            # Login page
├── dashboard.html        # Overview / stats / backup
├── keys.html             # User key management
├── floating.html         # Floating panel button control
├── settings.html         # Site settings / app update
├── firebase-config.js    # Firebase app config
├── rules.json            # Realtime Database security rules
└── README.md
```

## Firebase Setup

1. Create a Firebase project: **primuim-panel-v1**
2. **Authentication → Sign-in method → Email/Password → Enable**
3. **Authentication → Users → Add user** (add the admin email + password)
4. **Realtime Database → Create Database** (start in test mode, then set rules below)
5. Update **firebase-config.js** with your project values if they change:

```js
apiKey: "AIzaSyBYXE3V9k6nf7Dp6n2UlfmjxWPS8E9_LOU",
databaseURL: "https://primuim-panel-v1-default-rtdb.firebaseio.com",
projectId: "primuim-panel-v1"
```

6. **Realtime Database → Rules** — paste the full contents of `rules.json` and click **Publish**.

## Deploy

Host the folder on any static host (Firebase Hosting, Netlify, Vercel, cPanel, etc.). Open `index.html`, login with the admin email and start managing.

## Backup / Restore

- **Export:** Dashboard → Backup / Export → downloads the whole DB as a JSON file
- **Restore:** (manual) paste the JSON back via Firebase Console → Realtime Database → import

## Notes

- Admin-only area: every page checks auth state; sessions auto-expire after 24 hours.
- Rules publish ke baad hi naye rules apply hote hain (App Update save ke liye login chahiye).
- Floating buttons: user app `floatingButtons` node parhega — `enabled` (panel ON/OFF) aur `buttons` (name, url, enabled, order). Button ON karne par app media ZIP download karke extract karta hai.
