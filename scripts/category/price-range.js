const rangeMin = document.getElementById("range-min");
const rangeMax = document.getElementById("range-max");
const sliderTrack = document.querySelector(".filter__price-slider-track");
const minPar = document.querySelector(".js-range-min-par");
const maxPar = document.querySelector(".js-range-max-par");

const inputCycleDOM = document.querySelectorAll('.js-range-input');
const inputPar = document.querySelectorAll('.js-range-input');

export function updateSliderTrack() {
    const min = parseInt(rangeMin.value);
    const max = parseInt(rangeMax.value);
    const range = parseInt(rangeMin.max) - parseInt(rangeMin.min);

    // inputCycleDOM.forEach((input) => {
    //     const inputId = input.dataset.rangeId;
    // });

    const inputId = inputCycleDOM.dataset.rangeId;

    minPar.innerHTML = min;
    maxPar.innerHTML = max;

    const minPercent = (min / range) * 100;
    const maxPercent = (max / range) * 100;

    sliderTrack.style.background = `linear-gradient(to right, 
    lightgray ${minPercent}%, 
    black ${minPercent}%, 
    black ${maxPercent}%, 
    lightgray ${maxPercent}%)`;
}

rangeMin.addEventListener("input", updateSliderTrack);
rangeMax.addEventListener("input", updateSliderTrack);