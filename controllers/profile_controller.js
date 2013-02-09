var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');
var EarnedBadge = mongoose.model('EarnedBadge');
var Badge = mongoose.model('Badge');


var vote = function(res, earned_badge, vote){
  if(vote==="up"){
    	earned_badge.votes_up += 1;
    	res.send(200, "Successfully voted up!");
    }
    else if(vote==="down"){
    	earned_badge.votes_up += 1;
    	res.send(200, "Successfully voted down!");
    }
    else{
    	res.send(404, "Invalid parameter recieved while voting!");
    }
}
// Create an article
exports.create_profile = function (req, res) {
  //TODO: verify parameters.
  var created_profile = new Profile({name: req.profile_name, info: req.profile_info, image: url});
  
  created_profile.save(function(err){
  	if(err){
  		console.log("Error Saving New Profile");
  		res.send(500, {err: "Error Saving this new profile"})
  	}
  	else
  		console.log("Successfully Saved New Profile");	
  });
}

exports.list_profiles = function(req, res){
	var perPage = 5;
	var page = req.param('page') > 0 ? req.param('page') : 0;

    Profile
    	.find({})
    	.populate('name', 'info')
    	.limit(perPage)
    	.skip(perPage * page)
    	.exec(function(err, returned_profiles){
    		if(err){
    			console.log('500 error');
    			res.send(500, {err : "Error Saving To database"});
    		}
    		else{
    			console.log('Saved!');
    			console.send(200, {profiles : returned_profiles});
    		}
    	});
};


exports.get_profile = function(req, res, next, id){

	Profile
		.find({ _id : id})
		.populate('name', 'info')
		.populate('badges', null, null, { limit: 6})
		.exec(function(err, profile){

		});
}


exports.vote_badge = function(req, res){

	Profile.findOne(
		{_id : req.param("profile_id"},
		function(err, _profile){
			var earned_badges = _profile.earned_badges;
			var earned_badge;
		    for (var i = earned_badges.length - 1; i >= 0; i--) {
		    	if(earned_badges[i].badge.badge_id === req.param("badge_id"){
                  earned_badge = earned_badges[i];
		    	}
		    }

		    if(!earned_badge){
		    	Badge.findOne({_id: req.param("badge")}, function(err, _badge){
		    		if(err){
		    			// badge didn't exist or database error
		    			// TODO check for either errors
		    			res.send(500, "Database Error badge wasn't found");
		    		}
		    		earned_badge = new EarnedBadge({
	    				profile: _profile, 
	    				badge: _badge
		    		});
		    		// add new earned badge to profile 
		    		_profile.earned_badges.push(earned_badge);
		    		// vote and return result
		    		vote(res, earned_badge, req.param("vote"));
		    	})
		    }
		    // badge already exist, vote 
		  	vote(res, earned_badge, req.param("vote"));
		}
	);
}
