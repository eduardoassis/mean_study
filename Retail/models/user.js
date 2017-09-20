var mongoose = require('mongoose');

var userSchema = {

	profile: {
		username: {
			type: String,
			required: true,
			lowercase: true
		},
		picture: {
			type: true,
			required: true,
			match: /^http:\/\//i
		}
	},
	data: {
		oauth:{
			type: String,
			required: true
		},
		cart: [{
			product: {
				// This embed a list of products ID's in the cart
				type: mongoose.Schema.Types.ObjectId
			}
		}],
		quantity: {
			type: Number,
			default: 1,
			min: 1
		}
	}
};

module.exports = new mongoose.Schema(userSchema);