/* jslint node: true */
'use strict';

var express         = require('express'),
    expressLess     = require('express-less'),
    http            = require('http'),
    path            = require('path'),
    transformify    = require('transformify'),
    sections        = require('./sections'),
    fs              = require('fs');

var config = require('./config')();

// Session stuff
var passport = require('passport'),
    loginStrategies = require('./sections/login/loginStrategies');
/**
  * Create server
  */
var app = express();

/**
 * Configuration
 */

// all environments

app.set( 'port', process.env.PORT || 4000 );
app.set( 'views', __dirname + '/sections' );
app.set( 'view engine', 'jade' );
app.use( express.bodyParser() );
app.use( express.logger('dev') );
app.use( express.methodOverride() );

/* Paste all the /less folders from sections */
fs.readdirSync( __dirname + '/sections' ).forEach( function ( file ) {
  var filePath = __dirname + '/sections/' + file,
      isDirectory = fs.lstatSync( filePath ).isDirectory();

  if ( isDirectory ) {
    app.use( '/css', expressLess( filePath + '/less' ) );
  }
});
/**/
app.use( express.static( path.join( __dirname, 'public') ) );
app.use( '/vendor', express.static( __dirname + '/bower_components') );


app.use( express.cookieParser() );
app.use( express.cookieSession( {secret: '1234567890QWERTY'} ) );

passport.use( loginStrategies.localStrategy );
passport.serializeUser( loginStrategies.serializeUser );
passport.deserializeUser( loginStrategies.deserializeUser );

app.use( passport.initialize() );
app.use( passport.session() );

app.use( app.router );

sections( app );

// serve index and view partials
app.get( '/', function ( req, res ) {
  var username = '';
  if ( req.user ) {
    username = req.user.username;
  }
  res.cookie('user', JSON.stringify({
    'username': username
  }));
  res.render('_default/index');
});

app.get( /\/html\/([\w\/]+)\.html/, function ( req, res ) {
  var path = req.params[0];
  res.render( path );
});


/*
 * Start Server
 */

http.createServer( app ).listen( config.port, function () {
  console.log('Express app listening on port ' + config.port);
  console.log('APIurl: ' + config.API);
});
