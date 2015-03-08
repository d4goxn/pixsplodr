'use strict';

var React = require( 'react' );
var actions = require( './actions' );

var FileSelector = module.exports = React.createClass({
	setFile: function( event ) {
		this.props.select( event.target.files[0] );
	},

	render: function() {
		return (
			<input type="file" onChange={ this.setFile } />
		);
	}
});
