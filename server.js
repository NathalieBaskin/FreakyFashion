const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Servera statiska filer från public-mappen
app.use(express.static(path.join(__dirname, "public")));

// Route för startsidan
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route för produktdetaljer-sidan
app.get("/product-details.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product-details.html"));
});

// Exempeldata för liknande produkter
const liknandeProdukter = [
  { id: 1, imageUrl: 'images/1.slide.png', link: '#link1' },
  { id: 2, imageUrl: 'images/2.slide.png', link: '#link2' },
  { id: 3, imageUrl: 'images/3.slide.png', link: '#link3' },
  { id: 4, imageUrl: 'images/4.slide.png', link: '#link4' },
  { id: 5, imageUrl: 'images/5.slide.png', link: '#link5' },
  { id: 6, imageUrl: 'images/6.slide.png', link: '#link6' },
  { id: 7, imageUrl: 'images/7.slide.png', link: '#link7' },
  { id: 8, imageUrl: 'images/8.slide.png', link: '#link8' },
];

// API-endpoint för liknande produkter
app.get('/api/liknande-produkter', (req, res) => {
  res.json(liknandeProdukter);
});

// Starta servern
app.listen(port, () => {
  console.log(`Servern lyssnar på http://localhost:${port}`);
});
