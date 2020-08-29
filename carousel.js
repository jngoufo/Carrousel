let collection = $('#collection img'), slide = $('#slide'), defaultImg = $('#defaultImg'),defaultImgsrc = $('#defaultImg').attr('src'), playSlide
collectionImg = [], imgBullet = [], slideTimerControl= undefined; 

$(document).ready(function(){
$('#ctrlBtn').hide();


function controlSlideChange() { // a signal showing the user that there is some sort of control on the slide moves 
  $('.slideimg').mouseleave(function(){
  $('.slideimg').css('cursor','default');
  playSlide = setInterval(autoSlidechange,3000);
  });  
  $('.slideimg').mouseenter(function(){
    $('.slideimg').css('cursor','pointer');
    clearInterval(playSlide);
  });
}

function createBullet(){
  $('#slidebullets').append('<a class="bullet">&#9632;</a>');
}

// I set the mechanism to move to the next slide
let s = 0; // i = index of active slide
let n = 0;
function autoSlidechange() {
  if (s < (collectionImg.length-1)) { // every time the user clicks on next button, until she displays the slide before the last(3rd/4)...
    s = s + 1; // show the slide that follows the current one (increase)
  } else if (s === (collectionImg.length-1)) { // if the user displays the last slide (4th)... 
    s = 0;// show the fisrt slide (reset)
  } 
  $('.slideImgContainer').html(collectionImg[s]);
  $('.slideImgContainer img').addClass('slideimg');
  imgBullet[n].css({'opacity':'.2','background-color':'none'}); // Make the font of the previous slide bullet back to normal
  imgBullet[s].css({'opacity':'1','background-color':'#fff'}); // Change the current slide bullet to match the position of the slide displayed, then set the font
  n = s;
  controlSlideChange();
}


  // I collect the slides in an array and I create slide bullets
  for(let c=0; c < collection.length; c++) {
    collectionImg.push(collection[c]);
    createBullet();
    imgBullet.push($('.bullet'));
  }
  controlSlideChange();
  // I set the default active slide
  $('.slideImgContainer').html(collectionImg[0]);
  imgBullet[0].css({'opacity':'1','background-color':'#fff'});
  $('.slideImgContainer img').addClass('slideimg');
  playSlide = setInterval(autoSlidechange,3000);
  $('.slideImgContainer').click(autoSlidechange);
  decreaseSlidetimerWidth()
  //$('#ctrlBtn').click(autoSlidechange);
})

// I show a timer for each displayed slide


function decreaseSlidetimerWidth(){
  let slidetimer_w = $('#slidetimer').css('width');
  slideTimerControl = setInterval(setSlideTimerWidth,10);
  function setSlideTimerWidth(){
    if (slidetimer_w == $(window).width()) {
      clearInterval(slideTimerControl)
    } else {
      slidetimer_w++;
      $('#slidetimer').css('width',slidetimer_w);
    }
  }
}