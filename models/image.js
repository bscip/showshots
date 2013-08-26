var MM = require('../util/mongo');

var Image = new MM.schema({
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

module.exports    = MM.mongoose.model('Image', Image);
