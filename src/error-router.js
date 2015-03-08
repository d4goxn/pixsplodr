var express = require( 'express' );

var errorRouter = module.exports = express.Router();

errorRouter.use( function( req, res, next ) {
	next({
		status: 404,
		message: ( req.path + ', is that even a real thing?' )
	});
});

errorRouter.use( function( error, req, res, next ) {
	res.status( error.status ).send( error.message );
	console.log( error );
});
