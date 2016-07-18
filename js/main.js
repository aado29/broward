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