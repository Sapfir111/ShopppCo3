import { cart } from "./cart.js";
import { products } from "../data/products.js";

export function detectDiscount() {
    let discount = 0;
    cart.forEach((cartItem) => {
        // перевірка на товар, який вже має знижку
        // якщо таких товар є, то плюсюється нуль або ще щось
        if (cartItem.discount) {
            discount += cartItem.discount;
        }
    });

    return discount;
}

export function renderOrderSummary() {
    let orderSummaryHTML = '';
    let subtotal = 0;
    const deliveryFee = 15;
    let discount = detectDiscount();
    let calculateDiscount = 0;
    let total = 0;

    products.forEach((product) => {
        cart.forEach((cartItem) => {
            if (cartItem.productId === product.id) {
                subtotal += (product.price / 100) * cartItem.quantity;
                calculateDiscount = (subtotal * discount) / 100;
                total += subtotal + deliveryFee - calculateDiscount;
            }
        });
    });

    orderSummaryHTML += `
        <div class="order-summary__title">
            <p>Order Summary</p>
        </div>
        <div class="order-summary__calculations-wrapper">
            <div class="order-summary__calculation">
                <p class="order-summary__calculation-name">Subtotal</p>
                <p class="order-summary__calculation-number">$${(subtotal).toFixed()}</p>
            </div>
            <div class="order-summary__calculation">
                <p class="order-summary__calculation-name">Discount</p>
                <p class="order-summary__calculation-discount">-$${(calculateDiscount).toFixed(0)}</p>
            </div>
            <div class="order-summary__calculation">
                <p class="order-summary__calculation-name">Delivery Fee</p>
                <p class="order-summary__calculation-number">$${cart.length === 0 ? 0 : deliveryFee}</p>
            </div>
        </div>
        <div class="order-summary__total-wrapper">
            <p class="order-summary__total-name">Total</p>
            <p class="order-summary__total-number">$${(total).toFixed(0)}</p>
        </div>
    `;

    const container = document.querySelector('.js-order-summary');

    if (container) {
        container.innerHTML = orderSummaryHTML;
    } else {
        console.error('Container not found');
    }
}