document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const searchTerm = urlParams.get('q');

    const products = [
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
        { id: 12, name: "Vit t-shirt", image: "images/7.png", price: "399kr", brand: "Levis", description: "Cool t-shirt med tryck.", publishDate: '2024-10-27' },
    ];

    const today = new Date();
    const productGrid = document.querySelector('.product-grid');

    // Lägg till badge på existerande produkter
    if (productGrid) {
        const productElements = productGrid.querySelectorAll('.product');
        
        productElements.forEach((productElement, index) => {
            const product = products[index]; // Anta att indexen matchar produkterna

            // Beräkna om produkten är ny
            const publishDate = new Date(product.publishDate);
            const daysSincePublished = (today - publishDate) / (1000 * 60 * 60 * 24);
            const isNew = daysSincePublished <= 7;

            // Om produkten är ny, lägg till badgen
            if (isNew) {
                const badge = document.createElement('div');
                badge.classList.add('badge');
                badge.textContent = 'Nyhet!';
                productElement.querySelector('a').appendChild(badge);
            }
        });
    }

    // Hantera produktdetaljer baserat på produkt-ID
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
            console.error("Produkt inte hittad för ID:", productId);
            document.querySelector("body").innerHTML = "<h1>Produkten hittades inte!</h1>";
        }
    } else if (searchTerm) {
        console.log("Söker efter produkter med termen:", searchTerm);
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        // Generera och visa resultat
        const resultInfo = document.createElement('p');
        resultInfo.classList.add('result-info');
        resultInfo.textContent = `Hittade ${filteredProducts.length} produkter`;
        productGrid.parentNode.insertBefore(resultInfo, productGrid);
    
        // Skapa produkt HTML om produkter hittas
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productElement = document.createElement('article');
                productElement.classList.add('product');
    
                // Beräkna om produkten är ny
                const publishDate = new Date(product.publishDate);
                const today = new Date();
                const daysSincePublished = (today - publishDate) / (1000 * 60 * 60 * 24);
                const isNew = daysSincePublished <= 7;
    
                // Lägg till produktens HTML
                productElement.innerHTML = `
                    <a href="product-details.html?id=${product.id}">
                        <div class="image-wrapper">
                            <img src="${product.image}" alt="${product.name}" />
                            ${isNew ? '<div class="badge">Nyhet!</div>' : ''}
                        </div>
                    </a>
                    <div class="heart-wrapper">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="product-info">
                        <div class="product-name-price">
                            <span class="product-name">${product.name}</span>
                            <span class="product-price">${product.price}</span>
                        </div>
                        <div class="product-brand">${product.brand}</div>
                    </div>
                `;
                productGrid.appendChild(productElement);
            });
        } else {
            console.log("Inga produkter hittades.");
            productGrid.innerHTML = '<p>Inga produkter hittades.</p>';
        }
    }
    

    // Sök när Enter-tangenten trycks
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                const searchTerm = searchInput.value.trim();
                window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
});
