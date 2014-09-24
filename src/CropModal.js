define([
], function () {
	'use strict';

	return Backbone.Marionette.ItemView.extend({

		constructor: function(options){
			var res = Backbone.Marionette.ItemView.prototype.constructor.apply(this, arguments);
			this.imageFile = options.image;
			return res;
		},

		//Ui events
		cropImg: function () {
			var base64 = this.outlets.img.sgCrop(300);
			this.trigger('crop', base64);
		},

		onRender: function () {
			var me = this;
			$(this.imageFile).fileUrlToBase64(function(base64){
				me.outlets.img.attr('src', base64);
			});
		},

		imageLoaded: function(){
			var size = 300;
			var diffWidth = Math.max(this.outlets.img.width() - size, 0);
			var diffHeight = Math.max(this.outlets.img.height() - size, 0);
			var x1 = diffWidth / 2,
				x2 = x1 + size,
				y1 = diffHeight / 2,
				y2 = y1 + size;

			this.outlets.img.sgJcrop({
				aspectRatio: 1,
				setSelect: [x1, y1, x2, y2]
			});
		}
	});
});