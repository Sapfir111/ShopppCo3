// productColor
//     .forEach((color) => {
//         const colorId = color.dataset.productColorId;
//
//         colorTick.forEach((tick) => {
//             const tickId = tick.dataset.productColorTickId;
//
//             if (colorId === tickId) {
//                 color.addEventListener('click', () => {
//
//                     tick.classList.toggle('overview__color-picked');
//
//                     detailsCart.forEach((product) => {
//                         product.color = colorId;
//
//                         saveToStorage('product', detailsCart);
//                     });
//                 });
//             }
//         });
//     });