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

// General CRUD
var apiUrl = config.API,
    Bacon = require('baconjs').Bacon,
    rest = require('restler');

app.put( '/:schema/delete', function ( req, res ) {
  var schema = req.params.schema,
      url = apiUrl.concat(schema + '/delete');

  var bacon = (function() {
    var request = rest.del( url, { data: req.body }  );
    return Bacon.fromEventTarget(request, 'complete');
  }());

  bacon.onValue( function ( data ) {
    res.json( data );
  });
});

app.get( '/:schema', function ( req, res ) {
  var schema = req.params.schema,
      url = apiUrl.concat(schema);

  var bacon = (function() {
    var request = rest.get( url );
    return Bacon.fromEventTarget(request, 'complete');
  }());

  bacon.onValue( function ( data ) {
    res.json(data);
  });
});

app.post( '/:schema', function ( req, res ) {
  var schema = req.params.schema,
      url = apiUrl.concat(schema);

  var bacon = (function() {
    var request = rest.post( url, { data: req.body } );
    return Bacon.fromEventTarget(request, 'complete');
  }());

  bacon.onValue( function ( data ) {
    res.json(data);
  });
});

/**
* @receive req and res
* description: Create a new employee
* @return json with data
*/
app.post( '/:schema/new', function ( req, res ) {
  var schema = req.params.schema,
      url = apiUrl.concat(schema + '/new');
  var bacon = (function() {
    var request = rest.post( url, { data: req.body });
    return Bacon.fromEventTarget(request, 'complete');
  }());

  bacon.onValue( function ( data ) {
    res.json(data);
  });
});

/**
* @receive req and res
* description: Update the data of a Employee
* @return json with data
*/
app.put( '/:schema', function ( req, res ) {
  var schema = req.params.schema,
      url = apiUrl.concat(schema);

  var bacon = (function() {
    var request = rest.put( url, { data: req.body });
    return Bacon.fromEventTarget(request, 'complete');
  }());

  bacon.onValue( function ( data ) {
    res.json(data);
  });
});

/*
 * Start Server
 */

http.createServer( app ).listen( config.port, function () {
  console.log('Express app listening on port ' + config.port);
  console.log('APIurl: ' + config.API);
});
