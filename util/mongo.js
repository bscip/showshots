var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MM = {};
module.exports = MM;
MM.mongoose = mongoose;

// Model Definitions
var Artist = new Schema({
    name:           {type: String, required: true},
    echo_nest_id:   {type: String, required: true},
    songkick_id:    {type: String, required: true},
    created:        {type: Date, default: Date.now, required: true},
    modified:       {type: Date, default: Date.now, required: true}
});

var Show = new Schema({
    songkick_id:            {type: String, required: true},
    songkick_event_id:      {type: String, required: true},
    performers:             {type: String, required: true},
    date:                   {type: Date, required: true},
    datetime:               {type: Date, required: false},
    min_time:               {type: String, required: true},
    max_time:               {type: String, required: true},
    venue_name:             {type: String, required: true},
    country_name:           {type: String, required: true},
    show_details:           {type: String, required: true},
    url:                    {type: String, required: true},
    created:                {type: Date, default: Date.now, required: true},
    modified:               {type: Date, default: Date.now, required: true}
});

var Image = new Schema({
    songkick_id:            {type: String, required : true},
    songkick_event_id:      {type: String, required: true},
    flickr_id:              {type: String, required: true},
    owner:                  {type: String, required: true},
    url:                    {type: String, required: true},
    url_s:                  {type: String, required: true},
    url_m:                  {type: String, required: true},
    url_l:                  {type: String, required: true},
    created:                {type: Date, default: Date.now, required: true},
    modified:               {type: Date, default: Date.now, required: true}
});


// Model Registrations
MM.Artist   = MM.mongoose.model('Artist', Artist);
MM.Show     = MM.mongoose.model('Show', Show);
MM.Image    = MM.mongoose.model('Image', Image);
