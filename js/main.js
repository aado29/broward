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
			$(animateElements[i]).css('-webkit-transition-delay', delay+'s');
			$(animateElements[i]).css('-moz-transition-delay', delay+'s');
			$(animateElements[i]).css('-o-transition-delay', delay+'s');
			$(animateElements[i]).css('transition-delay', delay+'s');

		}
	}

	function closeAnimate(container) {
		var animateElements = $('.animate', container);
		for (var i = 0; i < animateElements.length; i++) {
			var delay = 0;
			$(animateElements[i]).css('-webkit-transition-delay', delay+'s');
			$(animateElements[i]).css('-moz-transition-delay', delay+'s');
			$(animateElements[i]).css('-o-transition-delay', delay+'s');
			$(animateElements[i]).css('transition-delay', delay+'s');

		}
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
		nav.hide();

		$(window).on('scroll', self.stage);
	}

	self.stage = function() {
		var el = $(self.staticMenu),
			top = parseInt(el.offset().top),
			height = parseInt(el.height()),
			scrollTop = $(document).scrollTop(),
			nav = $(self.fixedMenu);

		nav.hide();


		if ( scrollTop > ( top + height ) ) {
			$(nav).addClass('active');
			nav.show();
		} else {
			nav.hide();
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