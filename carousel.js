let collection = $('#collection img'), slide = $('#slide'), defaultImg = $('#defaultImg'),defaultImgsrc = $('#defaultImg').attr('src'), autoScroll,
timer, collectionImg = [], imgBullet = [], timerWidth = undefined; 

  // I set a timer for each displayed slide      
  /*function decreaseSlideTimer(){
    timerWidth = $('#slidetimer').css('width');
    timerWidth = parseFloat(timerWidth);
    if(timerWidth === 0){
      timerWidth = $(window).width()
    } else {
      timerWidth = timerWidth-($(window).width()*0.01);
    }
    $('#slidetimer').css('width',timerWidth);
  }*/



$(document).ready(function(){
  $('#ctrlBtn').hide();

  function decreaseSlideTimer(widthOfTimer){
    $('#slidetimer').css('width',widthOfTimer);
    timerWidth = parseFloat($('#slidetimer').css('width')) ;
    if(timerWidth === 0){
      clearInterval(timer)
    } 
    else {
      timer = setInterval(function(){
        timerWidth = timerWidth-(widthOfTimer*0.01);
        $('#slidetimer').css('width',timerWidth);
      }, 50)
    }
  }

  function stopAutoScroll() { // a signal showing the user that there is some sort of control on the slide moves 
    let getwidthOfTimer;
    $('.slideimg').mouseenter(function(){
      $('.slideimg').css('cursor','url("https://res.cloudinary.com/monwebmestre/image/upload/v1599222243/Projets/Carrousel/Pause_Normal_Red.png"), auto');
      clearInterval(autoScroll);
      clearInterval(timer);
      getwidthOfTimer = parseFloat($('#slidetimer').css('width'));
    });
    $('.slideimg').mouseleave(function(){
    $('.slideimg').css('cursor','default');
    autoScroll = setInterval(autoScrollSlides,5000);
    decreaseSlideTimer(getwidthOfTimer);
    });  
  }

  function createBullet(){
    $('#slidebullets').append('<a class="bullet">&#9632;</a>');
  }

  // I set the mechanism to move from slide to slide
  let s = 0; // => index of active slide
  let n = 0; // => index of previous slide
  function autoScrollSlides() {
    clearInterval(timer);
    if (s < (collectionImg.length-1)) { 
      s = s + 1; 
    } else if (s === (collectionImg.length-1)) { 
      s = 0;
    } 
    $('.slideImgContainer').html(collectionImg[s]);
    $('.slideImgContainer img').addClass('slideimg');
    imgBullet[n].css({'opacity':'.2','background-color':'none'}); 
    imgBullet[s].css({'opacity':'1','background-color':'#fff'}); 
    n = s;    
    decreaseSlideTimer($(window).width());
    stopAutoScroll();
  }


    // I collect the slides in an array and I create slide bullets
    for(let c=0; c < collection.length; c++) {
      collectionImg.push(collection[c]);
      createBullet();
      imgBullet.push($('.bullet'));
    }
    // I set the default active slide...
    $('.slideImgContainer').html(collectionImg[0]);
    imgBullet[0].css({'opacity':'1','background-color':'#fff'});
    $('.slideImgContainer img').addClass('slideimg');
    decreaseSlideTimer($(window).width());

    // The user can let the slides sroll automatically
    autoScroll = setInterval(autoScrollSlides,5000);

    //Or control the slide change...
    stopAutoScroll();
    $('.slideImgContainer').click(autoScrollSlides);


    

})