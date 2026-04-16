# Nut Meter (by Barn)

Nut tracking with a shared leaderboard, backed by a Netlify serverless function and Netlify Blobs for storage.

## Project structure

```
.
├── netlify.toml               # Netlify config
├── package.json               # Depends on @netlify/blobs
├── netlify/
│   └── functions/
│       └── nuts.js            # Serverless GET/POST handler at /api/nuts
└── public/
    └── index.html             # The frontend
```

## Deploy to Netlify (drag-and-drop or CLI)

### Option A — Deploy via GitHub (recommended)

1. Push this folder to a GitHub repo.
2. On https://app.netlify.com, click **Add new site → Import an existing project**.
3. Pick the repo. Leave build command empty. Set **publish directory** to `public`.
4. Click **Deploy**. Done — Netlify auto-detects the function in `netlify/functions/`.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
cd nutmeter-netlify
netlify init       # follow prompts, create a new site
netlify deploy --build --prod
```

### Option C — Drag & drop

Drag-and-drop **will not work** for this project because it needs the serverless function. Use Option A or B.

## How it works

- The frontend calls `GET /api/nuts` to load the shared data, and `POST /api/nuts` to save updates.
- The function reads/writes a single JSON blob (`data`) in a Netlify Blobs store named `nutmeter`.
- No database setup needed — Netlify Blobs is available automatically on any site.
- Anyone who visits the site sees the same leaderboard. Sign in with a username to start tracking.

## Local dev

```bash
npm install
netlify dev
```

Then open http://localhost:8888

## Notes

- There's no auth, so anyone with the URL can add to anyone's count. Since this is a small personal tool that's probably fine. If you want to lock it down, I can add a shared password or per-user PIN later.
- Netlify Blobs has a generous free tier — this app uses essentially nothing.
