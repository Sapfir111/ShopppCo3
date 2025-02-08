import { adjustMessageWidth } from "../shared/message-width.js";
import { products, loadFromStorage, saveToStorage } from "../data/products.js";
// import { adjustImageWrapperWidth } from "./image-wrapper-width.js";
import { increaseQuantity, decreaseQuantity, quantity } from "../shared/quantity-buttons.js";
import { addToCart, updateCartQuantity } from "../cart/cart.js";

adjustMessageWidth();
// adjustImageWrapperWidth();

export const detailsCart = [];

loadFromStorage('product', detailsCart);

export function renderDetails() {

    if (detailsCart.length > 0) {

        let productDetailsHTML = '';

        detailsCart.forEach((detailsProduct) => {
            let matchingProduct;
            let detailsProductId = detailsProduct.productId;

            products.forEach((product) => {
                if (product.id === detailsProductId) {
                    matchingProduct = product;

                    productDetailsHTML += `
                        <div class="overview__body container mobile-container">
                            <div class="overview__images-wrapper js-images-wrapper">
                                <div class="overview__images-wrapper-column-two">
                                    <div>
                                        <img src="${matchingProduct.image}" alt="product image">
                                    </div>
                                </div>
                            </div>
                            <div class="overview__description js-description">
                                <div class="overview__title">
                                    <h1>${matchingProduct.name}</h1>
                                </div>
                                <div class="overview__rating-wrapper">
                                    <img src="${matchingProduct.rating.starsImage}" alt="">
                                    <p>${matchingProduct.rating.starsQuantity}/<span>5</span></p>
                                </div>
                                <div class="overview__price-wrapper">
                                    <p class="overview__price">$${matchingProduct.price / 100}</p>
                                    ${
                                        matchingProduct.previousPrice > 0 ? `<p class="overview__previous-price">$${matchingProduct.previousPrice / 100}</p>` : ''
                                    }
                                    ${
                                        matchingProduct.previousPrice > 0 ? `<p class="overview__discount">-${matchingProduct.discount}%</p>` : ''
                                    }
                                </div>
                                <div class="overview__slogan">
                                    <p>${matchingProduct.description}</p>
                                </div>
                                <div class="overview__color-wrapper">
                                    <p>Select colors</p>
                                    <ul class="overview__color-list js-color-list">
                                        <li class="js-product-color overview__color-item overview__color-item-dark-olive"
                                        data-product-color-id="dark olive">
                                            <img 
                                            class="js-color-tick overview__color-picked overview__color-tick" 
                                            src="images/icons/pick-color-tick.svg" 
                                            alt=""
                                            data-product-color-tick-id="dark olive"
                                            >
                                        </li>
                                        <li class="js-product-color overview__color-item overview__color-item-deep-green"
                                        data-product-color-id="deep green">
                                            <img 
                                            class="js-color-tick overview__color-picked overview__color-tick" 
                                            src="images/icons/pick-color-tick.svg" 
                                            alt=""
                                            data-product-color-tick-id="deep green"
                                            >
                                        </li>
                                        <li class="js-product-color overview__color-item overview__color-item-deep-blue"
                                        data-product-color-id="deep blue">
                                            <img 
                                            class="js-color-tick overview__color-picked overview__color-tick" 
                                            src="images/icons/pick-color-tick.svg" 
                                            alt=""
                                            data-product-color-tick-id="deep blue"
                                            >
                                        </li>
                                        <p class="overview__choose-message js-choose-color-message overview__choose-message-color-display-none">The choice of color is not optional</p>
                                    </ul>
                                </div>
                                <div class="overview__size-wrapper">
                                    <p>Choose Size</p>
                                    <ul class="overview__size-list">
                                        <li class="js-size-item overview__size-item" data-product-size-id="small">
                                            <p>Small</p>
                                        </li>
                                        <li class="js-size-item overview__size-item" data-product-size-id="medium">
                                            <p>Medium</p>
                                        </li>
                                        <li class="js-size-item overview__size-item" data-product-size-id="large">
                                            <p>Large</p>
                                        </li>
                                        <li class="js-size-item overview__size-item" data-product-size-id="x-large">
                                            <p>X-Large</p>
                                        </li>
                                        <p class="overview__choose-message js-choose-size-message overview__choose-message-size-display-none">The choice of size is not optional</p>
                                    </ul>
                                </div>
                                <div class="overview__buttons-wrapper">
                                    <div class="overview__quantity-button-wrapper">
                                        <button class="decrease-quantity-button">
                                            <img src="images/icons/minus.svg" alt="">
                                        </button>
                                        <p class="quantity">${quantity}</p>
                                        <button class="increase-quantity-button">
                                            <img src="images/icons/plus.svg" alt="">
                                        </button>
                                    </div>
                                    <button class="js-add-to-cart-button overview__add-to-cart-button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
        });

        const container = document.querySelector('.js-overview');

        if (container) {
            container.innerHTML = productDetailsHTML;
            attachQuantityDisplay();
            handleProductColor();
            handleProductSize();
        } else {
            console.error('Container is not found.')
        }

    } else {
        console.error('Product details cart is empty.')
    }
}

function renderRecommendations() {
    let alsoLikeHTML = '';

    products.forEach((product) => {
        if (product.generationId === '3') {
            alsoLikeHTML += `
                <a href="product-detail.html">
                    <li class="catalog__item js-product" data-product-id="${product.id}">
                        <img class="catalog__product-image" src="${product.image}" alt="product">
                        <div class="catalog__product-description">
                            <p class="catalog__product-name">${product.name}</p>
                            <div class="catalog__product-rating-wrapper">
                                <img src="${product.rating.starsImage}" alt="rating">
                                <p>${product.rating.starsQuantity}/<span>5</span></p>
                            </div>
                            <div class="catalog__product-price-wrapper">
                                <p class="catalog__product-price">$${product.price / 100}</p>
                                ${
                                    product.discount > 0 ? `<p class="catalog__product-previous-price">$${product.previousPrice / 100}</p>` : ''
                                }
                                                ${
                                    product.discount > 0 ? `<p class="catalog__product-discount js-discount">-${product.discount}%</p>` : ''
                                }
                            </div>
                        </div>
                    </li>
                </a>
            `;
        }
    });

    const container = document.querySelector('.js-catalog-list');

    if (container) {
        container.innerHTML = alsoLikeHTML;
    } else {
        console.error('Container is not found.')
    }

    const product = document.querySelectorAll('.js-product');

    product.forEach((product) => {
        product.addEventListener('click', () => {
            const productId = product.dataset.productId;

            detailsCart.length = 0;

            detailsCart.push(
                {productId}
            );

            saveToStorage('product', detailsCart);
        })
    });
}

renderRecommendations();

export function attachQuantityDisplay() {
    const decreaseButton = document.querySelector('.decrease-quantity-button');
    const increaseButton = document.querySelector('.increase-quantity-button');
    const quantityDisplay = document.querySelector('.quantity');

    if (decreaseButton && increaseButton && quantityDisplay) {
        decreaseButton.addEventListener('click', () => decreaseQuantity(quantityDisplay),);
        increaseButton.addEventListener('click', () => increaseQuantity(quantityDisplay));
    } else {
        console.error('Quantity buttons or display not found.');
    }
}

function handleProductColor() {
    const colorTick = document.querySelectorAll('.js-color-tick');
    const productColor = document.querySelectorAll('.js-product-color');

    productColor
        .forEach((color) => {
            const colorId = color.dataset.productColorId;

            color.addEventListener('click', () => {
                colorTick.forEach((tick) => {
                    tick.classList.add('overview__color-picked');
                });

                const tick = Array.from(colorTick).find(tick => tick.dataset.productColorTickId === colorId);
                if (tick) {
                    tick.classList.remove('overview__color-picked');
                }

                detailsCart.forEach((product) => {
                    product.color = colorId;
                });

                saveToStorage('product', detailsCart);
            });
        });
}

function handleProductSize() {
    const productSize = document.querySelectorAll('.js-size-item');

    productSize.forEach((size) => {
        const sizeId = size.dataset.productSizeId;

        size.addEventListener('click', () => {

            productSize.forEach((size) => {
                size.classList.remove('overview__size-picked');
            });

            size.classList.add('overview__size-picked');

            detailsCart.forEach((product) => {
                product.size = sizeId;
            });

            saveToStorage('product', detailsCart);
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.js-add-to-cart-button');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }
    updateCartQuantity();
});

window.addEventListener('DOMContentLoaded', () => {
    updateCartQuantity();
});

renderDetails();