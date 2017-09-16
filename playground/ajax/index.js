const express = require('express');
const hbs 		= require('hbs');
const bodyParser = require('body-parser')
const app 		= express();


app.set(express.static(__dirname + '/public'));
// app.use(express.static("public"));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
	res.render('home');
});

app.post("/search",(req,res)=>{
	console.log(req.body);
	res.send({
		name:'ajax'
	});
});

app.listen(3000);