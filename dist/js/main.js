
/* DOM ELEMENTS */
const prevArrow = document.querySelector('.showcase__arrow--left');
const nextArrow = document.querySelector('.showcase__arrow--right');
const sliderImgs = document.querySelectorAll('.showcase__slider img');
const selectOptions = document.querySelectorAll('option');
const orderTransport = document.querySelector('.order__input--transport');
const orderSummary = document.querySelector('.order__list-summary li');
const orderTotalPrice = document.querySelector('.order__list-total li');
const selectFields = document.querySelectorAll('select');

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

    console.log('test');

    const category = e.target.dataset.category; 
    const value = e.target.value;
    const price = e.target.dataset.price;

    if(e.target.name === 'transport') { //toggling checkbox transport
        
        if(e.target.checked === true) {
            displayFeatures(category, value, price);
        } else {
            hideFeatures(category);
        }

    }  else {

        displayFeatures(category, value, price);
    }  

    calculatePrice(); 

}

const displayFeatures = (category,value, price) => {
    //Features
    document.querySelector(`.order__item--${category}`).classList.add('visible');
    document.querySelector(`.order__item--${category}`).textContent = value;

    //Prices
    document.querySelector(`.order__list-prices .order__item--${category}`).classList.add('visible');
    document.querySelector(`.order__list-prices .order__item--${category}`).textContent =  `$${price}`;
    document.querySelector(`.order__list-prices .order__item--${category}`).setAttribute('data-price', price);
}

const hideFeatures = (category) => {

    //Features
    document.querySelector(`.order__item--${category}`).classList.remove('visible');
    document.querySelector(`.order__item--${category}`).textContent = '';

    //Prices
    document.querySelector(`.order__list-prices .order__item--${category}`).classList.remove('visible');
    document.querySelector(`.order__list-prices .order__item--${category}`).textContent = '';
    document.querySelector(`.order__list-prices .order__item--${category}`).setAttribute('data-price', '');
    
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
/* selectOptions.forEach(option => {
    option.addEventListener('click', displayOption);
}); */
selectFields.forEach(select => {
    select.addEventListener('change', displayOption);
})
orderTransport.addEventListener('click', displayOption);



      