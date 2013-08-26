var MM = require('../util/mongo');

var Show = new MM.schema({
    songkick_id:            {type: String, required: true},
    songkick_event_id:      {type: String, required: true},
    main_artist:            {type: String, required: true},
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

module.exports     = MM.mongoose.model('Show', Show);
