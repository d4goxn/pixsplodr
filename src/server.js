var express = require( 'express' );
var morgan = require( 'morgan' );
var path = require( 'path' );

var app = express();

app.use( morgan( 'dev' ));

app.use( express.static(
	path.join( __dirname, '../static/dist' ),
	{ maxage: '1m' }
));

app.use( express.static(
	path.join( __dirname, '../static' ),
	{ maxage: 1 }
));

app.listen( process.env.PORT || 3000 );
