var mongoose = require('mongoose');
var productSchema = require('./models/product');

var Product = mongoose.model('Product', productSchema);

var p = new Product({
  name: 'test',
  price: {
    amount: 5,
    currency: 'USD'
  },
  category: {
    name: 'test'
  }
});

p.price.amount = 20;
console.log(p.displayPrice); // "$20"

// { ... "displayPrice": "$20", ... }
console.log(JSON.stringify(p));

var obj = p.toObject();
console.log(obj.displayPrice); // "$20"

// { ... "displayPrice": "$20", ... }
console.log(JSON.stringify(obj));


console.log('approximatePriceUSD --------------'); // 5

p.price.amount = 88;
console.log(p.internal.approximatePriceUSD); // 88

p.price.currency = 'EUR';
console.log(p.internal.approximatePriceUSD); // 80
p.price.amount = 11;
console.log(p.internal.approximatePriceUSD); // 10