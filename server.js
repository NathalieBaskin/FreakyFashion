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
  { id: 2, name: "Vit t-shirt", image: "images/1.png", price: "299kr", brand: "Aquas", description: "En trendig vit t-shirt." },
  { id: 3, name: "Röd t-shirt", image: "images/2.png", price: "599kr", brand: "Trasher", description: "En cool Röd t-shirt från Trasher." },
  { id: 4, name: "Vit t-shirt", image: "images/3.png", price: "399kr", brand: "Adias", description: "En snygg Vit t-shirt från Adidas." },
  { id: 5, name: "Svart t-shirt", image: "images/svart-tshirt-5.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
  { id: 6, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
  { id: 7, name: "Svart t-shirt", image: "images/svart-tshirt-7.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
  { id: 8, name: "Svart t-shirt", image: "images/svart-tshirt-8.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
  { id: 9, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
];

// API-endpoint för liknande produkter
app.get('/api/liknande-produkter', (req, res) => {
  res.json(produkter);
});

// Starta servern
app.listen(port, () => {
  console.log(`Servern lyssnar på http://localhost:${port}`);
});
