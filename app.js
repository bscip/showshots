 // Module dependencies
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');


// Declare and open database instance for app
// Any routes that need to access models should have the instance passed 
var DB = require('./util/db'),
    db = new DB({db_address:'mongodb://localhost/showshots'});
    db.open();

// Open routes for the app
var API = require('./routes/api'),
    api = new API(db);

var app = express();

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
app.get('/api/hottt', api.echonest_hottt);
app.post('/api/enas/:name', api.echonest_artist_search);
app.post('/api/enids/:id', api.echonest_id_search);

app.post('/api/sg/:id', api.songkick_gigography);
app.post('/api/se/:id', api.songkick_event_lookup);

app.post('/api/imgs/:id', api.flickr_image_search);

app.put('/api/saveArtist', api.save_artist);
app.put('/api/saveShow', api.save_show);
app.put('/api/saveImage', api.save_image);

app.post('/api/findArtists', api.find_artists);
app.post('/api/findShows', api.find_shows);
app.post('/api/findImages', api.find_images);

app.get('/api/samples', api.find_samples);


// redirect back to index (HTML5 hist)
app.get('*', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
