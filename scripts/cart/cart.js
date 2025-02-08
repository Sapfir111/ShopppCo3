import { adjustMessageWidth } from "../shared/message-width.js";
import { loadFromStorage, saveToStorage, products } from "../data/products.js";
import { detailsCart, attachQuantityDisplay } from "../product-details/product-details.js";
import { quantity } from "../shared/quantity-buttons.js";
import { renderOrderSummary, detectDiscount } from "./order-summary.js";

adjustMessageWidth();

export let cart = [];

loadFromStorage('cart', cart);

export function addToCart() {
    products.forEach((ApiItem) => {
        detailsCart.forEach((product) => {
            const productId = product.productId;
            // добав функцію створення нового айдішника
            // для товарів типу коли вибрав якийсь
            // колір і розмір, додав у корзину
            // потім вибрав той же ж самий товар
            // але вже з іншим параметром і в нього буде
            // інакший id, для того, щоб можна було
            // нормально видаляти, бо зараз все додається
            // правильно але видаляється не добре

            if (product.color === undefined) {
                document.querySelector('.js-choose-color-message').
                    classList.remove('overview__choose-message-color-display-none');
                return;
            } else if (product.size === undefined) {
                document.querySelector('.js-choose-size-message').
                    classList.remove('overview__choose-message-size-display-none');
                return;
            }

            if (ApiItem.id === productId) {
                let matchingItem;

                cart.forEach((cartItem) => {
                    if (cartItem.productId === productId && cartItem.size === product.size && cartItem.color === product.color) {
                        matchingItem = cartItem;
                    }
                });

                if (matchingItem) {
                    matchingItem.quantity += quantity;
                } else {
                    cart.push({
                        ...product,
                        discount: ApiItem.discount,
                        quantity
                    });
                }
            }

            // let matchingItem;
            //
            // cart.forEach((cartItem) => {
            //     if (cartItem.productId === productId) {
            //         matchingItem = cartItem;
            //     }
            // });
            //
            // if (matchingItem) {
            //     matchingItem.quantity += quantity;
            // } else {
            //     cart.push({
            //         ...product,
            //         quantity,
            //     });
            // }
            //
            // console.log(product);
        });

        saveToStorage('cart', cart);
        updateCartQuantity();
    });
}

function removeFromCart(productId) {
    // cart = cart.filter(cartItem => cartItem.productId !== productId);

    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }

        cart = newCart;

        saveToStorage('cart', cart);
    });

    updateCartQuantity();
    renderOrderSummary();
}

export function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        if (typeof cartItem.quantity === 'undefined' || isNaN(cartItem.quantity)) {
            cartItem.quantity = 0;
        }
        cartQuantity += Number(cartItem.quantity);
    });

    const cartQuantityText = document.querySelector('.js-cart-quantity');

    if (cartQuantityText) {
        cartQuantityText.innerText = cartQuantity;
    }
}

function renderCart() {

    if (cart.length > 0) {
        let cartHTML = '';

        products.forEach((product) => {
            const productId = product.id;

            cart.forEach((cartItem) => {
                const cartItemId = cartItem.productId;

                if (cartItemId === productId) {
                    const mergedItem = {
                        ...product,
                        size: cartItem.size,
                        color: cartItem.color,
                        discount: cartItem.discount
                    }

                    cartHTML += `
                        <li class="products__item js-item-container" data-item-container-id="${cartItemId}">
                            <div class="products__info-wrapper">
                                <div class="products__column-one">
                                    <img class="products__image" src="${mergedItem.image}" alt="">
                                    <div class="products__description">
                                        <div>
                                            <p class="products__name">${mergedItem.name}</p>
                                            <p class="products__additional-info">Size: ${mergedItem.size !== undefined ? `<span>${mergedItem.size}</span>` : ''}</p>
                                            <p class="products__additional-info">Color: ${mergedItem.color !== undefined ? `<span>${mergedItem.color}</span>` : ''}</p>
                                        </div>
                                        <p class="products__price">$${mergedItem.price / 100}</p>
                                    </div>
                                </div>
                                <div class="products__column-two">
                                    <button class="products__delete-button js-delete-button" data-delete-button-id="${cartItemId}">
                                        <img src="images/icons/delete.svg" alt="delete">
                                    </button>
                                    <p class="products__additional-info">Quantity: ${cartItem.quantity !== undefined ? `<span>${cartItem.quantity}</span>` : ''}</p>
                                    ${cartItem.discount !== undefined ? 
                                        `<p class="products__additional-info">Discount: <span>${cartItem.discount}%</span></p>` 
                                    : ''}
                                    <!--
                                    <div class="products__quantity-button-wrapper">
                                        <button class="decrease-quantity-button">
                                            <img src="images/icons/minus.svg" alt="">
                                        </button>
                                        <p class="quantity">${quantity}</p>
                                        <button class="increase-quantity-button">
                                            <img src="images/icons/plus.svg" alt="">
                                        </button>
                                    </div>
                                    -->
                                </div>
                            </div>
                        </li>
                    `;
                }
            });
        });

        const container = document.querySelector('.js-products-list');

        if (container) {
            container.innerHTML = cartHTML;
            attachQuantityDisplay();
        } else {
            console.error('Container is not found');
        }

    } else {
        const container = document.querySelector('.js-products-list');

        if (container) {
            container.innerHTML = `<h1>Cart is empty</h1>`;
        } else {
            console.error('Container is not found');
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelectorAll('.js-delete-button');
    const itemContainer = document.querySelectorAll('.js-item-container');

    if (deleteButton) {
        itemContainer.forEach((item) => {
            const containerId = item.dataset.itemContainerId;

            deleteButton.forEach((deleteButton) => {
                deleteButton.addEventListener('click', () => {
                    const buttonId = deleteButton.dataset.deleteButtonId;

                    if (containerId === buttonId) {
                        removeFromCart(buttonId);
                        item.remove();
                    }
                });
            });
        });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    updateCartQuantity();
    renderOrderSummary();
    detectDiscount();
});

renderCart();