# GANDU PANEL — Admin Panel

Admin control panel for the mod app. Manage user keys, floating panel buttons, GitHub mod uploads, notifications and site settings from one place.

## Features

- **Secure Login** — Firebase email + password, optional "Save Password", developer-only support links, 24-hour auto-logout
- **Dashboard** — live stats (devices, keys, active/expired/banned, floating buttons), recent keys, full DB export (JSON)
- **User Keys** — add / lock / ban / delete keys, random key generator, lifetime or timed expiry, device binding with device-limit chips, clear expired keys, per-key developer password lock
- **Floating Buttons** — panel ON/OFF control, unlimited buttons (name, icon, ON/OFF ZIP URLs, order), live button preview
- **Panel Upload** — GitHub ZIP file manager: locked settings card (developer only), upload with live progress, file list with copy/open/delete, display names
- **Notifications** — create / toggle / delete in-app notifications
- **Settings** — site title, Telegram / WhatsApp / find-password links, maintenance mode, popup, force redirect, app update / version push
- **Developer Page** — contact cards (Telegram / WhatsApp), reseller program
- **Responsive** — desktop sidebar + mobile bottom nav, touch-friendly controls
- **Inline SVG icons** — no icon fonts or external icon libraries

## Tech Stack

- Plain HTML + CSS + JavaScript (no build step, no framework)
- Firebase Realtime Database + Firebase Authentication
- GitHub REST API (for ZIP hosting)
- Static hosting (Firebase Hosting, Netlify, Vercel, cPanel, GitHub Pages, …)

## File Structure

```
├── index.html             # Login page
├── dashboard.html         # Overview, stats, backup
├── keys.html              # User key management
├── floating.html          # Floating panel buttons
├── paneluplode.html       # GitHub ZIP upload / file manager
├── notifications.html     # In-app notifications
├── settings.html          # Site settings / app update
├── developer.html         # Support / contact / reseller
├── css/
│   └── style.css           # Design system: tokens, layout, components, responsive
├── js/
│   ├── script.js           # Shared logic: auth, toast, modal, nav, helpers
│   └── firebase-config.js  # Firebase app config
├── rules/
│   ├── full safe ruls.json  # ← publish this one
│   ├── rules.json            # Rules copy (stale, reference only)
│   └── key publish.json      # Legacy rules copy
├── mods/                  # Local mod files folder
└── README.md
```

### Page asset paths

HTML files sit in the project root, so they reference the folders like this:

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js" defer></script>
```

```js
import { auth, db } from "../js/firebase-config.js";   // two dots = go up to root
```

## Firebase Setup

1. Firebase project: **br-paid-panel-e236f**
2. **Authentication → Sign-in method → Email/Password → Enable**
3. **Authentication → Users → Add user** — create the admin account
4. **Realtime Database → Create Database** (any region, lock mode can be temporary)
5. Copy the admin UID from **Authentication → Users** and replace `ALLOWED_UID` in `index.html` plus the `auth.uid === '...'` values in `full safe ruls.json`
6. **Realtime Database → Rules** — paste the full contents of `rules/full safe ruls.json` and click **Publish** (not `rules/rules.json`)
7. Update `js/firebase-config.js` if the project values ever change:

```js
apiKey: "AIzaSyCOv0exu9_phq13OiAXewi8LrGnG2jrcWc",
authDomain: "br-paid-panel-e236f.firebaseapp.com",
databaseURL: "https://br-paid-panel-e236f-default-rtdb.firebaseio.com",
projectId: "br-paid-panel-e236f"
```

## GitHub Setup (for Panel Upload)

1. Create a repository (e.g. `admin-gandu-panel`) — repository names cannot contain spaces
2. **Settings → Developer settings → Personal access tokens → Generate new token (classic)** with the `repo` scope
3. In the panel: **Panel Upload → GitHub Settings** (unlock with the developer password) → paste token, owner and repository → **Save** → **Test Connection**
4. Uploads land in the repo's `mods/` folder (created automatically on the first upload) and each file gets a direct `download_url`

## Deploy

Upload the whole folder to any static host and open `index.html`. No build or npm step required.

## Database Structure

| Node | Access | Purpose |
| --- | --- | --- |
| `siteSettings` | public read, admin write | site title, links, maintenance, popup, redirect |
| `appUpdate` | public read, admin write | version / update push |
| `floatingButtons` | public read, admin write | `enabled` (panel ON/OFF) + `buttons` (name, icon, onUrl, offUrl, enabled, order) |
| `notifications` | public read, admin write | in-app notification messages |
| `categories` / `posts` | public read, admin write | app content data |
| `ActiveUserKeys` | authenticated read, admin write | user keys, expiry, ban, device binding |
| `BannedDevices` | admin only | banned device ids |
| `users` | admin only | registered users / devices |
| `panelSettings` | admin only | GitHub token + owner + repo (locked UI, synced across devices) |
| `NOXBHAI123` | admin only  | locked UI, synced across devices |

## Security Notes

  shooterarman116
- Every page verifies the auth state and the admin UID; sessions expire after 24 hours
- The GitHub settings card is hidden behind a developer password in the UI — this is a convenience lock, not encryption. The token is still reachable through browser storage, so keep the admin account private
- `ActiveUserKeys.boundDeviceId` / `boundDevices` are writable without Firebase auth because the Android app binds devices without signing in. Lock this down once the app uses (anonymous) Firebase Auth
- Publish rules before testing saves; unsaved or old rules cause `PERMISSION_DENIED` errors

## Backup / Restore 

- **Export:** Dashboard → Export / Backup → downloads the database as JSON
- **Restore:** import the JSON through Firebase Console → Realtime Database → Import
