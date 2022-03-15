/*
Theme Name: HUGE
Description: Creative Coming Soon Template
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

"use strict";

$(function(jQuery){
	var x=document.documentElement.clientHeight;
	var y=jQuery(".header").outerHeight();
	jQuery("#parallax_wrapper").css("height",x-y+"px");
	jQuery("#parallax_wrapper").css("left",50+"%");
	jQuery(".scene_1").plaxify({"xRange":0,"yRange":0,"invert":true}),
	jQuery(".scene_2").plaxify({"xRange":70,"yRange":20,"invert":true}),
	jQuery(".scene_3").plaxify({"xRange":0,"yRange":40,"invert":true}),
	jQuery.plax.enable();

	jQuery(document).ready(function() {
		jQuery('.duck-animation')
			.delay(100)
			.css('background-position-x','-200px')
			.animate({'background-position-x':'2000px'},
		50000,'linear');
	});
});
