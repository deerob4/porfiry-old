var express = require('express');
var app = express();

app.get('/podge/*', function(req, res) {
	res.send('Hello world!');
});

app.listen(5000);
console.log('App listening on port 5000')