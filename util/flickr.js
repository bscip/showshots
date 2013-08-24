var request = require('request');

// Flickr API module
var APIFlickr = (function () {
    var API_KEY;

    var APIFlickr = function(key) {
        API_KEY = key;
    };

    APIFlickr.prototype.constructor = APIFlickr;

    APIFlickr.prototype.image_search = function (params, cb) {
        var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json';
            url += '&api_key='+API_KEY;
            url += '&min_taken_date='+params.min_time;
            url += '&max_taken_date='+params.max_time;
            url += '&tags='+encodeURIComponent(params.performer+','+params.venue_name);
            url += '&extras=url_s,url_m,url_l';
            url += '&per_page=200';
            url += '&media=photos';
            url += '&nojsoncallback=1';

        var images = [];
        console.log("APIFlickr:  "+url);
        request.get({url: url, json: true}, function(error, resp, data) {
            data.photos.photo.forEach(function (img, i) {
                var curimg = {
                    'songkick_id':  params.songkick_id,
                    'songkick_event_id':  params.songkick_event_id,
                    'flickr_id':  img.id,
                    'owner':  img.owner,
                    'url':  'http://www.flickr.com/photos/'+img.owner+'/'+img.id,
                    'url_s':  img.url_s,
                    'url_m':  img.url_m,
                    'url_l':  img.url_l,
                };

                images.push(curimg);
            });
            
            cb(JSON.stringify(images));
        });
    };

    return APIFlickr;
}());
module.exports = APIFlickr;

