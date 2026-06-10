const productsEle = document.querySelector(".product-list");
const sidebarContents = document.querySelector(".sidebar-content");

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return data;
}

async function main() {
    const products = await getProducts();

    renderCategories(products);
    renderProducts(products);
    handleFilterProducts(products);
    addToCart(products);
}

function addToCart() {
    const cart = [];

    productsEle.addEventListener("click", (e) => {
        const btnAddToCart = e.target.closest(".btn-cart");
        const product = e.target.closest(".product-item");

        if (!btnAddToCart || !product) return;

        const productId = Number(product.dataset.id);
        const data = cart.find((c) => c.id === productId);

        if (data) {
            data.quantity++;
        } else {
            cart.push({
                id: productId,
                quantity: 1,
            });
        }

        const totalQuantity = cart.reduce(
            (total, item) => total + item.quantity,
            0,
        );

        const cartQuantityEle = document.querySelector(".cart-quantity");
        cartQuantityEle.textContent = totalQuantity;

        console.log(cart);
    });
}

function handleFilterProducts(products) {
    const quantityProduct = document.querySelector(".quantity-products");
    quantityProduct.textContent = products.length;

    sidebarContents.addEventListener("click", (e) => {
        const categoryItem = e.target.closest(".categorie-item");
        if (!categoryItem) return;

        document
            .querySelectorAll(".categorie-item")
            .forEach((category) => category.classList.remove("active"));

        categoryItem.classList.add("active");

        const productsFilter = products.filter(
            (product) => product.category === categoryItem.dataset.category,
        );

        if (productsFilter.length > 0) {
            renderProducts(productsFilter);
            quantityProduct.textContent = productsFilter.length;
        } else {
            renderProducts(products);
            quantityProduct.textContent = products.length;
        }
    });
}

function renderCategories(products) {
    const quantityCategories = {};

    products.forEach((product, index) => {
        quantityCategories[product.category]
            ? (quantityCategories[product.category] += 1)
            : (quantityCategories[product.category] = 1);
    });

    for (let key of Object.keys(quantityCategories)) {
        const category = document.createElement("div");
        category.className = "categorie-item";
        category.setAttribute("data-category", key);
        category.innerHTML = `${key} <span class="quantityCategory">${quantityCategories[key]}</span>`;
        sidebarContents.appendChild(category);
    }
}

function renderProducts(products) {
    const html = products
        .map(
            (product) => `
    <div class="product-item" data-id="${product.id}">
        <div class="product-item-img">
            <img
                src="${product.image}"
                alt=""
            />
        </div>
        <p class="product-item-title">
            ${product.title}
        </p>
        <p class="product-item-star">
            <i class="fa-solid fa-star"></i>
            ${product.rating.rate}
            <span class="quantity-star">(${product.rating.count})</span>
        </p>
        <div class="product-item-footer">
            <p class="product-item-price">
                $${product.price}
            </p>
            <button
                title="Thêm vào giỏ hàng"
                class="btn-cart"
            >
                <i class="bi bi-cart2"></i>
            </button>
        </div>
    </div>
    `,
        )
        .join("");

    productsEle.innerHTML = html;
}

main();