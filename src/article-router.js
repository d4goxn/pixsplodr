var express = require( 'express' );
var path = require( 'path' );
var os = require( 'os' );
var fs = require( 'fs' );

var articleRouter = module.exports = express.Router();

articleRouter.use( require( 'connect-busboy' )() );

articleRouter.post( '/article', function( req, res, next ) {
	if( !req.busboy ) {
		return next({
			status: 400,
			message: req.method + ' ' + req.path + ': where\'s the beef?'
		});
	}

	req.busboy.on( 'file', function( fieldname, file, filename, encoding, mimetype ) {
		var savePath = path.join( __dirname, '../uploads', path.basename( filename ));
		file.pipe( fs.createWriteStream( savePath ));
	});

	req.pipe( req.busboy );

	// We haven't saved the image yet, but we'll accept it for now and let the client continue while we work.
	res.status( 202 ).send({
		slug: 'ima-article-but-not-really'
	});
});
