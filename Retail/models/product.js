var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

var productSchema = {
	name: {
		type: String,
		required: true
	},
	pictures: [
		{
			type: String,
			match: /^http:\/\//i
		}
	],
	price: {
		amount: {
			type: Number,
			required: true,
			set: function(value) {
				this.internal.approximatePriceUSD = value / (fx()[this.price.currency] || 1);
				return value;
			}
		},
		currency: {
			type: String,
			enum: ['USD', 'EUR', 'GBP'],
			required: true,
			set: function(value){
				this.internal.approximatePriceUSD = this.price.amount / (fx()[value] || 1);
				return value;
			}
		}
	},
	category: Category.categorySchema,
	internal: {
		approximatePriceUSD: Number
	}
};

var schema = new mongoose.Schema(productSchema);

var currencySymbols = {
	'USD': '$',
	'EUR': '€',
	'GBP': '£'
};

schema.virtual('displayPrice').get(function(){
	return currencySymbols[this.price.currency] + '' + this.price.amount; 
});

schema.set('toJSON', {virtuals : true});
schema.set('toObject', {virtuals : true});

module.exports = schema;
module.exports.productSchema = productSchema;