var secret = require('./secret.js');
var request = require('request');

var APIFlickr = {};
module.exports = APIFlickr;

APIFlickr.image_search = function (params, cb) {
    var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json';
        url += '&api_key='+secret.flickr_api_key;
        url += '&min_taken_date='+params.min_time;
        url += '&max_taken_date='+params.max_time;
        url += '&tags='+encodeURIComponent(params.performer+','+params.venue_name);
        url += '&extras=url_s,url_m,url_l';
        url += '&per_page=200';
        url += '&media=photos';
        url += '&nojsoncallback=1';

    var images = [];
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
