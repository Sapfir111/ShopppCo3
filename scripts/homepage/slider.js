const sliderList = document.querySelector('.js-slides-list');
const arrowButtons = document.querySelectorAll('.js-slide-button');
const cardWidth = document.querySelector('.js-slide').offsetWidth;

export function homepageSlider() {

    arrowButtons.forEach((button) => {
        button.addEventListener('click', () => {
            sliderList.scrollLeft += button.id === 'previous' ? -cardWidth : cardWidth;
        });
    });

    let isDragging = false, startX, startScrollLeft;

    const dragStart = (e) => {
        isDragging = true;
        sliderList.classList.add('is-dragging');
        startX = e.pageX;
        startScrollLeft = sliderList.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        sliderList.scrollLeft = startScrollLeft - (e.pageX);
    };

    const dragStop = () => {
        isDragging = false;
        sliderList.classList.remove('is-dragging');
    }

    sliderList.addEventListener('mousedown', dragStart);
    sliderList.addEventListener('mousemove', dragging);
    sliderList.addEventListener('mouseup', dragStop);
}