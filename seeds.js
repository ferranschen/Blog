const mongoose = require('mongoose');
	  Post 	   = require('./models/post');
	
const data = {
	title: "test",
	image: "https://s-media-cache-ak0.pinimg.com/originals/de/b9/55/deb9557293e145645e9412976a37630d.png",
	body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
};  
function seedDB() {
	for(var i = 0; i < 10; i++){
	data.title += "1";
 	Post.create(data, (err, post) => {
        if (err) {
            console.log('錯誤訊息：', err.message);
        } else {
            console.log("A NEW POST ADDED.");
        }
    });
 } 
}

module.exports = seedDB;