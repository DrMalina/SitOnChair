/* DOM ELEMENTS */

const prevArrow = document.querySelector('.showcase__arrow--left');
const nextArrow = document.querySelector('.showcase__arrow--right');
const sliderImgs = document.querySelectorAll('.showcase__slider img');
const orderTotalPrice = document.querySelector('.order__list-total li');
const orderSelectable = document.querySelectorAll('[data-selectable]');

/* SLIDER */

let sliderIndex = Math.floor(Math.random()*sliderImgs.length); // random photo to display first   
let timer = 0; 
sliderImgs[sliderIndex].classList.add('visible');

const addVisibility = (elem) => {
    elem.classList.add('visible');
}

const removeVisibility = (elem) => {
    elem.classList.remove('visible');
}

const resetTimer = () => {
    timer = setTimeout(sliderCarousel, 7000);
}

const changeSlides = (e) => {
        
    removeVisibility(sliderImgs[sliderIndex]);
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

    addVisibility(sliderImgs[sliderIndex]);
    resetTimer();

}

const sliderCarousel = () => {
    removeVisibility(sliderImgs[sliderIndex]);
    sliderIndex++;
    if(sliderIndex >= sliderImgs.length) { sliderIndex = 0};
    sliderImgs[sliderIndex].style.animation = "moveInRight 1s";
    addVisibility(sliderImgs[sliderIndex]);
    resetTimer();
}

/* ORDER */

const displayOption = (e) => { 

    if(e.target.id !== 'transport') {        
        const targetOpt = e.target.options[e.target.selectedIndex];
        const category = targetOpt.dataset.category; 
        const value = targetOpt.value;
        const price = targetOpt.dataset.price;

        displayFeatures(category, value, price);

    } else { //toggle checkbox

        const category = e.target.dataset.category; 
        const value = e.target.value;
        const price = e.target.dataset.price;

        if(e.target.checked === true) {  
            displayFeatures(category, value, price);
        } else {
            hideFeatures(category);
        }

    }

    calculatePrice();
}

const displayFeatures = (category,value, price) => {

    const item_feature = document.querySelector(`.order__item--${category}`);
    const item_price = document.querySelector(`.order__list-prices .order__item--${category}`);

    //Features
    item_feature.classList.add('visible');
    item_feature.textContent = value;

    //Prices
    item_price.classList.add('visible');
    item_price.textContent =  `$${price}`;
    item_price.setAttribute('data-price', price);
}

const hideFeatures = (category) => {

    const item_feature = document.querySelector(`.order__item--${category}`);
    const item_price = document.querySelector(`.order__list-prices .order__item--${category}`);

    //Features
    item_feature.classList.remove('visible');
    item_feature.textContent = '';

    //Prices
    item_price.classList.remove('visible');
    item_price.textContent = '';
    item_price.setAttribute('data-price', '');
    
}

const calculatePrice = () => { 
    
    let total = 0;

    document.querySelectorAll(`.order__list-prices .order__item`).forEach(el => {
        if(el.dataset.price !== '' && typeof el.dataset.price !== 'undefined') {            
            total += Number(el.dataset.price);
        }
    });

    if(total === 0) {
        orderTotalPrice.textContent = '$0';
    } else {
        orderTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

} 

/* EVENTS */

window.addEventListener('load', () => {
    sliderCarousel(); 
});
prevArrow.addEventListener('click', changeSlides);
nextArrow.addEventListener('click', changeSlides);
orderSelectable.forEach(option => {
    option.addEventListener('change', displayOption);
}); 

      