const express = require('express'),
	app = express(),
	path = require('path');
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./api/routers/routes');
routes(app);
app.listen(port);

console.log('bc-22-OnlineStore app started on', port);