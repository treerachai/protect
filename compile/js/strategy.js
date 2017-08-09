define( function( require, exports, module ) {
	var communicationList = require( 'strategy-private-list' ),
		baseObj = require( 'strategy-b-operate' ),
		timeLogout = require( 'timeLogout' );

	//communicationList.init();
	baseObj.init();
	timeLogout.init();
} );
