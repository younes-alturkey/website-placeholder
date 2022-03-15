/*
Theme Name: HUGE
Description: Creative Coming Soon Template
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

var makeWinHeight = function(){
	var vh = $(window).height();
	var projects = vh/2 + vh/4;
	var main = projects * 2;
	$('#scene, .layer.gradient, #canvas-basic').height(vh);
	$('#scene .col a, #scene .col').height(projects);
	$('.layer.main').height(main);
}
$(document).ready(function(){
	makeWinHeight();

});
$(window).resize(function(){
	makeWinHeight();
});

var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

var app = angular.module('huge', ['ngSanitize']);

app.controller('cardsController', function(){
    this.cards = cardlist;
});


var cardlist = [
    {
        image: 'images/img1.jpg',
        title: "404<br /><br /><p>The page you are looking for doesn't exist.</p>",
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img2.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img3.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },

    {
        image: 'images/img4.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img5.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img6.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },

    {
        image: 'images/img7.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img8.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img9.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },

    {
        image: 'images/img10.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img11.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img12.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },

    {
        image: 'images/img13.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img14.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img15.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },

    {
        image: 'images/img16.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img17.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img18.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },

    {
        image: 'images/img19.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img20.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img21.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },

    {
        image: 'images/img22.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img23.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    },
    {
        image: 'images/img24.jpg',
        title: '<img src="images/left-arrow.svg" height="16px" />',
        url: 'https://goo.gl/cDegnA',
    }
];

