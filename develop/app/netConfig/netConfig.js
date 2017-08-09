define(function(require, exports, module) {
	var netConfig = require( 'netConfig_operate' );
	var timeLogout = require('timeLogout');

	netConfig.init( $( '#netConfig' ), G.eth0Network );

	netConfig.init( $( '#scanConfig' ), G.eth1Network );

	timeLogout.init();
});