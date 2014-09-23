define([
	'SGCCropper',
	'chai',
	'mocha'
], function (
	SGCCropper
) {
	'use strict';


	var mocha = window.mocha;

	mocha.setup('bdd');
	
	SGCCropper.Cropper;
	
	if (window.mochaPhantomJS) {
		window.mochaPhantomJS.run();
	}
	else {
		mocha.run();
	}
});
