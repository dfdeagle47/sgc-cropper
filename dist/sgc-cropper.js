define('CropModal',[
], function () {
	

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
			this.close();
		},

		onRender: function () {
			var fr = new FileReader();
			fr.readAsDataURL(this.imageFile);
			var me = this;
			fr.onload = function (evt) {
				me.outlets.img.attr('src', evt.target.result);
			};
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
define('jquery-crop',[
], function () {
	

	$.fn.sgJcrop = function (options) {
		var me = this;
		this.Jcrop(options, function () {
			me.jcrop_api = this;
		});
		this.actualImgWidth = me[0].width;
		this.actualImgHeight = me[0].height;
		this.load(function(){
			me.actualImgWidth = me[0].width;
			me.actualImgHeight = me[0].height;
		});
	};

	$.fn.sgCrop = function (canvas) {
		if (!canvas) {
			return;
		}
		var generatedCanvas = false;

		if(!$(canvas).is('canvas')) {
			var bounds;
			if(canvas instanceof Array) {
				bounds = canvas;
			} else if (canvas <= 1) {
				bounds = [this.actualImgWidth * canvas, this.actualImgHeight * canvas];
			} else {
				bounds = [canvas, canvas];
			}
			canvas = document.createElement('canvas');
			canvas.width = bounds[0];
			canvas.height = bounds[1];
			$(canvas).hide();
			$('body').append(canvas);
			generatedCanvas = true;
		}

		canvas = canvas[0] || canvas;
		var context = canvas.getContext('2d');

		var ratioX = this.actualImgWidth / this.width();
		var ratioY = this.actualImgHeight / this.height();
		
		var x = this.jcrop_api.ui.selection.position().left;
		var y = this.jcrop_api.ui.selection.position().top;
		var width = this.jcrop_api.ui.selection.width();
		var height = this.jcrop_api.ui.selection.height();

		context.drawImage(this[0], x * ratioX, y * ratioY, width * ratioX, height * ratioY, 0, 0, $(canvas).width(), $(canvas).height());
		var base64 = canvas.toDataURL('image/jpeg');

		if (generatedCanvas) {
			canvas.remove();
		}

		return base64;
	};

});


	

define('sgc-cropper',[
	'./CropModal',
	'./jquery-crop'
], function (
	CropModal
	) {
	

	return {
		Cropper: CropModal
	};

});
