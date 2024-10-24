document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Statisk produktlista för att testa visningen
    const products = [
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

    // Visa produktdetaljer baserat på produkt-ID
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

    // Hämta produkter och generera HTML för produktgalleriet
    fetch('http://localhost:3000/api/liknande-produkter')
    .then(response => response.json())
    .then(data => {
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 12); 
        const sliderContainer = document.querySelector('.slides');

        let slidesHTML = '';
        // Skapa slides i grupper om 3
        for (let i = 0; i < randomProducts.length; i += 3) {
            slidesHTML += `<div class="slide">`; // Ny slide
            for (let j = 0; j < 3; j++) {
                if (randomProducts[i + j]) { // Kontrollera att produkten finns
                    slidesHTML += `
                    <img src="${randomProducts[i + j].image}" alt="${randomProducts[i + j].name}" />
                    `;
                }
            }
            slidesHTML += `</div>`; // Avsluta slide
        }

        sliderContainer.innerHTML = slidesHTML;

        // Initiera slidern för att visa första slide
        showSlide(currentIndex);
    })
    .catch(error => console.error('Det gick inte att hämta produkter:', error));
});

// Funktioner för att visa slides
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (index < 0) {
        currentIndex = totalSlides - 3;
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
