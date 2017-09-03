const mongoose 	= require('mongoose');

const postSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	// comments: [{ body: String, date: Date }],
	// tags: [ String ],
	// created: {type: Date, default: Date.now},
	// hidden: Boolean,
	// meta: {
 //    	votes: Number,
 //    	favs:  Number
 //    	}
});

module.exports = mongoose.model('Post', postSchema);

