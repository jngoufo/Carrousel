let slide = $('#slide'), defaultImg = $('#defaultImg'),defaultImgsrc = $('#defaultImg').attr('src'), autoScroll, endSlide, timer, imgArray = [],
 imgBullet = [], timerWidth = undefined, captionTransformation; 


$(document).ready(function(){

  function stopAutoScroll() { // a signal showing the user that there is some sort of control over the slide moves 
    let getwidthOfTimer;
    $('.slideimg').mouseenter(function(){
      $('.slideimg').css('cursor','url("https://res.cloudinary.com/monwebmestre/image/upload/v1599653657/Projets/Carrousel/Pause_Play_button.png"), auto');
      clearInterval(autoScroll);
      clearInterval(timer);
      clearTimeout(endSlide);
      getwidthOfTimer = parseFloat($('#slidetimer').css('width'));
    });
    $('.slideimg').mouseleave(function(){
    $('.slideimg').css('cursor','default');
    endSlide = setTimeout(slideAnimationAtEnd,5000);
    autoScroll = setInterval(autoChangeSlide,6000);
    decreaseSlideTimer(getwidthOfTimer);
    });  
  }

  function createBullet(){
    $('#slidebullets').append('<a class="bullet">&#9632;</a>');
  }

  function setSkew (x,y){
    let skewValue ='';
    skewValue = 'skew(' + x + 'deg,' + y + 'deg)';
    return skewValue
  }
  function skewTransform(a,b){
    captionTransformation = setInterval(function(){
      a += 10; b += 10;
      if (a >= 180 && b >= 180){
        $('figcaption').css('transform', setSkew(180,180));
        clearInterval(captionTransformation)
      } 
      else {
        $('figcaption').css('transform', setSkew(a,b));
      }
    },111)
  }

  function showFigcaption(){
    $('figcaption').animate({width:'80%'},250)
    .animate({fontSize:'50px'},250);
    skewTransform(90, 90)    
  }

  function setTranslate(c,d){
    let translateValue = '';
    translateValue = 'translate('+c+'%,'+d+'%)'
    return translateValue;
  }
  function hideFigcaption(e,f,w,fs){
    captionTransformation = setInterval(function(){
      e += 10; f -= 10; 
      w = parseFloat($('figcaption').css('width')) - (parseFloat($('figcaption').css('width'))*0.01);
      fs = parseFloat($('figcaption').css('fontSize')) - (parseFloat($('figcaption').css('fontSize'))*0.01);
      if ((e > 100 && f < -100) /*|| (w <= 0) || (fs <= 0)*/){
        clearInterval(captionTransformation);
      } else if(e===100 && f===-100){
        $('figcaption').css({'transform': setTranslate(100,-100),'width':'0','fontSize':'0'});
      }
      else {
        $('figcaption').css({'transform': setTranslate(e,f),'width':w,'fontSize':fs});
      }
    },50)
  }

  function slideAnimationAtStart(){
    $('.slideImgContainer').css({'height':'0','width':'0'})
    .animate({height:'100%', width:'100%'}, 1000, showFigcaption());
  }

  function decreaseSlideTimer(widthOfTimer){
    $('#slidetimer').css('width',widthOfTimer);
    timerWidth = parseFloat($('#slidetimer').css('width')) ;
    if(timerWidth === 0){
      clearInterval(timer);
    } 
    else {
      timer = setInterval(function(){
        timerWidth = timerWidth-(widthOfTimer*0.01);
        $('#slidetimer').css('width',timerWidth);
      }, 50)
    }
  }

  function slideAnimationAtEnd(){
    hideFigcaption(0,0,$('figcaption').css('width'),$('figcaption').css('fontSize'));
    $('.slideImgContainer').animate({height:'0', width:'0'},1000);
  }

  function autoChangeSlide(){
    autoScrollSlides();
    endSlide = setTimeout(slideAnimationAtEnd,5000);
  }

  function ManualChangeSlide(){
    hideFigcaption(0,0,$('figcaption').css('width'),$('figcaption').css('fontSize'));
    $('.slideImgContainer').animate({height:'0', width:'0'},
      {
        duration: 700,
        easing:'linear',
        complete: autoScrollSlides
      }
    );
  }

  // I set the mechanism to move from slide to slide
  let s = 0; // => index of active slide
  let n = 0; // => index of previous slide
  function autoScrollSlides() {
    clearInterval(timer);
    if (s < (imgArray.length-1)) { 
      s = s + 1; 
    } else if (s === (imgArray.length-1)) { 
      s = 0;
    } 
    $('.slideImgContainer').html(imgArray[s]);
    slideAnimationAtStart();
    $('.slideImgContainer img').addClass('slideimg');
    imgBullet[n].css({'opacity':'.2','background-color':'none'}); 
    imgBullet[s].css({'opacity':'1','background-color':'#fff'}); 
    n = s;    
    decreaseSlideTimer($(window).width());
    stopAutoScroll();
  }


    // I collect the slides in an array and I create slide bullets
    for(let c=0; c < $('figure').length; c++) {
      imgArray.push($('figure')[c]);
      createBullet();
      imgBullet.push($('.bullet'));
    }
    // I set the default active slide...
    $('.slideImgContainer').html(imgArray[0]);
    slideAnimationAtStart();
    imgBullet[0].css({'opacity':'1','background-color':'#fff'});
    $('.slideImgContainer img').addClass('slideimg');
    decreaseSlideTimer($(window).width());
    endSlide = setTimeout(slideAnimationAtEnd,5000);

    // The user can let the slides sroll automatically
    autoScroll = setInterval(autoChangeSlide,6000);

    //Or control the slide change...
    stopAutoScroll();
    $('.slideImgContainer.row').click(ManualChangeSlide);
    $('#playpausebutton').click(ManualChangeSlide);
    



    

})