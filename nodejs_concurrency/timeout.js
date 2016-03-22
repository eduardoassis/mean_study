// Set timeout registers an event handler wich gets called on the next iteration of the event loop

// asynchronous code
setTimeout(function(){
	console.log("In timeout!");
}, 0);

// Gets printed in the current iteration of the event loop
console.log("Not in timeout!"); // synchronous code

// The result printed is:

// Not in timeout!
// In timeout!