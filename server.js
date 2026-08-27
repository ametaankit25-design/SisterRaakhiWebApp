import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static assets from Vite dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback: send index.html for all other routes (Express 5 & 4 compatible)
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`🎉 Raksha Bandhan App running on http://${HOST}:${PORT}`);
});
