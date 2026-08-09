# CHAVANA STUDIO

The portfolio remains a static vanilla HTML/CSS/JavaScript site. The **CHAVANA / PROJECT BRIEF** experience opens from the existing “Start a project” buttons and uses one small Vercel serverless function for secure Telegram delivery.

## Local preview

Serve the project folder through a local web server (opening `index.html` directly is not recommended):

```bash
npx serve .
```

The form, bilingual UI, validation, review, autosave and `.txt` download work locally. Automatic delivery needs the Vercel environment variables below. When the API is unavailable, the form deliberately keeps the draft and displays the download/contact fallback.

## Telegram bot setup

1. In Telegram, open **@BotFather**, run `/newbot`, and follow its prompts.
2. Copy the bot token and keep it private. Never add it to HTML or browser JavaScript.
3. Open the new bot from the Telegram account that should receive briefs. Press **Start** or send `/start`.
4. Obtain the numeric private chat ID. One simple method is to visit the Bot API `getUpdates` endpoint after sending `/start`, then read `message.chat.id` from the returned update. Keep the token out of screenshots, source control and shared messages.
5. Create/import the project in Vercel.
6. In **Project Settings → Environment Variables**, add:

   - `TELEGRAM_BOT_TOKEN` — the private token from BotFather
   - `TELEGRAM_CHAT_ID` — the numeric private chat ID from the update

7. Apply the variables to Production (and Preview if desired), then redeploy.
8. Submit one test brief and confirm that a UTF-8 `.txt` document appears in the private Telegram conversation.

The public profile [`t.me/ashkanwaisi`](https://t.me/ashkanwaisi) is only the visible fallback contact link. Automatic server-side bot delivery requires the configured numeric `TELEGRAM_CHAT_ID`; a public username alone cannot replace it.

## Deployment

The endpoint is located at `api/submit-brief.js` and is exposed by Vercel as `POST /api/submit-brief`. No database is used. The endpoint:

- revalidates required fields and contact details;
- rejects malformed, oversized and honeypot submissions;
- applies a basic in-memory rate limit;
- regenerates the authoritative readable `.txt` in memory;
- sends it with Telegram Bot API `sendDocument`;
- returns success only after Telegram accepts the document.

Vercel’s Node.js 18+ runtime is required for native `fetch`, `FormData`, `Blob`, and `AbortSignal.timeout`.

## Main files

- `index.html` — existing portfolio plus the isolated brief application layer
- `css/style.css` — existing design plus scoped `.brief-*` styles
- `js/brief.js` — bilingual fields, state, validation, review and download
- `api/submit-brief.js` — secure Telegram serverless delivery

Do not commit `.env` files or Telegram credentials.
