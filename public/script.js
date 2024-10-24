document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const products = [
      { id: 1, name: "Svart t-shirt", image: "images/svart-tshirt-1.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis." },
      { id: 2, name: "Vit t-shirt", image: "images/1.png", price: "249kr", brand: "Levis", description: "En trendig vit t-shirt." },
      { id: 3, name: "Svart t-shirt", image: "images/svart-tshirt-3.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
      { id: 4, name: "Svart t-shirt", image: "images/svart-tshirt-4.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis." },
      { id: 5, name: "Svart t-shirt", image: "images/svart-tshirt-5.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
      { id: 6, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
      { id: 7, name: "Svart t-shirt", image: "images/svart-tshirt-7.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis." },
      { id: 8, name: "Svart t-shirt", image: "images/svart-tshirt-8.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis." },
  ];

  if (productId) {
      const product = products.find(p => p.id == productId);
      if (product) {
          document.title = product.name;
          document.querySelector(".product-sida-name").textContent = product.name;
          document.querySelector(".product-sida-brand").textContent = product.brand;
          document.querySelector(".lorem").textContent = product.description;
          document.querySelector(".pris").textContent = product.price;
          document.querySelector(".product-sida img").src = product.image;
          document.querySelector(".product-sida img").alt = product.name;
      } else {
          document.querySelector("body").innerHTML = "<h1>Produkten hittades inte!</h1>";
      }
  } else {
      console.log("Ingen produktdata visas, produkt-ID saknas.");
  }

  // Dynamiskt hämta produkter och generera HTML för produktgalleriet
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        console.log(data);
          const productGrid = document.getElementById('product-grid');
          productGrid.innerHTML = ''; // Rensa tidigare produkter

          data.forEach(product => {
              const productArticle = document.createElement('article');
              productArticle.classList.add('product');
              productArticle.innerHTML = `
                  <a href="http://localhost:3000/product-details.html?id=${product.id}">
                      <div class="badge-container">
                          <img src="${product.image}" alt="${product.name}" />
                          <span class="badge">${product.badge}</span>
                          <i class="fa-solid fa-heart"></i>
                          <div class="product-info">
                              <div class="product-name-price">
                                  <span class="product-name">${product.name}</span>
                                  <span class="product-price">${product.price}kr</span>
                              </div>
                              <div class="product-brand">${product.brand}</div>
                          </div>
                      </div>
                  </a>
              `;
              productGrid.appendChild(productArticle);
          });
      })
      .catch(error => console.error('Det gick inte att hämta produkter:', error));

  fetch('http://localhost:3000/api/liknande-produkter')
      .then(response => response.json())
      .then(data => {
          const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 6); // Tar 6 produkter för slidern
          const sliderContainer = document.querySelector('.slides');

          let slidesHTML = '';
          randomProducts.forEach(product => {
              slidesHTML += `
              <div class="slide">
                  <img src="${product.imageUrl}" alt="${product.name}" />
              </div>
              `;
          });

          sliderContainer.innerHTML = slidesHTML;
      })
      .catch(error => console.error('Det gick inte att hämta produkter:', error));
});

let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  if (index < 0) {
      currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
      currentIndex = 0;
  } else {
      currentIndex = index;
  }

  const slideWidth = slides[0].clientWidth; // Få bredden av första slide
  const slidesContainer = document.querySelector('.slides');
  slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}
