document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { id: 1, name: "Svart tshirt", image: "images/svart-tshirt-1.png", price: "199kr", description: "En snygg svart t-shirt från Levis." },
        { id: 2, name: "Svart tshirt", image: "images/svart-tshirt-2.png", price: "249kr", description: "En trendig svart t-shirt från Levis." },
        { id: 3, name: "Svart tshirt", image: "images/svart-tshirt-3.png", price: "299kr", description: "En cool svart t-shirt från Levis." },
        { id: 4, name: "Svart tshirt", image: "images/svart-tshirt-4.png", price: "199kr", description: "En snygg svart t-shirt från Levis." },
        { id: 5, name: "Svart tshirt", image: "images/svart-tshirt-5.png", price: "249kr", description: "En trendig svart t-shirt från Levis." },
        { id: 6, name: "Svart tshirt", image: "images/svart-tshirt-6.png", price: "299kr", description: "En cool svart t-shirt från Levis." },
        { id: 7, name: "Svart tshirt", image: "images/svart-tshirt-7.png", price: "249kr", description: "En trendig svart t-shirt från Levis." },
        { id: 8, name: "Svart tshirt", image: "images/svart-tshirt-8.png", price: "299kr", description: "En cool svart t-shirt från Levis." }
    ];

    // Hämta söktermen från URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');

    // Logga söktermen
    console.log("Sökterm:", searchTerm);

    if (!searchTerm) {
        console.log("Ingen sökterm hittades i URL:en.");
        return;
    }

    // Filtrera produkterna baserat på söktermen
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Logga filtrerade produkter
    console.log("Filtrerade produkter:", filteredProducts);

    // Hämta produktgridden och rensa tidigare resultat
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Rensa tidigare resultat

    // Lägg till meddelandet om antalet produkter över produktgridden
    const resultInfo = document.createElement('p');
    resultInfo.classList.add('result-info');
    resultInfo.textContent = `Hittade ${filteredProducts.length} produkter`;
    productGrid.parentNode.insertBefore(resultInfo, productGrid); // Lägg till meddelandet före productGrid

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productElement = document.createElement('article');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <a href="product-details.html?id=${product.id}">
                    <div class="badge-container">
                        <img src="${product.image}" alt="${product.name}">
                        <i class="fa-solid fa-heart"></i>
                        <div class="product-info">
                            <div class="product-name-price">
                                <span class="product-name">${product.name}</span>
                                <span class="product-price">${product.price}</span>
                            </div>
                            <div class="product-brand">Levis</div>
                        </div>
                    </div>
                </a>
            `;
            productGrid.appendChild(productElement);
        });
    } else {
        productGrid.innerHTML = '<p>Inga produkter hittades.</p>';
    }
});