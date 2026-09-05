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

app.use((req, res) => {
  res.status(410).type('text/plain').send('410 Gone');
});

app.listen(PORT, () => {
  console.log('410 Gone server started on port', PORT);
});
