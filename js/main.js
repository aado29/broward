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

animateClass = function(options) {

	var optns = {
		animateToLeftClass: 'animate-to-left',
		animateToRightClass: 'animate-to-right',
		animateToTopClass: 'animate-to-top',
		animateToBottomClass: 'animate-to-bottom'
	};
	var self = this;

	// this.options = optns;
	this.options = (typeof(options) == 'object') ? options : optns;

	this.stage = function() {

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

animateClass.prototype.init = function() {
	var self = this;
	$(window).on('scroll', self.stage);
}

var animate1 = new animateClass();
animate1.init();





