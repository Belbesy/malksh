var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EarnedBadgeSchema = new Schema({
	profile : {type : Schema.ObjectId, ref : "Profile"}
	, badge : {type : Schema.ObjectId, ref : 'Badge'}
	, votes_up : {type : Number, default: 0}	
	, votes_down : {type : Number, default: 0}
})


mongoose.model('EarnedBadge', EarnedBadgeSchema);
