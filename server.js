const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); // Importera body-parser
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// Middleware för att hantera JSON och URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exempeldata för produkter
const produkter = [
  {
    id: 1,
    name: "Svart t-shirt",
    image: "images/svart-tshirt-1.png",
    price: "199kr",
    brand: "Levis",
    description: "En snygg svart t-shirt från Levis.",
  },
  {
    id: 2,
    name: "Vit t-shirt",
    image: "images/1.png",
    price: "299kr",
    brand: "Aquas",
    description: "En trendig vit t-shirt.",
  },
  {
    id: 3,
    name: "Röd t-shirt",
    image: "images/2.png",
    price: "599kr",
    brand: "Trasher",
    description: "En cool Röd t-shirt från Trasher.",
  },
  {
    id: 4,
    name: "Vit t-shirt",
    image: "images/3.png",
    price: "399kr",
    brand: "Adidas",
    description: "En snygg Vit t-shirt från Adidas.",
  },
  {
    id: 5,
    name: "Svart t-shirt",
    image: "images/svart-tshirt-5.png",
    price: "249kr",
    brand: "Levis",
    description: "En trendig svart t-shirt från Levis.",
  },
  {
    id: 6,
    name: "Svart t-shirt",
    image: "images/svart-tshirt-6.png",
    price: "299kr",
    brand: "Levis",
    description: "En cool svart t-shirt från Levis.",
  },
  {
    id: 7,
    name: "Svart t-shirt",
    image: "images/svart-tshirt-7.png",
    price: "249kr",
    brand: "Levis",
    description: "En trendig svart t-shirt från Levis.",
  },
  {
    id: 8,
    name: "Svart t-shirt",
    image: "images/svart-tshirt-8.png",
    price: "299kr",
    brand: "Levis",
    description: "En cool svart t-shirt från Levis.",
  },
  {
    id: 9,
    name: "Svart t-shirt",
    image: "images/svart-tshirt-9.png",
    price: "299kr",
    brand: "Levis",
    description: "En cool svart t-shirt från Levis.",
  },
];

// GET-rutt för att hämta produkter
app.get("/api/products", (req, res) => {
  res.json(produkter);
});

// DELETE-rutt för att ta bort en produkt
app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = produkter.findIndex(product => product.id === productId);

  if (index !== -1) {
    produkter.splice(index, 1);
    return res.status(200).json({ message: "Produkt borttagen." });
  } else {
    return res.status(404).json({ message: "Produkt hittades inte." });
  }
});

// GET-rutt för att hämta en specifik produkt för redigering
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = produkter.find(product => product.id === productId);

  if (product) {
    return res.json(product);
  } else {
    return res.status(404).json({ message: "Produkt hittades inte." });
  }
});

// Ny produkt sida
app.get("/admin/products/new", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "products", "new.html"));
});

// Rutt för att visa produktredigering
app.get("/admin/products/edit/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "products", "edit.html")); // Se till att denna fil finns
});

// Starta servern
app.listen(port, () => {
  console.log(`Servern lyssnar på http://localhost:${port}`);
});