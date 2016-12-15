var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema ({
	street: String,
	city: String,
	monthStart: String,
	monthEnd: String,
	yearStart: Number,
	yearEnd: Number,
	storyBody: String
});

module.exports = mongoose.model('Story', StorySchema);