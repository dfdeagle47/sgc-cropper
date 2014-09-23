require.config({
	deps: ['SGCCropper', 'test'],
	shim: {
		
		'jquery': {
			exports: '$'
		},

		'underscore': {
			exports: '_'
		},

		'backbone': {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		'SGCCropper': {
			deps: ['marionette']
		},

		'marionette': {
			exports: 'marionette',
			deps: ['backbone']
		}
	},
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'backbone': '../bower_components/backbone/backbone',
		'underscore': '../bower_components/underscore/underscore',
		'marionette': '../bower_components/marionette/lib/backbone.marionette',

		'mocha': '../node_modules/mocha/mocha',
		'chai': '../node_modules/chai/chai',

		'SGCCropper': '../src/sgc-cropper',

		'test': '../test/test'
	},
	baseUrl: '../src'
});
