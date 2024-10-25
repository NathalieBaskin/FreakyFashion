document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Statisk produktlista för att testa visningen
    const products = [
        { id: 1, name: "Svart t-shirt", image: "images/svart-tshirt-1.png", price: "199kr", brand: "Levis", description: "En snygg svart t-shirt från Levis.", addedDate: '2024-10-20' },
        { id: 2, name: "Vit t-shirt", image: "images/1.png", price: "299kr", brand: "Aquas", description: "En trendig vit t-shirt.", addedDate: '2024-10-15' },
        { id: 3, name: "Röd t-shirt", image: "images/2.png", price: "599kr", brand: "Trasher", description: "En cool Röd t-shirt från Trasher.", addedDate: '2024-10-22' },
        { id: 4, name: "Vit t-shirt", image: "images/3.png", price: "399kr", brand: "Adias", description: "En snygg Vit t-shirt från Adidas.", addedDate: '2024-10-18' },
        { id: 5, name: "Svart t-shirt", image: "images/svart-tshirt-5.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis.", addedDate: '2024-10-05' },
        { id: 6, name: "Svart t-shirt", image: "images/svart-tshirt-6.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis.", addedDate: '2024-10-10' },
        { id: 7, name: "Svart t-shirt", image: "images/svart-tshirt-7.png", price: "249kr", brand: "Levis", description: "En trendig svart t-shirt från Levis.", addedDate: '2024-10-01' },
        { id: 8, name: "Svart t-shirt", image: "images/svart-tshirt-8.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis.", addedDate: '2024-10-20' },
        { id: 9, name: "Svart t-shirt", image: "images/svart-tshirt-9.png", price: "299kr", brand: "Levis", description: "En cool svart t-shirt från Levis.", addedDate: '2024-10-12' },
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
            const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 9);
            const sliderContainer = document.querySelector('.slides');
            let slidesHTML = '';

            for (let i = 0; i < randomProducts.length; i += 3) {
                slidesHTML += `<div class="slide">`; // Ny slide
                for (let j = 0; j < 3; j++) {
                    if (randomProducts[i + j]) { // Kontrollera att produkten finns
                        // Kontrollera om produkten är ny (tillagd idag eller inom de senaste 7 dagarna)
                        const addedDate = new Date(randomProducts[i + j].addedDate);
                        const today = new Date();
                        const timeDiff = today.getTime() - addedDate.getTime();
                        const daysSinceAdded = Math.floor(timeDiff / (1000 * 3600 * 24));

                        slidesHTML += `
                            <div class="product-item">
                                <a href="product-details.html?id=${randomProducts[i + j].id}">
                                    <img src="${randomProducts[i + j].image}" alt="${randomProducts[i + j].name}" />
                                    ${daysSinceAdded <= 7 ? '<div class="badge">Nyhet!</div>' : ''}
                                </a>
                            </div>`;
                    }
                }
                slidesHTML += `</div>`; // Avsluta slide
            }
            console.log(slidesHTML); // Kontrollera HTML-utdata
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
    const totalSlides = slides.length; // Hämta totalt antal slides

    console.log(`Total slides: ${totalSlides}`); // Logga totala slides
    console.log(`Current index: ${index}`); // Logga nuvarande index

    // Hantera cykling av index
    if (index < 0) {
        currentIndex = totalSlides - 1; // Gå till sista slide
    } else if (index >= totalSlides) {
        currentIndex = 0; // Gå till första slide
    } else {
        currentIndex = index; // Sätt aktuellt index
    }

    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`; // Flytta till aktuell slide
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}
