// 引入modules
// ---------------------------------------------------------
const express = require('express');
	  app 	  = express(),
	  bodyParser = require('body-parser'),
	  sanitizer = require('express-sanitizer'),
	  methodOverride = require('method-override'),
	  mongoose 		 = require('mongoose');



// ---------------------------------------------------------
// app的參數設定
// ---------------------------------------------------------
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(sanitizer());
app.set("view engine", "ejs");

// ---------------------------------------------------------
// 設定連線的環境變數
// ---------------------------------------------------------

const port = process.env.PORT || 3000,
	  ip   = process.env.IP || '127.0.0.1';

// ---------------------------------------------------------
// post Schema ：定義一個post的結構
// ---------------------------------------------------------

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

const Post = mongoose.model('Post', postSchema);


// ---------------------------------------------------------
// connect to mongodb
// ---------------------------------------------------------
mongoose.connect('mongodb://localhost/post', {
	useMongoClient: true,
  /* other options */
});
// ---------------------------------------------------------





  // ____             _   _             
 // |  _ \ ___  _   _| |_(_)_ __   __ _ 
 // | |_) / _ \| | | | __| | '_ \ / _` |
 // |  _ < (_) | |_| | |_| | | | | (_| |
 // |_| \_\___/ \__,_|\__|_|_| |_|\__, |
                               // |___/ 

// ---------------------------------------------------------
// 主頁面
// ---------------------------------------------------------
app.get("/", (req, res) => {
	res.redirect("/posts");
});
// ---------------------------------------------------------
// 部落格主頁面
// ---------------------------------------------------------

app.get("/posts", (req, res) => {
	Post.find({},(err, posts) => {
		if (err) {
			console.log('錯誤訊息：', err.message);
		} else {
			res.render('home', {posts:posts});
		}
	});
	
});

// ---------------------------------------------------------
// 拿到一個創建表
// ---------------------------------------------------------

app.get("/posts/new", (req, res) => {
    res.render("new");
});

// ---------------------------------------------------------
// 創建一個post
// ---------------------------------------------------------

app.post("/posts", (req, res) => {


 	// req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body.post);

    Post.create(req.body.post, (err, post) => {
        if(err) {
            console.log('錯誤訊息：', err.message);
            res.redirect("back");
        } else {
            console.log("A NEW POST ADDED.");
            res.redirect("/posts");
        }
    });

});



// ---------------------------------------------------------
// 伺服器開始運行
// ---------------------------------------------------------
app.listen(port, () => {
   console.log(`Blog server is listening on ${port}`); 
});