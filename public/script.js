document.addEventListener('DOMContentLoaded', function () {
  // Hämta produktens ID från URL:en
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  console.log("Produkt-ID från URL:", productId);

  // Din array med produkter
  const products = [
      { id: 1, name: "Svart t-shirt", image: "images/svart-tshirt-1.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis." },
      { id: 2, name: "Svart t-shirt", image: "images/svart-tshirt-2.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
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
      // Om produkt-ID är null
      console.log("Ingen produktdata visas, produkt-ID saknas.");
  }

  // Hämta slumpmässigt utvalda produkter för slidern
  const sliderContainer = document.querySelector('.slides');
  const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 6); // Slumpar produkterna (6 i stället för 8 för att passa din HTML)

  // Skapa slides för varje produkt
  let slidesHTML = '';
  randomProducts.forEach(product => {
      slidesHTML += `
      <div class="slide">
          <a href="product-details.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" />
          </a>
      </div>
      `;
  });

  // Lägg till slides i slides-container
  sliderContainer.innerHTML = slidesHTML;

  // Om du har fler än 1 slide, gör så att de blir klickbara
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
});
