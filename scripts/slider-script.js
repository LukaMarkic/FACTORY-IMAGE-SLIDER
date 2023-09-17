$(document).ready(function() {
    const sliderTop = $(".slider-top-row");
    const topSliderImages = $(".slider-top-row img");
    const sliderBottom = $(".slider-bottom-row");
    const bottomSliderImages = $(".slider-bottom-row img");
  
    const rightButton = $("#nav-button-right");
    const leftButton = $("#nav-button-left");
  
    let currentTopSliderIndex = 0, previousTopSliderIndex;
    let currentBottomSliderIndex = 0, previousBottomSliderIndex;
  
    const numberOfTopSliderImages = topSliderImages.length;
    const numberOfBottomSliderImages = bottomSliderImages.length;
    const removeTimeout = 490;
    const sliderGapSize = 10;
  
    rightButton.click(() => {
        previousTopSliderIndex = currentTopSliderIndex;
        currentTopSliderIndex = (currentTopSliderIndex + 1) % numberOfTopSliderImages;
        previousBottomSliderIndex = currentBottomSliderIndex;
        currentBottomSliderIndex = (currentBottomSliderIndex + 1) % numberOfBottomSliderImages;
  
        scrollRight(topSliderImages, previousTopSliderIndex, sliderTop);
        scrollRight(bottomSliderImages, previousBottomSliderIndex, sliderBottom);
    });
  
    leftButton.click(() => {
        previousTopSliderIndex = currentTopSliderIndex;
        currentTopSliderIndex = (currentTopSliderIndex - 1 + numberOfTopSliderImages) % numberOfTopSliderImages;
        previousBottomSliderIndex = currentBottomSliderIndex;
        currentBottomSliderIndex = (currentBottomSliderIndex - 1 + numberOfBottomSliderImages) % numberOfBottomSliderImages;
  
        scrollLeft(topSliderImages, currentTopSliderIndex, sliderTop);
        scrollLeft(bottomSliderImages, currentBottomSliderIndex, sliderBottom);
    });
  
    function scrollLeft(sliderImages, currentIndex, slider) {
        $(sliderImages[currentIndex]).addClass("fade-in-animation");
        sliderImages.each(function(index, img) {
            $(img).css("transform", `translateX(${sliderImages[currentIndex].clientWidth + sliderGapSize}px)`);
        });
         slider.prepend(sliderImages[currentIndex]);
  
        setTimeout(function() {
            sliderImages.each(function(index, img) {
                $(img).css("transform", "");
                $(img).addClass("sliding-transition");
            });
        }, 10);
  
        setTimeout(function() {
            sliderImages.removeClass("sliding-transition");
            $(sliderImages[currentIndex]).removeClass("fade-in-animation");
        }, removeTimeout);
    }
  
    function scrollRight(sliderImages, previousIndex, slider) {
        sliderImages.addClass("sliding-transition");
        sliderImages.each(function(index, img) {
            $(img).css("transform", `translateX(${sliderImages[previousIndex].clientWidth + sliderGapSize}px)`);
        });
    
        setTimeout(function() {
            slider.append(sliderImages[previousIndex]);
            sliderImages.removeClass("sliding-transition");
            sliderImages.each(function(index, img) {
            $(img).css("transform", "");
            });
        }, removeTimeout);
    }
  });
  