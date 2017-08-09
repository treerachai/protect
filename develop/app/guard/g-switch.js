define( function( require, exports, module ) {
	'use strict';
	/*
	 * 开关对象，
	*/
	function Switch( option ) {
		this.state = 'off';
		this.$switch = option.$switch;
		this.$select = option.$select;
		this.change = option.change;
	}

	Switch.prototype = {
		constructor: Switch,
		on: function() {
			this.state = 'on';
			this.$switch.removeClass( 'off' ).addClass( 'on' );
			this.$select.removeAttr( 'disabled' );
		},
		off: function() {
			this.state = 'off';
			this.$switch.removeClass( 'on' ).addClass( 'off' );
			this.$select.attr( 'disabled', 'disabled' );
		}
	}

	module.exports = Switch;

} );