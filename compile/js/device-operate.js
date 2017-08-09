define( function( require, exports, module ) {
    var operate = ( function() {
        var CONST        = require( 'const' ),
            Pop          = require( 'pop' ),
            pop          = new Pop( $( '#popModal' ) ),  //弹框
            $modal       = $( '#config' ),
            $form        = $modal.find( 'form' ),
            $mac         = $form.find( 'input[name=mac]' ),
            $deviceStyle = $form.find( 'select[name=deviceStyle]' ),
            $brand       = $form.find( 'select[name=brand]' ),
            $par         = $('#configForm'),
            $loading     = $modal.find( '.loading' ),              //加载图标
            $okBtn       = $modal.find( '.ok' ),
            hasInit      = false,
            successFun, ret,selectPerpageNumber,
            $selePerpage = $('.sele-perpage');


        //绑定各种按钮点击事件
        function bindClick() {
            $wrap = $( '.J-page-wrap' );

            //更新设备资产
            $wrap.delegate( '.J-update', 'click', function() {
                var deviceInfo = $( this ).parents( 'td' ).data();
                fillInfo( deviceInfo );

                $modal.modal();
            } )

            $wrap.delegate( '.J-link', 'click', function() {
                var ip = $( this ).parents( 'td' ).data( 'ip' ),
                    mac = $( this ).parents( 'td' ).data( 'mac' );
                //新窗口打开链接
                window.open( 'deviceDetail?&mac=' + mac );
            } )

            //删除按钮点击事件
            $wrap.delegate( '.J-delete', 'click', function() {
                var mac = $( this ).parents( 'td' ).data( 'mac' );

                deleteDevice( mac, function() {
                    successFun();
                } );
            } )

            //为模态框确定按钮绑定事件
            $okBtn.click( function() {

				//初始化表单验证
				$par.validate( {
				    rules: {
				      	deviceStyle: {
				      		required: true
				      	},
				     	brand: {
				        	required: true
				     	},
                        describe: {
                            maxlength: 8
                        }
				 	},
				 	ignore: '.ignore'
				} );
				
				if( $par.valid() ){
					 $loading.show();
               		 $okBtn.attr( 'disabled', 'disabled' );
					 $.ajax( {
		                    url: 'updateDeviceInfo?' + $form.serialize(),
		                    dataType: 'JSON'
		                } ).then( function( json ) {
		                    if( json.bizNo > 0 ) {
		                        successFun();
                                $modal.modal('hide');
		                        pop.success( CONST.UPDATE_SUCCESS );
		                    } else {
		                        pop.error( CONST.UPDATE_ERROR );
		                    }
		                } ).always( function() {
		                    $loading.hide();
		                    $okBtn.removeAttr( 'disabled' );
	                } );
				}
				
            } );

            
            //选择分页时每页显示数目
            $selePerpage.on('change',function() {
                selectPerpageNumber( $(this).children('option:selected').val() );
            })

        }

        //向模态窗口中填写设备详情
        function fillInfo( deviceInfo ) {
            $mac.val( deviceInfo.mac );
            $deviceStyle.val( deviceInfo.devicestyle );
            $brand.val( deviceInfo.brand );
           // $legalState.val( deviceInfo.legalstate );
        }

        //删除设备资产
        function deleteDevice( mac, successCb ) {
            pop.warning( '是否删除设备' + mac + ', 请谨慎操作?' );
            pop.on( '.ok', 'click', function() {
                pop.hide( function() {
                    $loading.show();

                    $.ajax( {
                        url: 'deleteDevice?mac=' + mac,
                        dataType: 'JSON'
                    } ).done( function( json ) {
                        if( json.bizNo > 0 ) {
                            successCb && successCb();
                        } else{
                            pop.error( CONST.DELETE_ERROR );
                        }
                    } ).fail( function() {
                        pop.error( CONST.AJAX_ERROR );
                    } ).always( function() {
                        $loading.hide();
                    } )
                } )
            } )
        }

        ret = {
            /*
             * successCb： 设为合法或非法操作成功后的回调函数
            */
            init: function( successCb , selectPerpageNum ) {
                if( !hasInit ) {
                    hasInit    = true;
                    successFun = successCb || function() {};
                    selectPerpageNumber = selectPerpageNum;
                    bindClick();
                }
            }
        };

        return ret;
    } )();

    module.exports = operate;
} );

