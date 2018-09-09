/*
The way this works is you need to add this js file to the bottom of each HTML page. Each slideshow element should have an 'id'
that matches the main key in this variable. The value of each key in this object is an array that contains an array.
In that array is a string that points to the image you want to go to. Put them in the order you want them to rotate in.
On the HTML for the smaller arrows you should have an Onclick event that calls the togglePic(dir) function. View 3D.HTML for a complete example.
The array of images can be as long as you want. It will continously loop.

You will also need to attach Jquery CDN script link to bottom of each page.
*/
const GALLERYMAP =  {
    '1': {
      'slides': ['FLAT/1.jpg','FLAT/2.jpg'],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
     'money': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
    
    'collage': {
      'slides': ['FLAT/3.jpg','FLAT/4.jpg', 'FLAT/colleage3.jpg'],
      'showHoverImage': false,
      'hoverImage': null,
    },
    
	'bier': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
    'raket': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	
	'bijdehand': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	'memphis1': {
      'slides': ['FLAT/risomemphis1.jpg', 'FLAT/risomemphis2.jpg'],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	'patroona': {
      'slides': ['FLAT/wall2.jpg', 'FLAT/A.jpg', 'FLAT/A2.jpg', 'FLAT/B.jpg','FLAT/C.jpg', 'FLAT/C2.jpg','FLAT/J.jpg', 'FLAT/J2.jpg', 'FLAT/K.jpg', 'FLAT/K2.jpg', 'FLAT/L.jpg', 'FLAT/L2.jpg','FLAT/M.jpg','FLAT/N.jpg','FLAT/O.jpg','FLAT/P.jpg','FLAT/Q.jpg','FLAT/Q2.jpg','FLAT/V.jpg','FLAT/V2.jpg','FLAT/W.jpg','FLAT/X.jpg','FLAT/X2.jpg','FLAT/Y.jpg','FLAT/Y2.jpg'],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	'reis':{
		'slides':['FLAT/blz3.png','FLAT/blz4.png','FLAT/blz11.png','FLAT/blz9.png','FLAT/blz7.png','FLAT/blz8.png','FLAT/blz6.png','FLAT/blz2.png','FLAT/blz10.png'],
		'showHoverImage':false,
		'hoverImage': null,
	},
	
	
	'wes': {
      'slides': ['FLAT/wes.jpg','FLAT/wes2.jpg', 'FLAT/wes3.jpg','FLAT/wes4.jpg'],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	'barbie': {
      'slides': ['FLAT/BARBIE.jpg','FLAT/barbie2.jpg','FLAT/barbie3.jpg','FLAT/barbie4.jpg','FLAT/barbie5.jpg'],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	'vivetta2': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	
    // more go here
  };

/*
This function handles whether to attach the hover image when it is show and what image to
display if appropriate.
*/
function handleHover(idx = null){
  let $galleryItem = $('[data-gallery-item]:visible'); //get the actual Jquery DOM element
  let galleryKey = $galleryItem.attr('id'); //get the id that will be match in GALLERYMAP
  let currentSlide = $galleryItem.attr('src'); //get the item you are currently at in GALLERYMAP item
  idx = idx ? idx : 0

  // This block will check if the key is enabled for hovering and will allow the image to be show by attaching a class "enable-hover".
  // Its just a marker and has no actual CSS. Only attaches on FIRST image and if property is enabled
  if(idx === 0 && GALLERYMAP[galleryKey]['showHoverImage']) {
    $galleryItem.addClass('enable-hover')
  }else {
    $galleryItem.hasClass('enable-hover') && $galleryItem.removeClass('enable-hover')
  }

  // This unbind will keep you event stack clean from scrolling through the gallery
  $galleryItem.unbind('mouseover mouseout');
  $galleryItem.mouseover(function(e){
    if ($(this).hasClass('enable-hover')) {
        $galleryItem.attr('src', GALLERYMAP[galleryKey]['hoverImage'] )
    }
    e.preventDefault();
  })

  $galleryItem.mouseout(function(e){
    if ($(this).hasClass('enable-hover')) {
        $galleryItem.attr('src', GALLERYMAP[galleryKey]['slides'][0] )
    }
    e.preventDefault();
  })
}

function togglePic(direction) {
  let nextUp = 0;
  let $galleryItem = $('[data-gallery-item]:visible'); //get the actual Jquery DOM element
  let galleryKey = $galleryItem.attr('id'); //get the id that will be match in GALLERYMAP
  let currentSlide = $galleryItem.attr('src'); //get the item you are currently at in GALLERYMAP item
  let idx = GALLERYMAP[galleryKey]['slides'].indexOf(currentSlide)
  let galleryLength = GALLERYMAP[galleryKey]['slides'].length

  nextUp = handleNextOrPrev(direction, idx, galleryLength)
  handleHover(nextUp)

  return $galleryItem.attr('src', GALLERYMAP[galleryKey]['slides'][nextUp] )
}

function handleNextOrPrev(direction, idx, galleryLength) {
  if(direction === 'next'){
    if( ++idx > (galleryLength-1) ){
      nextUp = 0
    }else{
      nextUp = idx++
    }
  }

  if(direction === 'prev'){
    if( (idx - 1) < 0 ){
      nextUp = (galleryLength-1)
    }else{
      nextUp = --idx
    }
  }
  return nextUp
}


// Do this on Pageload
$(function(){
  handleHover()
  toggleSubSlideControls()
})
