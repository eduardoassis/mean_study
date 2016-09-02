var mongoose = require('mongoose');

// For course.js, you will have to fill out the entire course schema. The course schema must have the following fields:

// _id: a string representing the course number, such as "CS-101". Required.
// title: the course's title as a string, such as "Introduction to Computer Science". Required, maximum of 140 characters
// description: a description of the course as a string. Required.
// requirements: an array of course numbers (as strings) representing the courses a student should take before taking this course.


/* Fields that must be in the schema:
 *  _id:          a string representing the course number, such as "CS-101".
 *                Required.
 *  title:        the course's title as a string, such as "Introduction to
 *                Computer Science". Required, maximum of 140 characters.
 *                See http://mongoosejs.com/docs/api.html#schema_string_SchemaString-maxlength
 *  description:  a description of the course as a string. Required.
 *  requirements: an array of course numbers (as strings) representing the courses
 *                a student should take before taking this course.
 */
var schema = new mongoose.Schema({
	_id: { 
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		maxlength: 140 
	},
	description: {
		type: String,
		required: true
	},
	requirements: [{ type: String }]
});

module.exports = schema;
