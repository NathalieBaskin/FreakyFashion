const express = require("express");
const bodyParser = require("body-parser"); // Importera body-parser
const path = require("path");
const fs = require("fs"); // Importera fs för filsystemet
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Mapp där uppladdade filer sparas

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Exempeldata för produkter
const produkter = [
  { id: 1, name: "Svart t-shirt", image: "images/svart-tshirt-1.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis.", publishDate: '2024-10-20' },
  { id: 2, name: "Vit t-shirt", image: "images/1.png", price: "299kr", brand: "Aquas", description: "En trendig vit t-shirt.", publishDate: '2024-10-15' },
  { id: 3, name: "Röd t-shirt", image: "images/2.png", price: "599kr", brand: "Trasher", description: "En cool Röd t-shirt från Trasher.", publishDate: '2024-10-22' },
  { id: 4, name: "Vit t-shirt", image: "images/3.png", price: "399kr", brand: "Adias", description: "En snygg Vit t-shirt från Adidas.", publishDate: '2024-10-18' },
  { id: 5, name: "Svart t-shirt", image: "images/svart-tshirt-5.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis.", publishDate: '2024-10-05' },
  { id: 6, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis.", publishDate: '2024-10-10' },
  { id: 7, name: "Svart t-shirt", image: "images/svart-tshirt-7.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis.", publishDate: '2024-10-01' },
  { id: 8, name: "Svart t-shirt", image: "images/svart-tshirt-8.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis.", publishDate: '2024-10-20' },
  { id: 9, name: "Svart t-shirt", image: "images/svart-tshirt-9.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis.", publishDate: '2024-10-12' },
  { id: 10, name: "Gul t-shirt", image: "images/4.png", price: "299kr", brand: "Levis", description: "En snygg gul t-shirt från Levis.", publishDate: '2024-10-27' },
  { id: 11, name: "Vit tank-top", image: "images/6.png", price: "199kr", brand: "Motörhead", description: "Cool motörhead topp.", publishDate: '2024-10-27' },
];

// API-endpoint för liknande produkter
app.get("/api/liknande-produkter", (req, res) => {
  res.json(produkter); // Använd rätt variabelnamn här
});

// Standard sidor
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/product-details.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product-details.html"));
});

// GET-rutt för att hämta produkter
app.get("/api/products", (req, res) => {
  res.json(produkter); // Använd rätt variabelnamn här
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

// PUT-rutt för att uppdatera en produkt
app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = produkter.findIndex(product => product.id === productId);

  if (index !== -1) {
    const updatedProduct = req.body;
    produkter[index] = { ...produkter[index], ...updatedProduct }; // Uppdatera produktens information
    return res.status(200).json({ message: "Produkt uppdaterad.", product: produkter[index] });
  } else {
    return res.status(404).json({ message: "Produkt hittades inte." });
  }
});

// POST-rutt för att skapa en ny produkt med bild
app.post("/admin/api/products", upload.single("image"), (req, res) => {
  const { name, description, sku, price, publishDate, categories } = req.body;
  const newProduct = {
    id: produkter.length + 1,
    name,
    description,
    sku,
    price: parseFloat(price),
    publishDate,
    categories: Array.isArray(categories) ? categories : [categories],
    image: req.file ? req.file.path : null, // Spara bilden
  };

  produkter.push(newProduct);

  // När produkten skapats, skicka tillbaka den i svaret
  res.status(201).json({ message: "Produkt skapad!", product: newProduct });
});

// GET-rutt för att hämta produkter för administration
app.get("/admin/api/products", (req, res) => {
  res.json(produkter); // Använd rätt variabelnamn här
});

// Starta servern
app.listen(port, () => {
  console.log(`Servern lyssnar på http://localhost:${port}`);
});
