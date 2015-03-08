'use strict';

var React = require( 'react' );
var actions = require( './actions' );

var Uploader = module.exports = React.createClass({
	setFile: function( event ) {
		actions.selectOriginalImage( event.target.files[0] );
	},

	render: function() {
		return (
			<input type="file" onChange={ this.setFile } />
		);
	}
});
