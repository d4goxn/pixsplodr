var Reflux = require( 'reflux' );
var actions = require( './actions' );

var CropStore = module.exports = Reflux.createStore({
	listenables: actions,

	onSelectOriginalImage: function( blob ) {
		this.trigger({
			blob: blob
		});
	}
});
