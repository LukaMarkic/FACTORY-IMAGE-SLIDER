const sliderTop = document.querySelector(".slider-top-row");
const topSliderImages = document.querySelectorAll(".slider-top-row img");
const sliderBottom = document.querySelector(".slider-bottom-row");
const bottomSliderImages = document.querySelectorAll(".slider-bottom-row img");

const nextButton =  document.querySelector('#nav-button-right');
const backButton = document.querySelector('#nav-button-left');

let currentTopSliderIndex = 0, previousTopSliderIndex;
let currentBottomSliderIndex = 0, previousBottomSliderIndex;

const numberOfTopSliderImages = topSliderImages.length;
const numberOfBottomSliderImages = bottomSliderImages.length;
const removeTimeout = 490;
const sliderGapSize = 10;

nextButton.addEventListener("click", () => {
    previousTopSliderIndex = currentTopSliderIndex;
    currentTopSliderIndex = (currentTopSliderIndex - 1 + numberOfTopSliderImages) % numberOfTopSliderImages;

    previousBottomSliderIndex = currentBottomSliderIndex;
    currentBottomSliderIndex = (currentBottomSliderIndex - 1 + numberOfBottomSliderImages) % numberOfBottomSliderImages;

    scrollRight(topSliderImages, currentTopSliderIndex, sliderTop);
    scrollRight(bottomSliderImages, currentBottomSliderIndex, sliderBottom);
   
});

backButton.addEventListener("click", () => {
    previousTopSliderIndex = currentTopSliderIndex;
    currentTopSliderIndex = (currentTopSliderIndex + 1) % numberOfTopSliderImages;
    previousBottomSliderIndex = currentBottomSliderIndex;
    currentBottomSliderIndex = (currentBottomSliderIndex + 1) % numberOfBottomSliderImages;

    scrollLeft(topSliderImages, previousTopSliderIndex, sliderTop);
    scrollLeft(bottomSliderImages, previousBottomSliderIndex, sliderBottom);

});


function scrollRight(sliderImages, currentIndex, slider){
    
    sliderImages.forEach(img => img.style.transform = `translateX(${sliderImages[currentIndex].clientWidth + sliderGapSize}px)`);
    slider.insertBefore(sliderImages[currentIndex], slider.firstChild);

    setTimeout(() => {
        sliderImages.forEach(img => img.style.transform = "");
        sliderImages.forEach(img => img.classList.add("sliding-transition"));
    }, 10);

    setTimeout(() => {
        sliderImages.forEach(img => img.classList.remove("sliding-transition"));
    }, removeTimeout);
}

function scrollLeft(sliderImages, previousIndex, slider){
    sliderImages.forEach(img => img.classList.add("sliding-transition"));
    sliderImages.forEach(img => img.style.transform = `translateX(${sliderImages[previousIndex].clientWidth + sliderGapSize}px)`);
  
    setTimeout(() => {
        slider.appendChild(sliderImages[previousIndex]);
        sliderImages.forEach(img => img.classList.remove("sliding-transition"));
        sliderImages.forEach(img => img.style.transform = "");
    }, removeTimeout);
}





