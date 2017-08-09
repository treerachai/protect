define( function( require, exports, module ) {
	var Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) );


	/************************表单验证*********************/
 	$.extend($.validator.messages, {
		required: "这是必填字段",
	});
	$( 'form' ).validate( {
	    rules: {
	    	username: 'required',
	    	password: 'required'
	    }
	} );

	/********************被踢出提示*********************/
	if(kickout === '1') {
		pop.error('账号在其它地方登录，您已被迫下线，请检查账号安全!');
	}

} );