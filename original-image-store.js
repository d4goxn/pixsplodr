var Reflux = require( 'reflux' );
var actions = require( './actions' );

var OriginalImageStore = Reflux.createStore({
	listenables: actions,

	onFileSelected: function() {

	}
});
