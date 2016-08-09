var configTwitterProfile = {
  "profile": {"screenName": 'BrowardCollege'},
  "domId": 'twitter-content',
  "maxTweets": 2,
  "enableLinks": true, 
  "showUser": false,
  "showTime": true,
  "showInteraction": false,
  "showImages": false,
  "lang": 'en'
};

twitterFetcher.fetch(configTwitterProfile);

var configInstagramProfile = {
	target: 'instagram-content',
	get: 'user',
	userId: '623597756',
	clientId: '02b47e1b98ce4f04adc271ffbd26611d',
	accessToken: '623597756.02b47e1.3dbf3cb6dc3f4dccbc5b1b5ae8c74a72',
	resolution: 'low_resolution',
	sortBy: 'most-recent',
	limit: 9,
};

var feed = new Instafeed(configInstagramProfile);
feed.run();

/*	@Class animateClass: 
 *	
 *	@parameter {object} options
 */

animateClass = function(options) {

	var optns = {
			animateToLeftClass: 'animate-to-left',
			animateToRightClass: 'animate-to-right',
			animateToTopClass: 'animate-to-top',
			animateToBottomClass: 'animate-to-bottom'
		},
		self = this;

	self.options = (typeof(options) == 'object') ? options : optns;

	self.init = function() {
		$(window).on('scroll', self.stage);
	}

	self.stage = function() {
		animate();
	}

	function animate() {

		var animateSections = $('.animate-on');

		for (var i = 0; i < animateSections.length; i++) {
			var topElement = $(animateSections[i]).offset().top;
			var posToAction = $(window).height() * 0.90;
			var scrollTop = $(window).scrollTop();

			if (scrollTop >= (topElement - posToAction)) {
				$(animateSections[i]).addClass('animate-actived');
				openAnimate(animateSections[i]);
			} else {
				$(animateSections[i]).removeClass('animate-actived');
				closeAnimate(animateSections[i]);
			}
		}

	}

	function openAnimate(container) {
		var animateElements = $('.animate', container);
		for (var i = 0; i < animateElements.length; i++) {
			var delay = ($(animateElements[i]).data('delay')) ? $(animateElements[i]).data('delay'): 0;
			animateTransition(animateElements[i], delay);
		}
	}

	function closeAnimate(container) {
		var animateElements = $('.animate', container);
		for (var i = 0; i < animateElements.length; i++) {
			var delay = 0;
			animateTransition(animateElements[i], delay);
		}
	}

	function animateTransition(ob, delay, type) {
		if (!type) type = 'ease-out';
		$(ob).css('-webkit-transition-delay', delay+'s');
		$(ob).css('-moz-transition-delay', delay+'s');
		$(ob).css('-o-transition-delay', delay+'s');
		$(ob).css('transition-delay', delay+'s');

		$(ob).css('-webkit-transition-timing-function', type);
		$(ob).css('-moz-transition-timing-function', type);
		$(ob).css('-o-transition-timing-function', type);
		$(ob).css('transition-timing-function', type);
	}
}

var animate1 = new animateClass();
animate1.init();

/*	@Class slasticMenu: 
 *	
 *	@parameter {object} options
 *		fixed_menu: default '#fixed_menu' | Id fixed menu
 *		static_menu: default '#fixed_menu' | Id static Mmnu
 */

slasticMenu = function(options) {
	var self = this;

	self.fixedMenu = (options.fixed_menu !== 'undefined') ? options.fixed_menu : '#fixed_menu';

	self.staticMenu = (options.static_menu !== 'undefined') ? options.static_menu : '#static_menu';

	self.init = function() {
		nav = $(self.fixedMenu);

		$(window).on('scroll', self.stage);
	}

	self.stage = function() {
		var el = $(self.staticMenu),
			top = parseInt(el.offset().top),
			height = parseInt(el.height()),
			scrollTop = $(document).scrollTop(),
			nav = $(self.fixedMenu);

		if ( scrollTop > ( top + height ) ) {
			$(nav).addClass('active');
		} else {
			$(nav).removeClass('active');
		}
	}
}

var options = {
	fixed_menu: '#navigation',
	static_menu: '#main-top'
},
animateMenu = new slasticMenu(options);

animateMenu.init();

var CustomMap = function(options) {

	var markers = [];
	var infoWindows = [];

	this.map = null;
	this.mapContainer = (typeof options.container == 'object') ? options.container : document.getElementById('map-container');
	this.mapStyle = {
		mapTypeId: 'roadmap',
		scrollwheel: false,
		zoomControl: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: false,
		styles: [
			{
				"featureType":"administrative",
				"elementType":"all",
				"stylers":[
					{"visibility":"on"},
					{"saturation":-100},
					{"lightness":20}
				]
			},
			{
				"featureType":"road",
				"elementType":"all",
				"stylers":[
					{"visibility":"on"},
					{"saturation":-100},
					{"lightness":40}
				]
			},
			{
				"featureType":"water",
				"elementType":"all",
				"stylers":[
					{"visibility":"on"},
					{"saturation":-10},
					{"lightness":30}
				]
			},
			{
				"featureType":"landscape.man_made",
				"elementType":"all",
				"stylers":[
					{"visibility":"simplified"},
					{"saturation":-60},
					{"lightness":10}
				]
			},
			{
				"featureType":"landscape.natural",
				"elementType":"all",
				"stylers":[
					{"visibility":"simplified"},
					{"saturation":-60},
					{"lightness":60}
				]
			},
			{
				"featureType":"poi",
				"elementType":"all",
				"stylers":[
					{"visibility":"off"},
					{"saturation":-100},
					{"lightness":60}
				]
			},
			{
				"featureType":"transit",
				"elementType":"all",
				"stylers":[
					{"visibility":"off"},
					{"saturation":-100},
					{"lightness":60}
				]
			}
		]
	};
	this.markers = (typeof options.markers == 'object') ? options.markers : [];
	this.maxWithInfoWindow = (options.maxWithInfoWindow) ? options.maxWithInfoWindow : 350;
	this.icons = {
		min: 'file:///Users/aado29/Documents/Proyectos/broward/images/min-marker.png',
		max: 'file:///Users/aado29/Documents/Proyectos/broward/images/max-marker.png'
	};

	this.init = function() {
		this.map = new google.maps.Map(this.mapContainer, this.mapStyle);
		this.map.setTilt(45);
		this.bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < this.markers.length; i++) {
			//this.drawMarker(i, location.hostname + 'images/min-marker.png');
			this.drawMarker(i, this.icons.min);
		}
	};

	this.drawMarker = function(id, image) {
		var self = this;
		var position = new google.maps.LatLng(this.markers[id][0], this.markers[id][1]);
		var infoWindow = new google.maps.InfoWindow({
			maxWidth : self.maxWithInfoWindow,
			content: self.markers[id][3]
		});
		var marker = new google.maps.Marker({
			position:	position,
			map:		self.map,
			title:		self.markers[id][2],
			icon:		image
		});
		self.bounds.extend(position);
		infoWindows.push(infoWindow);
		markers.push(marker);
		   
		google.maps.event.addListener(marker, 'click', (function(marker, id) { 
			return function() {
				for (var i = 0; i < markers.length; i++) {
					markers[i].setIcon(self.icons.min);
					infoWindows[i].close();
				}

				infoWindow.open(self.map, marker);
				marker.setIcon(self.icons.max);
			}
		})(marker, id));

		// Automatically center the map fitting all markers on the screen
		self.map.fitBounds(self.bounds);
	};
	
}

var toScroll = function() {
	this.init = function() {
		$('a[href^="#"]').on('click', function(event) {

			var target = $(this.getAttribute('href'));

			if( target.length ) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top
				}, 1000);
			}
		});
	}
}

var scrollAnimation = new toScroll();
scrollAnimation.init();

