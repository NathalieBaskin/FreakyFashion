document.addEventListener('DOMContentLoaded', function () {
  // Hämta produktens ID från URL:en
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log("Produkt-ID från URL:", productId);

  // Din array med produkter
  const products = [
    { id: 1, name: "Svart t-shirt", image: "images/svart-tshirt-1.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis." },
    { id: 2, name: "Vit t-shirt", image: "images/1.png", price: "249kr", brand: "Levis", description: "En trendig Vit-shirt." },
    { id: 3, name: "Svart t-shirt", image: "images/svart-tshirt-3.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
    { id: 4, name: "Svart t-shirt", image: "images/svart-tshirt-4.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis." },
    { id: 5, name: "Svart t-shirt", image: "images/svart-tshirt-5.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
    { id: 6, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
    { id: 7, name: "Svart t-shirt", image: "images/svart-tshirt-7.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
    { id: 8, name: "Svart t-shirt", image: "images/svart-tshirt-8.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
  ];

  // Om produkt-ID finns
  if (productId) {
    // Hitta produkten baserat på ID
    const product = products.find(p => p.id == productId);
    console.log("Hittad produkt:", product);

    // Om produkten finns, uppdatera sidan med produktens data
    if (product) {
      document.title = product.name; // Uppdatera titeln på sidan
      document.querySelector(".product-sida-name").textContent = product.name; // Uppdatera produktnamnet
      document.querySelector(".product-sida-brand").textContent = product.brand; // Uppdatera produktmärket
      document.querySelector(".lorem").textContent = product.description; // Uppdatera produktbeskrivningen
      document.querySelector(".pris").textContent = product.price; // Uppdatera priset
      document.querySelector(".product-sida img").src = product.image; // Uppdatera produktbilden
      document.querySelector(".product-sida img").alt = product.name; // Uppdatera alt-texten för bilden
    } else {
      // Om ingen produkt hittas, visa ett felmeddelande
      document.querySelector("body").innerHTML = "<h1>Produkten hittades inte!</h1>";
    }
  } else {
    console.log("Ingen produktdata visas, produkt-ID saknas.");
  }

  // Hämta slumpmässigt utvalda produkter för slidern
  const sliderContainer = document.querySelector('.slides');
  
  // Skapa slidern från backend
  fetch('http://localhost:3001/api/liknande-produkter') // Justera URL:en efter din backend
    .then(response => response.json())
    .then(data => {
      // Använd data från backend
      const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 8); // Slumpar och tar 8 produkter
      
      let slidesHTML = '';
      randomProducts.forEach((product, index) => {
        slidesHTML += `
        <div class="slide">
            <a href="product-details.html?id=${product.id}">
                <img src="${product.imageUrl}" alt="${product.name}" />
            </a>
        </div>
        `;
      });

      // Lägg till slides i slides-container
      sliderContainer.innerHTML = slidesHTML;

      // Skapa radio-knappar för navigering om det finns fler än en slide
      if (randomProducts.length > 1) {
        randomProducts.forEach((_, i) => {
          const slideInput = document.createElement('input');
          slideInput.type = 'radio';
          slideInput.name = 'slider';
          slideInput.id = `slide${i + 1}`;
          if (i === 0) slideInput.checked = true; // Sätter första slide som vald
          sliderContainer.appendChild(slideInput);
        });
      }
    })
    .catch(error => console.error('Det gick inte att hämta produkter:', error));
});
const express = require('express');
const app = express();
const port = 3001;

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

app.get('/api/liknande-produkter', (req, res) => {
  res.json(liknandeProdukter);
});

app.listen(port, () => {
  console.log(`Servern lyssnar på http://localhost:${port}`);
});
