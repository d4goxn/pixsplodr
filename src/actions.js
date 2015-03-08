var Reflux = require( 'reflux' );
var request = require( 'popsicle' );

var actions = module.exports = {
	selectOriginalImage: Reflux.createAction({
		preEmit: function( blob ) {
			console.log( 'selectOriginalImage' );
		}
	}),

	createArticleFromOriginalImage: Reflux.createAction({
		asyncResult: true,
		children: [ 'progressed' ],
		preEmit: function( blob ) {
			return request({
				method: 'post',
				url: '/article',
				body: request.form({ 'originalImage': blob })
			});
		}
	}),

	updateOriginalImage: Reflux.createAction({
		asyncResult: true,
		children: [ 'progressed' ],
		preEmit: function( articleSlug, blob ) {
			return request({
				method: 'put',
				url: '/' + articleSlug,
				body: request.form({ 'originalImage': blob })
			});
		}
	}),

	progress: Reflux.createAction({
		preEmit: function( req ) {
			console.log( 'Progress:', req.completed );
		}
	})
};
