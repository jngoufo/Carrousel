let collection = $('#collection img'), slide = $('#slide'), defaultImg = $('#defaultImg'), 
defaultImgsrc = $('#defaultImg').attr('src'), previous = $('#previous'), next = $('#next'), collectionImg = [], imgNumber = [];


function createNumber(a){
  $('#slideNumbers').append($('<a class="number"></a>').text(a))
}

// I collect the slides in an array and I create slide numbers
for(let c=0; c < collection.length; c++) {
    collectionImg.push(collection[c]);
    createNumber(c+1);
    imgNumber.push($('.number'));
}

// I set the default active slide
$('.slideImgContainer').html(collectionImg[0]);
imgNumber[0].css('font-weight','900');


// I set the mechanism to move between slides
let s = 0; // i = index of active slide
let n = 0;
function nextSlide() {
    if (s < (collectionImg.length-1)) { // every time the user clicks on next button, until she displays the slide before the last(3rd/4)...
      s = s + 1; // show everytime she clicks, the slide that follow the current one (increase)
    } else if (s === (collectionImg.length-1)) { // if the user displays the last slide (4th)... 
      s = 0;// show the fisrt slide (reset)
    } 
    $('.slideImgContainer').html(collectionImg[s]);
    imgNumber[n].css('font-weight','initial'); // Make the font of the previous slide number back to normal
    n = s; imgNumber[n].css('font-weight','900'); // Change the value of current slide number to match the position of the slide displayed, then set the font
}

function previousSlide() {
    if ((!(s === 0)) && (s <= collectionImg.length) ) { // if the active slide is between 1 to 4...
      s = s - 1; // show the slide that precedes the active one (decrease)
    } else { // if the active slide is the first one...   
      s = (collectionImg.length-1);// Display the last slide  
    }
    $('.slideImgContainer').html(collectionImg[s]) 
    imgNumber[n].css('font-weight','initial');  
    n = s; imgNumber[n].css('font-weight','900');
}

previous.click(previousSlide);
next.click(nextSlide) ;

