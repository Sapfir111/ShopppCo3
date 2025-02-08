import { adjustMessageWidth } from "../shared/message-width.js";
import { products, saveToStorage } from "../data/products.js";
import { detailsCart } from "../product-details/product-details.js";
import { homepageSlider } from "./slider.js";
import { updateCartQuantity } from "../cart/cart.js";
import { adjustDescriptionWidth } from "./description-width.js";

adjustMessageWidth();
adjustDescriptionWidth();
homepageSlider();
updateCartQuantity();

const openingAdImgOne = document.querySelector('.js-opening-ad-image');
const windowWidthDOM = 525;

function updateAdImage() {
    if (window.innerWidth <= windowWidthDOM) {
        openingAdImgOne.src = 'images/ad/mobile-1.svg';
    } else {
        openingAdImgOne.src = 'images/ad/1.svg';
    }
}

updateAdImage();

window.addEventListener('resize', updateAdImage);

const viewAllButton = document.querySelectorAll('.js-view-all-button');
const catalogListHidden = document.querySelectorAll('.js-catalog-hidden');

catalogListHidden.forEach((list) => {
    const listId = list.dataset.listId;

    viewAllButton.forEach((button) => {
        button.addEventListener('click', () => {
            const buttonId = button.dataset.buttonId;

            if (buttonId === listId) {
                list.classList.toggle('catalog-hidden');

                button.classList.toggle('is-clicked');

                if (button.classList.contains('is-clicked')) {
                    button.innerText = 'Show less';
                } else {
                    button.innerText = 'View all';
                }
            }
        });
    });
});

const catalogLists = document.querySelectorAll('.js-catalog-list');

catalogLists.forEach((list) => {
    const listGenId = list.dataset.listGenId;

    let listHTML = '';

    products.forEach((product) => {
        if (product.generationId === listGenId) {
            listHTML += `  
                <a href="product-detail.html">
                    <li class="catalog__item js-product" data-item-gen-id="${product.generationId}" data-product-id="${product.id}">
                        <img class="catalog__product-image" src="${product.image}" alt="${product.name}">
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

    list.innerHTML = listHTML;
});

const product = document.querySelectorAll('.js-product');


product.forEach((product) => {
    product.addEventListener('click', () => {
        const productId = product.dataset.productId;

        detailsCart.length = 0;

        detailsCart.push({productId});

        saveToStorage('product', detailsCart);
    })
});