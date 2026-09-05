import express from 'express';

// Situs ini sudah dihentikan permanen.
//
// Seluruh path merespons HTTP 410 Gone — sinyal ke mesin pencari bahwa
// halaman dihapus permanen dan boleh dibuang dari indeks.
//
// Padanan dari konfigurasi Apache:
//   RewriteEngine On
//   RewriteRule ^(.*)$ - [G,L]
//
// Catatan: 410 diterapkan ke SEMUA path, termasuk /robots.txt dan
// /sitemap.xml, sesuai permintaan.

const PORT = process.env.PORT || 30069;

const app = express();

// Halaman 410 dirender sekali saat start, bukan per request.
const GONE_PAGE = `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>410 — Situs Tidak Tersedia</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #ffffff;
    --fg: #18181b;
    --muted: #71717a;
    --line: #e4e4e7;
    --accent: #b45309;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0b0b0e;
      --fg: #f4f4f5;
      --muted: #a1a1aa;
      --line: #27272a;
      --accent: #f59e0b;
    }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--bg);
    color: var(--fg);
    font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI",
          Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  main { width: 100%; max-width: 30rem; }
  .code {
    display: inline-block;
    font: 600 12px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    letter-spacing: .12em;
    color: var(--accent);
    border: 1px solid currentColor;
    border-radius: 999px;
    padding: 6px 12px;
    margin-bottom: 24px;
  }
  h1 {
    margin: 0 0 12px;
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 650;
    letter-spacing: -.02em;
  }
  p { margin: 0 0 16px; color: var(--muted); }
  hr { border: 0; border-top: 1px solid var(--line); margin: 28px 0 16px; }
  footer { font-size: 13px; color: var(--muted); }
</style>
</head>
<body>
  <main>
    <span class="code">410 GONE</span>
    <h1>Situs ini sudah tidak tersedia</h1>
    <p>
      Halaman yang Anda tuju telah dihapus secara permanen dan tidak akan
      dipulihkan. Tidak ada alamat pengganti untuk tautan ini.
    </p>
    <p>
      Jika Anda tiba di sini dari hasil pencarian atau tautan lama, catatan
      tersebut sudah usang dan akan hilang dengan sendirinya.
    </p>
    <hr>
    <footer>Konten dihentikan permanen · HTTP 410 Gone</footer>
  </main>
</body>
</html>`;

app.use((req, res) => {
  res.status(410).type('html').send(GONE_PAGE);
});

app.listen(PORT, () => {
  console.log('410 Gone server started on port', PORT);
});
