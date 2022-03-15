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
