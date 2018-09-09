var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);

}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  // dots[slideIndex-1].className += " active";
  toggleSubSlideControls()
  handleHover()
}


// This will toggle the smaller controls to show/hide based on its 'slides' property of GALLERYMAP
function toggleSubSlideControls(idx = null){
  let $galleryItem = $('[data-gallery-item]:visible'); //get the actual Jquery DOM element
  let galleryKey = $galleryItem.attr('id'); //get the id that will be match in GALLERYMAP

  if(GALLERYMAP[galleryKey]['slides'].length <= 0){
    $('.arrow2ndSlide').fadeOut()
  } else {
    $('.arrow2ndSlide').fadeIn()
  }
}
