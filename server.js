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

// Exempeldata för produkter
const produkter = [
  { id: 1, name: "Svart t-shirt", image: "images/svart-tshirt-1.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis." },
  { id: 2, name: "Vit t-shirt", image: "images/1.png", price: "249kr", brand: "Levis", description: "En trendig vit t-shirt." },
  { id: 3, name: "Svart t-shirt", image: "images/svart-tshirt-3.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
  { id: 4, name: "Svart t-shirt", image: "images/svart-tshirt-4.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis." },
  { id: 5, name: "Svart t-shirt", image: "images/svart-tshirt-5.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
  { id: 6, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
  { id: 7, name: "Svart t-shirt", image: "images/svart-tshirt-7.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
  { id: 8, name: "Svart t-shirt", image: "images/svart-tshirt-8.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
];

// API-endpoint för produkter
app.get('/api/products', (req, res) => {
  res.json(produkter);
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
