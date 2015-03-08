'use strict';

var React = require( 'react' );
var Cropper = require( './cropper' );
var Uploader = require( './uploader' );

var App = module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<h1>pixsplodr</h1>
				<Cropper />
				<Uploader />
			</div>
		);
	}
});
