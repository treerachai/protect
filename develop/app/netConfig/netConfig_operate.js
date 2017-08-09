define(function(require, exports, module) {
	var Pop = require( 'pop' );
	var CONST = require('const');
	var pop = new Pop( $( '#popModal' ) );

	var netConfig = {
		init: function( $par, netConfig ) {
			var $par,
				$style,
				$ip,
				$netmask,
				$gateway,
				$dns1,
				$dns2,
				$loading,
				$noDhcpPar, 		//dhcp时不需要填写的字段父元素
				$noDhcp,   	 		//dhcp时不需要填写的字段
				$submit,    		//编辑状态下的"确定"按钮
				$cancel,  			//编辑状态下的"取消"按钮
				$edit,         		//表单中的"编辑"按钮
				preNetconfig,
				editState  = -1, 	//编辑状态，-1表示非编辑状态，1表示编辑进行状态
				ret;

			preNetconfig = netConfig;

			//初始化变量值
			function initValue() {
				$style   = $par.find( '.dhcpFlag' );
				$ip      = $par.find( 'input[name="ip"]' );
				$netmask = $par.find( 'input[name="netmask"]' );
				$gateway = $par.find( 'input[name="gateway"]' );
				$dns1    = $par.find( 'input[name="dns1"]' );
				$dns2    = $par.find( 'input[name="dns2"]' );
				$loading = $par.find( '.loading' );
				$noDhcpPar = $par.find( '.no-dhcp-wrapper' );
				$noDhcp  = $par.find( '.no-dhcp' );
				$submit  = $par.find( '.edit-ok' );
				$cancel  = $par.find( '.edit-cancel' );
				$edit    = $par.find( '.edit' );

				$.validator.addMethod( "mask", function( value, element, params ) {
					var ipArr      = $ip.val().split( '.' ),
						gateway    = $gateway.val(),
						gatewayArr = gateway .split( '.' ),
						netmaskArr = $netmask.val().split( '.' ),
						len        = 4,
						i          = 0;

					if( gateway  === '' ) {
						return true;
					}
					if( ipArr.length !== len || gatewayArr.length !== len || netmaskArr.length !== len ) {
						return false;
					}
					for( ; i < len; i++ ) {
						if( ( ipArr[ i ] & netmaskArr[ i ] ) !== ( gatewayArr[ i ] & netmaskArr[ i ] ) ) {
							return false;
						}
					}
					return true;
				}, '网关不可达' );

				//初始化表单验证
				$par.validate( {
				    rules: {
				      	ip: {
				        	required: true,
				        	ip: true
				     	},
				     	gateway: {
				        	ip: true,
							mask: true
				     	},
				     	netmask: {
				     		required: true,
				        	ip: true,
				     	},
				     	dns1: {
				     		ip: true
				     	},
				     	dns2: {
				     		ip: true
				     	}
				 	},
				 	ignore: '.ignore'
				} );
			}

			//向表单中填写配置信息
			function fillConfig( config ) {
				$ip.val( config.ip );
				$netmask.val( config.netmask );
				$gateway.val( config.gateway );
				$dns1.val( config.dns1 );
				$dns2.val( config.dns2 || '' );

				if( +config.dhcpFlag === 1 ) {
					$style.val( '1' );
					setDhcp( 1 );
				} else {
					$style.val( '0' );
					setDhcp( 0 );
				}
			}

			//根据标志设置元素禁用状态
			function setDhcp( isDhcp ) {
				if( +isDhcp === 1 ) {
					$noDhcp.attr( 'disabled', 'disabled' );
				} else {
					$noDhcp.removeAttr( 'disabled' );
				}
			}

			//禁止编辑状态
			function disabledEdit() {
				editState = -1;

				$edit.show();
	            $submit.hide();
	            $cancel.hide();

				$style.attr( 'disabled', 'disabled' );
				$noDhcp.attr( 'disabled', 'disabled' );

				removeErrorDom();
			}

			//编辑状态
			function enabledEdit( isDhcp ) {
				editState = 1;

				$edit.hide();
	            $submit.show();
	            $cancel.show();

				$style.removeAttr( 'disabled' );

				setDhcp( isDhcp );
			}

			//移除错误信息元素
			function removeErrorDom(){
				$par.find( 'label.error' ).remove();
			}
			
			//设置网络
			function setNetConfig(){
				if( $par.valid() ){
					$loading.show();
					$submit.attr( 'disabled', 'disabled' );
					$cancel.attr( 'disabled', 'disabled' );

					$.ajax( {
						method  : 'POST',
						url     : 'setNetConfig',
						data    : $par.serialize(),
						dataType: 'JSON'
					} ).then( function( json ) {
						if(json.netConfig) {
							preNetconfig = json.netConfig;

							//填充后台返回的网络配置信息
							fillConfig( preNetconfig );
						}

						if( json.bizNo > 0 ) {
							if( !pop.isShow ) {
								pop.success( CONST.UPDATE_SUCCESS );
							}
							disabledEdit( preNetconfig.dhcpFlag );
						} else {
							if( !pop.isShow ) {
								pop.error( json.bizMsg || CONST.UPDATE_ERROR );
							}
						}
					}, function(){//向后抬发送未成功
						pop.error( CONST.AJAX_ERROR );
					} ).always( function() {
						$submit.removeAttr( 'disabled' );
						$cancel.removeAttr( 'disabled' );
						$loading.hide();
					} )
				}
			}

			initValue();

			fillConfig( preNetconfig );
			disabledEdit();

			//配置方式改变事件
			$style.change( function() {
				removeErrorDom();

				if( $style.val() === '1' ) {
					setDhcp( 1 );
				} else { 
					setDhcp( 0 );
				}
			} );

			//编辑按钮点击事件
	        $edit.click( function(){
	        	if( editState === -1 ) {
	        		enabledEdit( preNetconfig.dhcpFlag ); 
	        	}
	        } );

	        //编辑状态下，确定按钮点击事件(提交按钮点击事件)
	        $submit.click( function() {
	        	if( editState === 1 ){
	        		setNetConfig();
	        	}
			} );
	        
	        //编辑状态下，取消按钮点击事件 
			$cancel.click( function() {
				if( editState === 1 ){ 
				  fillConfig( preNetconfig );
				  disabledEdit();  
				}
			} );
		}
	}

	module.exports = netConfig;
});