define( function( require, exports, module ) {
	var operate   = require( 'audit-operate' ),
		timeLogout = require( 'timeLogout' );

	operate.init();
	timeLogout.init();
} );