
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3009);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ROUTES:
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// API:
app.get('/api/test', api.test);
app.get('/api/testcount', api.testcount);
app.post('/api/enas', api.echonest_artist_search);
app.post('/api/sg', api.songkick_gigography);
app.post('/api/imgs', api.flickr_image_search);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
