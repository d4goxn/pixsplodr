'use strict';

var React = require( 'react' );
var Reflux = require( 'reflux' );
var Cropper = require( './cropper' );
var FileSelector = require( './file-selector' );
var EditorStore = require( './editor-store' );
var actions = require( './actions' );

var App = module.exports = React.createClass({
	mixins: [ Reflux.connect( EditorStore )],

	render: function() {
		return (
			<div>
				<h1>pixsplodr</h1>
				<h2>{ this.state.article? this.state.article.slug: null }</h2>
				<p>{ this.state.error }</p>
				<Cropper />
				<FileSelector select={ actions.selectOriginalImage }/>
			</div>
		);
	}
});
