'use strict';

var React = require( 'react' );
var Reflux = require( 'reflux' );
var CropStore = require( './crop-store' );
var urlCreator = window.URL || window.webkitURL || window;

var Cropper = module.exports = React.createClass({
	mixins: [ Reflux.connect( CropStore )],

	componentWillUpdate: function() {
		// Release image data before replacing it to prevent a browser filesystem memory leak
		if( this.state && this.state.originalImageURL && urlCreator.revokeObjectURL ) {
			urlCreator.revokeObjectURL( this.state.originalImageURL );
		}
	},

	componentDidUpdate: function() {
		// Save object URL so that we can release it later
		this.state.originalImageURL = urlCreator.createObjectURL( this.state.blob );

		var ctx = this.refs.canvas.getDOMNode().getContext( '2d' );
		var image = new Image();
		image.src = this.state.originalImageURL;

		image.onload = function() {
			ctx.drawImage( image, 0, 0 );
		}.bind( this );
	},

	render: function() {
		return (
			<div>
				<img src={ this.state.originalImageURL }/>
				<canvas ref="canvas" className = 'crop-canvas' />
			</div>
		);
	}
});
