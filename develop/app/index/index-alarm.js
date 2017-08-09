define(function(require, exports, module) {

	var _audio = (function() {
		var defaultOptions = {
				src: '',
				loop: false
			},
			audio = new Audio(),
			currentOptions,
			ret;

		function setValue(options) {
			for(var key in options) {
				if(options.hasOwnProperty(key)) {
					audio[key] = options[key];
				}
			}
		}

		ret = {
			init: function(options) {
				currentOptions = Object.assign({}, defaultOptions, options);
				setValue(currentOptions);
			},
			play: function() {
				if(audio.paused) {
					audio.play();
				}
			},
			pause: function() {
				if(!audio.paused) {
					audio.pause();
				}
			},
			replay: function() {
				audio.currentTime = 0;
				audio.play();
			}
		}
		return ret;
	})();

	module.exports = _audio;
})