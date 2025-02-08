const linkWrapper = document.querySelector('.js-link-wrapper');
const messageContainer = document.querySelector('.js-message');

export function adjustMessageWidth() {
    const linkWrapperWidth = linkWrapper.offsetWidth;
    messageContainer.style.maxWidth = linkWrapperWidth + 'px';
}

adjustMessageWidth();

window.addEventListener('resize', adjustMessageWidth);