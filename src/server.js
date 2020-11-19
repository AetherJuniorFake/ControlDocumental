const express = require('express');
const server = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database');

mongoose.connect(url, {
  useNewUrlParser: true 
});

//require('./config/passport')(passport);
//settings
var port = process.env.PORT || 3000;
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

//middlewares
server.use(morgan('dev'));
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: false}));
server.use(session({
  secret: 'estancias2',
  resave: false,
  saveUninitialized: false
}));
server.use(passport.initialize);
server.use(passport.session());
server.use(flash());

// routes
require('./app/routes')(server, passport);

//static files
server.use(express.static(path.join(__dirname, 'public')));

server.listen(port, function () {
    console.log('Updated : Server listening at port %d', port);
  }); 