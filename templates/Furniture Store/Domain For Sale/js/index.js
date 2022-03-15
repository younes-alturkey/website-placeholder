/*
Theme Name: HUGE
Description: Creative Coming Soon Template
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

document.body.children[0].addEventListener("click", event => {
  var nav = document.querySelector("nav");
  var header = document.querySelector("header");

  if (event.target.dataset.menustate == "closed") {
    event.target.dataset.menustate = nav.dataset.state = header.dataset.menustate = "open";
  } else {
    event.target.dataset.menustate = nav.dataset.state = header.dataset.menustate = "closed";
  }
});

$(window).on("load", function() {
  $("#countdown").countdown($("#countdown").attr("data-time"), function(e) {
      $(this).html(e.strftime("<div>%D<span>Days</span></div> <div>%H<span>Hours</span></div> <div>%M<span>Minutes</span></div> <div>%S<span>Seconds</span></div>"))
  });
});