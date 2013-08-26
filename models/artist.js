var MM = require('../util/mongo');

var Artist = new MM.schema();
Artist.add({
    name:           {type : String, required : true},
    echo_nest_id:   {type : String, required : true},
    songkick_id:    {type : String, required : true},
    created:        {type: Date, default: Date.now, required: true},
    modified:       {type: Date, default: Date.now, required: true}
});

module.exports = MM.mongoose.model('Artist', Artist);
