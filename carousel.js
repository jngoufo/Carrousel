let slide = $('#slide'), defaultImg = $('#defaultImg'),defaultImgsrc = $('#defaultImg').attr('src'), autoScroll, endSlide, timer, imgArray = [],
 imgBullet = [], timerWidth = undefined, getwidthOfTimer, captionTransformation; 


$(document).ready(function(){

  function createBullet(){
    $('.slidebullets').append('<a class="bullet">&#9632;</a>');
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
    
    $('.slideImgContainer img').addClass('slideimg');$('.slideImgContainer').html(imgArray[s]);
    imgBullet[n].css({'opacity':'.5','background-color':'none','color':'#fff'}); 
    imgBullet[s].css({'opacity':'1','background-color':'#000','color':'#fff'}); 
    n = s;    
    slideAnimationAtStart();
    decreaseSlideTimer($(window).width());
    pauseAutoScroll();
  }
  
  //Let transform the caption every 111ms to use it later in animations
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
  function showFigcaption(){
    $('figcaption').animate({width:'80%'},250)
    .animate({fontSize:'50px'},250);
    skewTransform(90, 90)    
  }

  //Let's use the functions above to create the animations
  function slideAnimationAtStart(){
    /*$('.slideImgContainer').css({'height':'0','width':'100%'})
    .animate({height:'100%', width:'100%'}, 1000, showFigcaption());*/
    /*if($('.slideimg').attr('src')=='https://res.cloudinary.com/monwebmestre/image/upload/v1600250959/Projets/Carrousel/Justin-Jr-WebDev-min-min.jpg'){
      $('figure').show('clip', {direction:'vertical'},500);
    }else if($('.slideimg').attr('src')=='https://res.cloudinary.com/monwebmestre/image/upload/v1600250960/Projets/Carrousel/Carousel-coded-with-jQuery-min.jpg'){
      $('figure').show('explode',{pieces:16},500);
    }else if($('.slideimg').attr('src')=='https://res.cloudinary.com/monwebmestre/image/upload/v1600250956/Projets/Carrousel/Justin-WebDev-skills_web-format-min.jpg'){
      $('figure').show('fold',{horizFirst:true},500);
    }else if($('.slideimg').attr('src')=='https://res.cloudinary.com/monwebmestre/image/upload/v1600250957/Projets/Carrousel/Appeller-developpeur-site-web-simple-min.jpg'){
      $('figure').show('drop',{direction:'up'},500);
    }else{
      $('figure').fadeIn(500,showFigcaption());
    };*/
    switch($('.slideImgContainer.row figure img').attr('src')){
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250959/Projets/Carrousel/Justin-Jr-WebDev-min-min.jpg':
        $('figure').show('clip', {direction:'vertical'},1000); //image 0 comes with clip effect
        break;
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250960/Projets/Carrousel/Carousel-coded-with-jQuery-min.jpg':
        $('figure').show('explode',{pieces:128},1000); //image 1 comes with explode effect
        break;
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250956/Projets/Carrousel/Justin-WebDev-skills_web-format-min.jpg': 
        $('figure').show('fold',{horizFirst:true},1000); //image 2 comes with fold effect
        break;
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250957/Projets/Carrousel/Appeller-developpeur-site-web-simple-min.jpg':
        $('figure').show('drop',{direction:'down'},1000); //image 3 comes with drop effect
        break;
      default:
        $('figure').fadeIn(500,showFigcaption())
    }
  }
  function slideAnimationAtEnd(){
    //let i;
    /*$('.slideImgContainer').animate({height:'0', width:'100%'},1000);*/
    //$('.slideImgContainer').html()==setFigIndex(i);
    switch($('.slideImgContainer.row figure img').attr('src')){
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250957/Projets/Carrousel/Appeller-developpeur-site-web-simple-min.jpg':
        $('figure').hide('clip', {direction:'vertical'},1000); // image 3 goes with clip effect
        break;
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250959/Projets/Carrousel/Justin-Jr-WebDev-min-min.jpg':
        $('figure').hide('explode',{pieces:128},1000); // image 0 goes with explode effect
        break;
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250960/Projets/Carrousel/Carousel-coded-with-jQuery-min.jpg':
        $('figure').hide('fold',{horizFirst:true},1000); // image 1 goes with fold effect
        break;
      case 'https://res.cloudinary.com/monwebmestre/image/upload/v1600250956/Projets/Carrousel/Justin-WebDev-skills_web-format-min.jpg':
        $('figure').hide('drop',{direction:'down'},1000); // image 2 goes with drop effect
        break;
      default:
        $('figure').fadeOut(1000)
  
    }

  }

  //The slides change either automatically or manually
  function autoChangeSlide(){
    autoScrollSlides();
    endSlide = setTimeout(slideAnimationAtEnd,5000);
  }

  function ManualChangeSlide(){
    /*$('.slideImgContainer').animate({height:'0', width:'100%'},
      {
        duration: 700,
        easing:'linear',
        complete: autoScrollSlides
      }
    );*/
    slideAnimationAtEnd();
    autoScrollSlides();
  }

  //Let's create a timer in the form of a bar
  function decreaseSlideTimer(widthOfTimer){
    $('#slidetimer').css('width',widthOfTimer);
    timerWidth = parseFloat($('#slidetimer').css('width'));
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


  // Let the user pause the slide moves 
  function pauseAutoScroll() { 
    $('.slideImgContainer.row figure').mouseenter(function(){
      $('.slideImgContainer.row figure').css('cursor','url("https://res.cloudinary.com/monwebmestre/image/upload/v1599653657/Projets/Carrousel/Pause_Play_button.png"), auto');
      clearInterval(autoScroll);
      clearInterval(timer);
      clearTimeout(endSlide);
      getwidthOfTimer = parseFloat($('#slidetimer').css('width'));
    });
    $('.slideImgContainer.row figure').mouseleave(function(){
    $('.slideImgContainer.row figure').css('cursor','default');
    endSlide = setTimeout(slideAnimationAtEnd,5000);
    autoScroll = setInterval(autoChangeSlide,6000);
    decreaseSlideTimer(getwidthOfTimer);
    });  
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

  // The user can let the slides sroll automatically...



  autoScroll = setInterval(autoChangeSlide,6000);

  //Or control the slide change
  pauseAutoScroll();
  $('.slideImgContainer.row').click(ManualChangeSlide);
  //$('#playpausebutton').click(ManualChangeSlide);

})