let collection = $('#collection img'), slide = $('#slide'), defaultImg = $('#defaultImg'),defaultImgsrc = $('#defaultImg').attr('src'), 
collectionImg = [], imgBullet = [];

$('#slidebtn').hide();

function moveSlide() {
  $('.slideimg').mouseenter(function(){
    $('#slidebtn').show();  
    $('.bullet').hide();
  })
  $('.slideimg').mouseleave(function(){
    $('#slidebtn').hide();
    $('.bullet').show();
  })
}

function createBullet(){
  $('#slideControls').append('<a class="bullet">&#9632;</a>');
}

// I collect the slides in an array and I create slide bullets
for(let c=0; c < collection.length; c++) {
    collectionImg.push(collection[c]);
    createBullet();
    imgBullet.push($('.bullet'));
}

// I set the default active slide
$('.slideImgContainer').html(collectionImg[0]);
imgBullet[0].css('opacity','1');
imgBullet[0].css('background-color','#fff');
$('.slideImgContainer img').addClass('slideimg');
moveSlide();

// I set the mechanism to move to the next slide
let s = 0; // i = index of active slide
let n = 0;
function nextSlide() {
    if (s < (collectionImg.length-1)) { // every time the user clicks on next button, until she displays the slide before the last(3rd/4)...
      s = s + 1; // show the slide that follows the current one (increase)
    } else if (s === (collectionImg.length-1)) { // if the user displays the last slide (4th)... 
      s = 0;// show the fisrt slide (reset)
    } 
    $('.slideImgContainer').html(collectionImg[s]);
    $('.slideImgContainer img').addClass('slideimg');
    imgBullet[n].css('opacity','.3'); // Make the font of the previous slide number back to normal
    imgBullet[n].css('background-color','none');
    n = s; 
    imgBullet[n].css('opacity','1'); // Change the value of current slide number to match the position of the slide displayed, then set the font
    imgBullet[n].css('background-color','#fff');
    moveSlide();
}

$('.slideImgContainer').click(nextSlide);
$('#slidebtn').click(nextSlide);

/*function previousSlide() {
    if ((!(s === 0)) && (s <= collectionImg.length) ) { // if the active slide is between 1 to 4...
      s = s - 1; // show the slide that precedes the active one (decrease)
    } else { // if the active slide is the first one...   
      s = (collectionImg.length-1);// Display the last slide  
    }
    $('.slideImgContainer').html(collectionImg[s]) 
    imgNumber[n].css('font-size','initial');  
    n = s; imgNumber[n].css('font-size','xxx-large');
}

previous.click(previousSlide);
next.click(nextSlide) ;*/

