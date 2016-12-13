var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/memory-lane-app');


module.exports.User = require('./user');
module.exports.Story = require('./story');