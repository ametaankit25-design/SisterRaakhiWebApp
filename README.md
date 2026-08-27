# 🎁 Raksha Bandhan Gift Challenge Web App

A mobile-first interactive gift-revealing quest for your sister on Raksha Bandhan!

---

## 🚀 How to Host on Railway (Step-by-Step)

### Option 1: Deploy from GitHub (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/SisterRakshiWeb.git
   git push -u origin main
   ```
2. Go to **[Railway.app](https://railway.app)**.
3. Click **"New Project"** → **"Deploy from GitHub repo"**.
4. Select your repository.
5. Railway will automatically detect the configuration (`railway.json`, `npm run build`, and `npm start`) and deploy your site!
6. Click on the generated public domain (or add a custom domain) and send the link to your sister! 🎉

---

### Option 2: Deploy with Railway CLI
1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```
2. Login and deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

---

## 🛠️ Personalizing Content
All texts, questions, sister/brother names, and hidden gift locations can be edited in:
👉 `src/config.ts`

- **Sister Name**: `sisterName`
- **Brother Name**: `brotherName`
- **Photo Quiz**: `photoQuiz.photoUrl`, `question`, `options`, `correctAnswerId`
- **Dance Challenge**: `danceChallenge.durationSeconds`
- **Hidden Gift Location & Clue**: `giftReveal.locationText` & `giftReveal.clue`
