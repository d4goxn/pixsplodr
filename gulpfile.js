'use strict';

var fs = require( 'fs' );
var path = require( 'path' )
var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'gulp-buffer' );
var rev = require( 'gulp-rev' );
var handlebars = require( 'gulp-compile-handlebars' );
var rename = require( 'gulp-rename' );
var transform = require( 'vinyl-transform' );
var sourcemaps = require( 'gulp-sourcemaps' );
var uglify = require( 'gulp-uglify' );
var reactify = require( 'reactify' );

var handlebarsConfig = {
	helpers: {
		assetPath: function( filePath, context ){
			return path.join( context.data.root[ filePath ], 'dist' );
		}
	}
};

gulp.task( 'compile:js', function() {
	var browserifyTransform = transform( function( filename ) {
		return browserify( filename )
			.transform( reactify )
			.bundle();
	});

	return gulp.src( 'src/index.js' )
		.pipe( browserifyTransform )
		.pipe( sourcemaps.init({ loadMaps: true }))
		.pipe( uglify() )
		.pipe( rev() )
		.pipe( gulp.dest( 'static/dist' ));
});

gulp.task( 'compile', [ 'compile:js' ], function() {
	var manifest = JSON.parse( fs.readFileSync( 'rev-manifest.json', 'utf8' ));

	return gulp.src( 'src/index.hbs' )
		.pipe( handlebars( manifest, handlebarsConfig ))
		.pipe( rename( 'index.html' ))
		.pipe( gulp.dest( 'static' ));
});

gulp.task( 'default', [ 'compile' ]);
