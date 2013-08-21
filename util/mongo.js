var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MM = {};
module.exports = MM;
MM.mongoose = mongoose;

// Model Definitions
var Artist = new Schema({
    name:           {type : String, required : true},
    echo_nest_id:   {type : String, required : true},
    songkick_id:    {type : String, required : true},
    created:        {type: Date, default: Date.now, required: true},
    modified:       {type: Date, default: Date.now, required: true}
});

// Model Registrations
MM.Artist = MM.mongoose.model('Artist', Artist);
