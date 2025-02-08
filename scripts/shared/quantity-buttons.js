import { detailsCart } from "../product-details/product-details.js";
import { saveToStorage } from "../data/products.js";

export let quantity = 1;

export function increaseQuantity(quantityDisplay) {
    if (quantity < 100) {

        detailsCart.forEach((product) => {
            if (typeof product.quantity === 'undefined' || isNaN(Number(product.quantity))) {
                product.quantity = 1;
            }
        });

        quantity++;

        detailsCart.forEach((product) => {
            product.quantity = Number(quantity);
            saveToStorage('product', detailsCart);
        });
    }

    updateQuantityDisplay(quantityDisplay);
}

export function decreaseQuantity(quantityDisplay) {
    if (quantity > 1) {

        detailsCart.forEach((product) => {
            if (typeof product.quantity === 'undefined' || isNaN(Number(product.quantity))) {
                product.quantity = 1;
            }
        });

        quantity--;

        detailsCart.forEach((product) => {
            product.quantity = Number(quantity);
            saveToStorage('product', detailsCart);
        });
    }

    updateQuantityDisplay(quantityDisplay);
}

function updateQuantityDisplay(quantityDisplay) {
    if (quantityDisplay) {
        quantityDisplay.innerHTML = quantity;
    } else {
        console.error('Quantity display not found.');
    }
}