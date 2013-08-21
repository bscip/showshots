var MM = require('../util/mongo.js');
var Schema = MM.mongoose.Schema;


var Artist = new Schema();
Artist.add({
    name:           {type : String, required : true},
    echo_nest_id:   {type : String, required : true},
    songkick_id:    {type : String, required : true},
    created:        {type: Date, default: Date.now, required: true}
    modified:       {type: Date, default: Date.now, required: true}
});

MM.Artist = mongoose.model('Artist', Artist);
