var mongoose = require('mongoose');

var productSchem = require('./user');

var User = mongoose.model('User', schema);

var user = new User({
	profile: {
		username: 'vkaporv15'
	}
});

modifyUserProfile(user, {
	picture: 'http://pbs.twing.com/profile_images/550304223036854272/Wwmwuh2t.png'
});


// modifyYserProfile can **only** modify user.profile, not user.data

function modifyUserProfile(user, profile, callback) {
	user.profile = profile;
	user.save(function(error, user){
		// handle result
	});
}