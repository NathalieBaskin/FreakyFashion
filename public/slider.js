// Funktioner för att visa slides
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

    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Hämta produkter för slider
fetch('http://localhost:3000/api/liknande-produkter')
    .then(response => response.json())
    .then(data => {
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 9);
        const sliderContainer = document.querySelector('.slides');
        let slidesHTML = '';

        for (let i = 0; i < randomProducts.length; i += 3) {
            slidesHTML += `<div class="slide">`;
            for (let j = 0; j < 3; j++) {
                if (randomProducts[i + j]) {
                    slidesHTML += `
                        <a href="index.html?id=${randomProducts[i + j].id}">
                            <img src="${randomProducts[i + j].image}" alt="${randomProducts[i + j].name}" />
                        </a>`;
                }
            }
            slidesHTML += `</div>`;
        }

        // Kolla om sliderContainer finns innan vi sätter innerHTML
        if (sliderContainer) {
            sliderContainer.innerHTML = slidesHTML;
            // Initiera slidern för att visa första slide
            showSlide(currentIndex);
        } else {
            console.error("Slider-container hittades inte.");
        }
    })
    .catch(error => console.error('Det gick inte att hämta produkter:', error));
