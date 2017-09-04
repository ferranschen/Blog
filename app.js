// 引入modules
// ---------------------------------------------------------
const express = require('express');
	  app 	  = express(),
	  bodyParser = require('body-parser'),
	  sanitizer = require('express-sanitizer'),
	  methodOverride = require('method-override'),
	  mongoose 		 = require('mongoose'),
	  mongoose.Promise = require("bluebird"),
	  seedDB 		 = require('./seeds'),
	  Post 			 = require('./models/post');



// seedDB();
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
// 定義分頁的參數
// ---------------------------------------------------------

const perPage = 7; // 一頁最多可顯示的post數量
// var curPage = 0;

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
// 部落格主頁面/不同分頁的routing
// ---------------------------------------------------------
app.get("/posts", (req, res) => {

	const curPage = 0;
		var nPage;
		// 計算文章總數
		Post.count({}, function(err, count){
			if (err) {
				console.log('錯誤訊息：', err.message);
				res.redirect("back");
			} else {
	    		// 計算所有頁數
	    		nPage = Math.floor(count / perPage);

	    	}
		});
		console.log(pageCount());
		const query = Post
	    .find()
	    .skip(curPage * perPage)
	    .limit(perPage)
	    .exec( (err, posts) => {
	    	if (err) {
				console.log('錯誤訊息：', err.message);
				res.redirect("back");
			} else {
				if (curPage > nPage || curPage < 0) { //防止手動輸入
    				res.redirect("back");
    			} else {
					res.render('home', {posts:posts, curPage:curPage, nPage:nPage});
				}
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
// Route到某一頁/創建一個post/
// ---------------------------------------------------------

app.post("/posts", (req, res) => {
// 

	if(typeof req.body.page !== undefined && req.body.page !== null) {

		const curPage = Number(req.body.page);
		var nPage;
		// 計算文章總數
		Post.count({}, function(err, count){
			if (err) {
				console.log('錯誤訊息：', err.message);
				res.redirect("back");
			} else {
	    		// 計算所有頁數
	    		nPage = Math.floor(count / perPage);
	    	}
		});
		const query = Post
	    .find()
	    .skip(curPage * perPage)
	    .limit(perPage)
	    .exec( (err, posts) => {
	    	if (err) {
				console.log('錯誤訊息：', err.message);
				res.redirect("back");
			} else {
				if (curPage > nPage || curPage < 0) { //防止手動輸入
    				res.redirect("back");
    			} else {
					res.render('home', {posts:posts, curPage:curPage, nPage:nPage});
				}
			}
	    });
	// 

	} else {
	 	req.body.post.body = req.sanitize(req.body.post.body);
	    console.log(req.body.post);
	    Post.create(req.body.post, (err, post) => {
	        if (err) {
	            console.log('錯誤訊息：', err.message);
	            res.redirect("back");
	        } else {
	            console.log("A NEW POST ADDED.");
	            res.redirect("/");
	        }
	    });
	}
});

// ---------------------------------------------------------
// 觀看單一文章
// ---------------------------------------------------------

app.get("/posts/:id", (req, res) => {

	Post.findById(req.params.id, (err, post) => {
		if (err) {
			console.log('錯誤訊息：', err.message);
            res.redirect("back");
		} else {
            res.render("show", {post:post});
		}
	});
});

// ---------------------------------------------------------
// 得到單一文章的修改表
// ---------------------------------------------------------

app.get("/posts/:id/edit", (req, res) => {
	Post.findById(req.params.id, (err, post) => {
		if (err) {
			console.log('錯誤訊息：', err.message);
            res.redirect("back");
		} else {
            res.render("edit", {post:post});
		}
	});
});

// ---------------------------------------------------------
// 更新單一文章
// ---------------------------------------------------------

app.put("/posts/:id", (req, res) => {
	req.body.post.body = req.sanitize(req.body.post.body);
	Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
		if (err) {
			console.log('錯誤訊息：', err.message);
            res.redirect("back");
		} else {
			res.redirect("/posts/" + req.params.id);
		}
	});
});

// ---------------------------------------------------------
// 刪除單一文章
// ---------------------------------------------------------
app.delete("/posts/:id", (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
			console.log('錯誤訊息：', err.message);
            res.redirect("back");
        } else {
            res.redirect("/");
        }
    });
});

// ---------------------------------------------------------
// 伺服器開始運行
// ---------------------------------------------------------
app.listen(port, () => {
   console.log(`Blog server is listening on ${port}`); 
});









