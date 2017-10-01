'use strict'

// Express app.
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const ip = process.env.IP || '127.0.0.1';

// Knex Database.
/* const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('./knex')(config); */

// Middleware plugins.
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const hbs = require('hbs');
const fs = require('fs');


// Application Routes.
const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieSession({
    secret: "etasked",
}))
app.use(require('flash')());
app.use(require('./middlewares/auth'));

app.use('/api', routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

// Socket IO
const server = require('./socket/socket.io')(app);

// Initializing application.
server.listen(port, function() {
    console.log('etasked launched using port: ', ip + ':' + port);
});

module.exports = app;
