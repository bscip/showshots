
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = express();

var DB = require('./util/db.js').DB;
var db = new DB();
db.open();

// all environments
app.set('port', process.env.PORT || 3009);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '/public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ROUTES:
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// API:
app.get('/api/samples', api.find_samples);
app.get('/api/hottt', api.echonest_hottt);
app.post('/api/enas/:name', api.echonest_artist_search);
app.post('/api/sg/:id', api.songkick_gigography);
app.post('/api/imgs/:id', api.flickr_image_search);

app.put('/api/saveArtist', api.save_artist);
app.put('/api/saveShow', api.save_show);
app.put('/api/saveImage', api.save_image);

app.put('/api/findArtists', api.find_artists);
app.put('/api/findShows', api.find_shows);
app.put('/api/findImages', api.find_images);


// redirect back to index (HTML5 hist)
app.get('*', routes.index);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
