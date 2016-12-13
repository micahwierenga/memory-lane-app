var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = mongoose.Schema ({
	street: String,
	zip: Number,
	monthStart: String,
	monthEnd: String,
	yearStart: Number,
	yearEnd: Number,
	storyBody: String
});

module.exports = mongoose.model('Story', StorySchema);