var secret = require('./secret.js');
var request = require('request');

var APIFlickr = {};
module.exports = APIFlickr;

APIFlickr.image_search = function (params, cb) {
    var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json';
        url += '&extras=owner_name,url_t,url_s,url_m&media=photos';
        url += '&api_key='+secret.flickr_api_key;
        url += '&min_taken_date='+params.min_time;
        url += '&max_taken_date='+params.max_time;
        url += '&tags='+encodeURIComponent(params.performer+','+params.venue_name);
        url += '&nojsoncallback=1';
    var images = [];
    request.get({url: url, json: true}, function(error, resp, data) {
        data.photos.photo.forEach(function (img, i) {
            var curimg = {
                'url_s':  img.url_s
            };

            images.push(curimg);
        });
        
        cb(JSON.stringify(images));
    });
};
