/* DOM ELEMENTS */
const prevArrow = document.querySelector('.showcase__arrow--left');
const nextArrow = document.querySelector('.showcase__arrow--right');
const sliderImgs = document.querySelectorAll('.showcase__slider img');
const selectOptions = document.querySelectorAll('option');
const orderFeatures = document.querySelector('.order__list-features');
const orderTransport = document.querySelector('.order__input--transport');

/* SLIDER */

let sliderIndex = Math.floor(Math.random()*sliderImgs.length); // random photo to display first   
let timer = 0; 
sliderImgs[sliderIndex].classList.add('visible');

const addVisibility = () => {
    sliderImgs[sliderIndex].classList.add('visible');
}

const removeVisibility = () => {
    sliderImgs[sliderIndex].classList.remove('visible');
}

const resetTimer = () => {
    timer = setTimeout(sliderCarousel, 7000);
}

const changeSlides = (e) => {
        
    removeVisibility();
    clearTimeout(timer);

    if(e.target.dataset.direction === 'left') {    
        sliderIndex--;  
        if (sliderIndex < 0) { sliderIndex = sliderImgs.length - 1};
        sliderImgs[sliderIndex].style.animation = "moveInRight 1s";     

    } else {
        sliderIndex++;    
        if (sliderIndex >= sliderImgs.length) { sliderIndex = 0};
        sliderImgs[sliderIndex].style.animation = "moveInLeft 1s";
    }

    addVisibility();
    resetTimer();

}

const sliderCarousel = () => {
    removeVisibility();
    sliderIndex++;
    if(sliderIndex >= sliderImgs.length) { sliderIndex = 0};
    sliderImgs[sliderIndex].style.animation = "moveInRight 1s";
    addVisibility();
    resetTimer();
}

/* ORDER */

const chooseOption = (e) => {

    const category = e.target.dataset.category;
    const value = e.target.value;
    document.querySelector(`.order__item--${category}`).classList.add('visible');
    document.querySelector(`.order__item--${category}`).textContent = value;
}

/* EVENTS */
window.addEventListener('load', () => {
    sliderCarousel();
});
prevArrow.addEventListener('click', changeSlides);
nextArrow.addEventListener('click', changeSlides);
selectOptions.forEach(option => {
    option.addEventListener('click', chooseOption);
});
orderTransport.addEventListener('click', chooseOption);



      
