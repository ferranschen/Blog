// 引入
const express = require('express');
	  app 	  = express(),
	  bodyParser = require('body-parser'),
	  sanitizer = require('express-sanitizer'),
	  methodOverride = require('method-override');



// 參數設定
// ---------------------------------------------------------
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(sanitizer());
app.set("view engine", "ejs");
// mongoose.connect('mongodb://localhost/restful_blog_app', {
//   useMongoClient: true,
//   /* other options */
// });

// ---------------------------------------------------------
const port = process.env.PORT || 3000,
	  ip   = process.env.IP || '127.0.0.1';
// ---------------------------------------------------------


// root
app.get("/", (req, res) => {
	res.redirect("/blogs");
});
// 部落格主頁面
app.get("/blogs", (req, res) => {
	res.render('home');
});


app.listen(port, function(){
   console.log(`Blog server is listening on ${port}`); 
});