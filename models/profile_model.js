var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProfileSchema = new Schema({
	 name        :  {type : String, default : '', trim : true}
  ,  info        :  {type : String, default : '', trim : true}
  ,  earned_badges : [{type : Schema.ObjectId, ref : 'EarnedBadge'}]
  ,  image: {type : String, default : '', trim : true}
});


mongoose.model('Profile', ProfileSchema);
