/*
The way this works is you need to add this js file to the bottom of each HTML page. Each slideshow element should have an 'id'
that matches the main key in this variable. The value of each key in this object is an array that contains an array.
In that array is a string that points to the image you want to go to. Put them in the order you want them to rotate in.
On the HTML for the smaller arrows you should have an Onclick event that calls the togglePic(dir) function. View 3D.HTML for a complete example.
The array of images can be as long as you want. It will continously loop.

You will also need to attach Jquery CDN script link to bottom of each page.
*/
const GALLERYMAP =  {
    'doll1': {
      'slides': ['3Dflat/doll1.jpg', '3Dflat/doll3.jpg','3Dflat/doll4.jpg','3Dflat/doll5.jpg','3Dflat/doll6.jpg','3Dflat/doll7.jpg'],
      'showHoverImage': true,
      'hoverImage': '3Dflat/doll2.jpg',
    },
	
     'shroom': {
      'slides': ['3Dflat/shroom.jpg', '3Dflat/shroom4.jpg', '3Dflat/shroom3.jpg'],
      'showHoverImage': true,
      'hoverImage': '3Dflat/shroom2.jpg',
    },
    
    'angrysun': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
    
	'vuur': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
    'planeet': {
      'slides': ['3Dflat/planeet.jpg', '3Dflat/planeet4.jpg', '3Dflat/planeet6.jpg','3Dflat/planeet2.jpg','3Dflat/planeet3.jpg','3Dflat/planeet5.jpg','3Dflat/planeet7.jpg'],
      'showHoverImage': true,
      'hoverImage': '3Dflat/planeet.gif',
    },
	
	
	'bug': {
      'slides': ['3Dflat/bug.jpg', '3Dflat/bug3.jpg',  '3Dflat/bug4.jpg','3Dflat/bug6.jpg','3Dflat/bug5.jpg','3Dflat/bug7.jpg','3Dflat/bug8.jpg','3Dflat/bug9.jpg'],
      'showHoverImage': true,
      'hoverImage': '3Dflat/bug2.jpg',
    },
	
	'beest': {
      'slides': ['3Dflat/beest6.jpg', '3Dflat/beest2.jpg','3Dflat/beest3.jpg',  '3Dflat/beest4.jpg','3Dflat/beest5.jpg','3Dflat/beest.jpg','3Dflat/beest7.jpg','3Dflat/beest8.jpg'],
      'showHoverImage': true,
      'hoverImage': '3Dflat/beest10.jpg',
    },
	
	'house': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	'time': {
      'slides': ['3Dflat/time.jpg', '3Dflat/time3.jpg'],
      'showHoverImage': true,
      'hoverImage': '3Dflat/time2.jpg',
    },
	
	'puzzel': {
      'slides': [],
      'showHoverImage': false,
      'hoverImage': null,
    },
	
	'twiggy': {
      'slides': ['3Dflat/twiggy2.jpg','3Dflat/twiggy3.jpg','3Dflat/twiggy4.jpg'],
      'showHoverImage': true,
      'hoverImage': '3Dflat/twiggy1.jpg',
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
