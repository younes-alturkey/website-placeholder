/*
Theme Name: HUGE
Description: Creative Coming Soon Template
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

$(window).on("load", function() {
  $("#countdown").countdown($("#countdown").attr("data-time"), function(e) {
      $(this).html(e.strftime("<div>%D<span>Days</span></div> <div>%H<span>Hours</span></div> <div>%M<span>Minutes</span></div> <div>%S<span>Seconds</span></div>"))
  });
});


var hits = 0,
 bunnyAppear=null,
 time = 45,
 gameSpeed = 1000,
 TimeOut =null,
 speed=null,
 topScore = hits;

// Bunny appear
var bunnyFunction=function(){
  var bunny = '<div class="bunny"></div>';
  var x = Math.floor((Math.random() * 9));
  $('.egg').empty();
  $('.run').text(gameSpeed);
  $('.egg:eq('+x+')').append(bunny);
  clearInterval(bunnyAppear);
  bunnyAppear = setInterval(bunnyFunction, gameSpeed);
}

// shoot bunny
$('.egg').on('click', '.bunny' , function(){
  $('.hits').text(++hits);
  topScore < hits && (topScore = hits);
  $(".myTopScore").text(topScore);
  $(this).removeClass('bunny').addClass('bunny-out');

});

// Bunny start
$('.btn-start').click(function(){
   time = 45;
   hits = 0;
   gameSpeed = 1000;
  $('.hits').text(hits); // hits count
  $('.btn-start').hide();
  $('.btn-stop').show();
  $('.time').addClass('start');

  speed =  setInterval(function(){
    gameSpeed = gameSpeed - 9;
  }, 500);

   // Bunny appear
   bunnyAppear = setInterval(bunnyFunction, gameSpeed);

    // Timer
   timeOut =  setInterval(function(){
      $('.time').text(--time);
      $('.shot').remove();

      if( time <= 0){
        bunnyStop()
        $('#gameOver').addClass('show');
      }

    }, 1000);

  // shot
  $('.holder').click(function(event){
      $(this).append('<div class="shot"></div>')
      $('.shot').css({
          left: event.pageX - window.innerWidth/2,
          top: event.pageY
      });
  });
});

// bunny stop
function bunnyStop(){
  clearInterval(bunnyAppear);
  clearInterval(timeOut);
  clearInterval(speed);

  $('.btn-start').show();
  $('.btn-stop').hide();
  $('.time').removeClass('start');
}

$('.btn-stop').click(function(){
 bunnyStop()
});

$('.pull-right  img').click(function(){
  $('.pull-right img').removeClass('active');
  $(this).addClass('active');
  var pointer = $(this).attr('class');
  $('.holder').removeClass('gun-2 , gun-1').addClass(pointer)
});

// popup
$('.pop-close').click(function(event){
  $(this).closest('.overlay').removeClass('show')
});