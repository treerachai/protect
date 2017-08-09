define( function( require, exports, module ) {
	var getSwitch = require( 'g-clickSwitch' );

    getSwitch( {
        $switch: $( '.illegal_insert .state' ),
        $select: $( '.illegal_insert .select' ),
        change : function( state, successCb ) {
            if( state === 'on' ) {
                //打开开关
                successCb();
            } else {
                //关闭开关
                successCb();
            }
        }
    } );

} );
