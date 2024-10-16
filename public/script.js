// Hämta produkt-ID från URL:en
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log('Product ID from URL:', productId);

// Din array med produkter
const products = [
  { id: 1, name: "Svart t-shirt", image: "images/svart-tshirt-1.png", price: "199kr", description: "En snygg svart t-shirt från Levis." },
  { id: 2, name: "Svart t-shirt", image: "images/svart-tshirt-2.png", price: "249kr", description: "En trendig svart t-shirt från Levis." },
  { id: 3, name: "Svart t-shirt", image: "images/svart-tshirt-3.png", price: "299kr", description: "En cool svart t-shirt från Levis." },
  { id: 4, name: "Svart t-shirt", image: "images/svart-tshirt-4.png", price: "199kr", description: "En snygg svart t-shirt från Levis." },
  { id: 5, name: "Svart t-shirt", image: "images/svart-tshirt-5.png", price: "249kr", description: "En trendig svart t-shirt från Levis." },
  { id: 6, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", description: "En cool svart t-shirt från Levis." },
  { id: 7, name: "Svart t-shirt", image: "images/svart-tshirt-7.png", price: "249kr", description: "En trendig svart t-shirt från Levis." },
  { id: 8, name: "Svart t-shirt", image: "images/svart-tshirt-8.png", price: "299kr", description: "En cool svart t-shirt från Levis." }
];

// Om productId är null, visa inget produktdata
if (productId) {
  // Hitta rätt produkt baserat på ID
  const product = products.find(p => p.id == productId);
  console.log('Found product:', product);

  // Om produkten finns, uppdatera sidan med produktens data
  if (product) {
    document.querySelector('.product-sida-name').textContent = product.name;
    document.querySelector('.product-sida img').src = product.image;
    document.querySelector('.product-sida img').alt = product.name;
    document.querySelector('.lorem').textContent = product.description;
    document.querySelector('.pris').textContent = product.price;
  } else {
    // Om ingen produkt hittas, visa ett felmeddelande
    document.querySelector('body').innerHTML = '<h1>Produkten hittades inte!</h1>';
  }
} else {
  // Om vi är på indexsidan, gör ingenting för produktdata
  console.log("Vi är på startsidan, ingen produktdata visas.");
}
