var express = require( 'express' );
var morgan = require( 'morgan' );
var compression = require( 'compression' );
var path = require( 'path' );

var app = express();

app.use( morgan( 'dev' ));
app.use( compression() );

app.use( express.static(
	path.join( __dirname, '../static' ),
	{ maxage: 1 }
));

app.use( require( './article-router' ));
app.use( require( './error-router' ));

var port = process.env.PORT || 3000;

app.listen( port, function( error ) {
	console.log( 'Listening on port', port );
});
