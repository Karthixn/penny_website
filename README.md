# Penny — Showcase Website

Official responsive showcase website for **Penny**, the 100% free, dark-first Android expense tracker and group bill-splitting application.

---

## ⚡ Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS (custom fintech dark-surface tokens: `#0C0D14`, `#191B26`, `#7C6FF7`)
- **Icons**: Lucide React
- **Distribution**: Google Drive (`https://drive.google.com/file/d/1FcK3LOytHXnaUrgc3ddT4xl73aCPoIty/view?usp=sharing`)
- **Output**: Pure static export (~2.3 MB)

---

## 🚀 The Easiest Ways to Host (100% Free)

### 🥇 Method 1: Netlify Drop (Easiest — 30 Seconds, No Terminal Needed)
1. Build the production files:
   ```bash
   npm run build
   ```
2. Open **[app.netlify.com/drop](https://app.netlify.com/drop)** in your browser.
3. Drag and drop the `dist/` folder from `d:\Personal\app\penny website\dist` into the browser window.
4. **Done!** You get an instant live HTTPS website (e.g., `https://penny-showcase.netlify.app`).

---

### 🥈 Method 2: Vercel CLI (1-Command Terminal Deploy)
Run the following in your project folder:
```bash
npx vercel
```
Follow the 3 quick prompts (press Enter to accept defaults). Vercel will instantly publish the site to a free global HTTPS URL.

---

### 🥉 Method 3: GitHub Pages
If you push this repository to GitHub:
1. In `vite.config.ts`, ensure `base: './'` is set (already done).
2. Go to your GitHub repository -> **Settings** -> **Pages**.
3. Under Build and deployment, choose **GitHub Actions** -> **Static HTML**, or deploy the `dist` branch.

---

## 🛠️ Local Development

```bash
# Start local development server
npm run dev

# Build production bundle (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ Updating the APK Download Link

To change or update the Google Drive download link in the future, simply edit `gdriveUrl` in [`src/data/siteContent.ts`](src/data/siteContent.ts):

```typescript
export const DOWNLOAD_CONFIG = {
  sourceType: 'gdrive' as const,
  gdriveUrl: 'https://drive.google.com/file/d/YOUR_NEW_FILE_ID/view?usp=sharing',
  ...
};
```
All buttons across the site (Navbar, Hero, Tour, Download section, Footer) will update automatically.
