var Reflux = require( 'reflux' );
var actions = require( './actions' );
var _ = require( 'lodash' );

var EditorStore = module.exports = Reflux.createStore({
	listenables: actions,

	onSelectOriginalImage: function( blob ) {
		if( this.article && this.article.slug ) {
			return actions.updateOriginalImage( this.article.slug, blob );
		}

		actions.createArticleFromOriginalImage( blob );
	},

	onCreateArticleFromOriginalImage: function( req ) {
		this.onSendUpdate( req );
	},

	onUpdateOriginalImage: function( req ) {
		this.onSendUpdate( req );
	},

	onSendUpdate: function( req ) {
		var self = this;

		req.then( function( res ) {
			console.log( 'sent update, got res' );

			if( res.status == 200 ){
				this.article = _.extend( this.article || {}, res.body ); // Create or extend our article with the returned article
				return self.trigger({
					article: res.body
				});
			}

			self.trigger({
				error: 'upload failed'
			});
		})
		.catch( function( err ) {
			console.log( 'sent update, got err' );
			self.trigger({
				error: err
			});
		});
	},
});
