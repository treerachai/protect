define( function( require, exports, module ) {
	var COMMON_FUN = require( 'common' );

	function Count( $dom, startTime ) {
		this.$dom = $dom;
		this.startTime = startTime;
		this.currentTime = startTime;
		this.isRunning = false;
		this.timeSpace = 1000;
	}
	Count.prototype = {
		constructor: Count,
		start: function() {
			var that = this,
				time;
			if( !this.isRunning ) {
				this.isRunning = true;
				time = COMMON_FUN.formateDate( this.currentTime, 'YYYY-MM-DD hh:mm:ss' );
				this.$dom.val( time );
				this.timeId = setTimeout( function next() {
					that.currentTime += that.timeSpace;
					time = COMMON_FUN.formateDate( that.currentTime, 'YYYY-MM-DD hh:mm:ss' );
					that.$dom.val( time );
					that.timeId = setTimeout( next, that.timeSpace );
				}, this.timeSpace );
			}
		}
	}

	module.exports = Count;
} );

