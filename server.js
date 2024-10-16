const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

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

// Starta servern
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
