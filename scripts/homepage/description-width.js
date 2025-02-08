const headerWrapper = document.querySelector('.js-header');
const description = document.querySelector('.js-description');


export function adjustDescriptionWidth() {
    const descriptionWidth = headerWrapper.offsetWidth;
    description.style.maxWidth = descriptionWidth + 'px';
}

adjustDescriptionWidth();

window.addEventListener('resize', adjustDescriptionWidth);