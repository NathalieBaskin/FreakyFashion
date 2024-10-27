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
    ];

    // Log the retrieved parameters for debugging
    console.log("Product ID:", productId);
    console.log("Search Term:", searchTerm);

    // Display product details based on product ID
    if (productId) {
        const product = products.find(p => p.id == productId);
        if (product) {
            console.log("Product found:", product);
            document.title = product.name;
            document.querySelector(".product-sida-name").textContent = product.name;
            document.querySelector(".product-sida-brand").textContent = product.brand;
            document.querySelector(".lorem").textContent = product.description;
            document.querySelector(".pris").textContent = product.price;
            document.querySelector(".product-sida img").src = product.image;
            document.querySelector(".product-sida img").alt = product.name;
        } else {
            console.error("Product not found for ID:", productId);
            document.querySelector("body").innerHTML = "<h1>Produkten hittades inte!</h1>";
        }
    } else if (searchTerm) {
        console.log("Searching for products with term:", searchTerm);
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) {
            console.error("Produktgridden kunde inte hittas.");
            return;
        }

        productGrid.innerHTML = ''; // Clear previous results

        // Create and display result info
        const resultInfo = document.createElement('p');
        resultInfo.classList.add('result-info');
        resultInfo.textContent = `Hittade ${filteredProducts.length} produkter`;
        productGrid.parentNode.insertBefore(resultInfo, productGrid);

        // Generate product HTML if products found
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productElement = document.createElement('article');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                    <div class="heart-wrapper">
                        <a href="#">
                            <i class="fa-solid fa-heart"></i>
                        </a>
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
            console.log("No products found for search term:", searchTerm);
            productGrid.innerHTML = '<p>Inga produkter hittades.</p>';
        }
    } else {
        console.log("Ingen produktdata visas, produkt-ID och sökterm saknas.");
    }

    // Search when Enter key is pressed
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                const searchTerm = searchInput.value.trim();
                console.log("Search initiated for term:", searchTerm);
                window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
});