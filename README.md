# Show Shots
Simple app for finding concert photos from selected artists.

###### The data comes from a mashup of
* Artist:   [Echo Nest](http://www.echonest.com)
* Concert:  [Songkick](http://www.songkick.com)
* Photos:   [Flickr](http://www.flickr.com)


You'll need to set up your own "secret" api keys in util/secret.js:
```
var Secret = {
  'echonest_api_key':'[YOUR-KEY]',
  'songkick_api_key':'[YOUR-KEY]',
  'flickr_api_key':'[YOUR-KEY]'
};
module.exports = Secret;
```



##### MEAN:  Using [MongoDB](http://www.mongodb.org/), [Express](http://expressjs.com/), [AngularJS](http://angularjs.org/) on a [Node.js](http://nodejs.org/) server.
