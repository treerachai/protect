define( function( require, exports, module ) {
	var Pop = require( 'pop' ),
		timeLogout   = require( 'timeLogout' ),
		pop = new Pop( $( '#popModal' ) );

	var accountConfig = ( function( $par ) {
		var $pw           = $par.find( 'input[name="pw"]' ),
			$newPw        = $par.find( 'input[name="newPw"]' ),
			$confirmNewPw = $par.find( 'input[name="confirmNewPw"]' ),
			$submit       = $par.find( '.submit' ),
			$loading      = $par.find( '.loading' ),
			ret;

		//初始化表单验证
		$par.validate( {
		    rules: {
		      	pw: {
		      		required: true
		      	},
		     	newPw: {
		        	required  : true,
					notEqualTo: '#pw',
					pw: true
		     	},
		     	confirmNewPw  : {
		     		required  : true,
		     		equalTo   : "#newPw",
		        	notEqualTo: '#pw',
		        	pw: true
		     	}
		 	},
		 	ignore: '.ignore'
		} );

		//修改账户信息
		function setAccount(){
			if( $par.valid() ){
				$submit.attr( 'disabled', 'disabled' );
				$loading.show();

				$.ajax( {
					method  : 'POST',
					url     : 'setAccount',
					data    : $par.serialize(),
					dataType: 'JSON'
				} ).then( function( json ) {
					if( json.bizNo > 0 ) {
						if( !pop.isShow ) {
							pop.success( '修改成功!' );
						}
					} else {
						if( !pop.isShow ) {
							pop.error( '修改失败!' );
						}
					}
				} ).always( function() {
					$submit.removeAttr( 'disabled' );
					$loading.hide();
				} )
			}
		}

		ret = {
			init: function() {
				//提交按钮点击事件
				$submit.click( function() {
					setAccount();
				} )
			}
		}
		return ret;
	} )( $( '#accountConfig' ) );


	function init() {

		//账号配置初始化
		accountConfig.init();

		timeLogout.init();
	}

	init();

});
