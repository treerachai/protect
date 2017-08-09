define( function( require, exports, module ) {

    var CONST = require( 'const' ),
        Pop   = require( 'pop' ),
        pop   = new Pop( $( '#popModal' ) );   //弹框

    /*
     * 添加和修改用户用两个模态框进行表单填充
    */

    /*
     * 更新用户信息对象
    */
    var updateObj = ( function() {
        var $modal    = $( '#update_modal' ),
            $form     = $modal.find( 'form' ),
            $username = $modal.find( 'input[name=username]' ),
            $pw       = $modal.find( 'input[name=pw]' ),
            $ip1      = $modal.find( 'input[name=ip1]' ),
            $ip2      = $modal.find( 'input[name=ip2]' ),
            $ip3      = $modal.find( 'input[name=ip3]' ),
            $loading  = $modal.find( '.loading' ),
            $okBtn    = $modal.find( '.ok' ),
            success, ret;

        //初始化表单验证
        $form.validate( {
            rules: {
                username: 'required',
                ip1: {
                    ip: true
                },
                ip2: {
                    ip: true
                },
                ip3: {
                    ip: true
                }
            },
            ignore: '.ignore'
        } );

        $okBtn.click( function() {
            if( $form.valid() ) {
                updateUser( function() {
                    success();
                } )
            }
        } )

        //填充表单信息
        function fillInfo( userInfo ) {
            if( userInfo.userType === 'admin' ) {
                $ip1.attr( 'disabled', 'disabled' );
            } else {
                $ip1.removeAttr( 'disabled' );
            }
            $username.val( userInfo.username );
            $ip1.val( userInfo.ip1 || '' );
            $ip2.val( userInfo.ip2 || '' );
            $ip3.val( userInfo.ip3 || '' );
        }

        //更新用户信息
        function updateUser( cb ) {
            $loading.show();

            $.ajax( {
                url: 'updateUser?' + $form.serialize(),
                dataType: 'JSON'
            } ).done( function( json ) {
                if( json.bizNo > 0 ) {
                    cb && cb();
                    $modal.modal('hide');
                    pop.success( CONST.UPDATE_SUCCESS );
                } else {
                    pop.error( json.bizMsg || CONST.UPDATE_ERROR );
                }
            } ).fail( function() {
                pop.error( CONST.AJAX_ERROR );
            } ).always( function() {
                $loading.hide();
            } )
        }

        ret = {
            operate: function( userInfo, successCb ) {
                success = successCb || function() {};
                fillInfo( userInfo );
                $modal.find('label.error').remove();
                $modal.modal();
            }
        }

        return ret;
    } )();

    /*
     * 添加用户信息对象
    */
    var addObj = ( function() {
        var $modal    = $( '#add_modal' ),
            $form     = $modal.find( 'form' ),
            $loading  = $modal.find( '.loading' ),
            $okBtn    = $modal.find( '.ok' ),
            success, ret;

        //初始化表单验证
        $form.validate( {
            rules: {
                username: 'required',
                pw: {
                    required: true,
                    pw: true
                },
                confirmPw: {
                    required: true,
                    pw: true,
                    equalTo: 'input[name="pw"]'
                },
                ip1: {
                    ip: true
                },
                ip2: {
                    ip: true
                },
                ip3: {
                    ip: true
                }
            },
            ignore: '.ignore'
        } );

        $okBtn.click( function() {
            if( $form.valid() ) {
                addUser( function() {
                    success();
                } )
            }
        } )

        //更新用户信息
        function addUser( cb ) {
            $loading.show();

            $.ajax( {
                url: 'addUser?' + $form.serialize(),
                dataType: 'JSON'
            } ).done( function( json ) {
                if( json.bizNo > 0 ) {
                    cb && cb();
                    pop.success( CONST.ADD_SUCCESS );
                } else {
                    pop.error( CONST.ADD_ERROR );
                }
            } ).fail( function() {
                pop.error( CONST.AJAX_ERROR );
            } ).always( function() {
                $loading.hide();
            } )
        }

        ret = {
            operate: function( successCb ) {
                success = successCb;
                $modal.modal();
            }
        }

        return ret;
    } )();

    /*
     * 删除用户信息对象
    */
    var deleteObj = ( function() {
        var $loading = $( '.page-wrapper .loading' ),
            success, ret;

        ret = {
            operate: function( username, successCb ) {
                pop.warning( '是否删除用户' + username + ', 请谨慎操作?' );
                pop.on( '.ok', 'click', function() {
                    pop.hide( function() {
                        $loading.show();

                         $.ajax( {
                            url: 'deleteUser?username=' + username,
                            dataType: 'JSON'
                        } ).done( function( json ) {
                            if( json.bizNo > 0 ) {
                                successCb && successCb();
                                pop.success( CONST.DELETE_SUCCESS );
                            } else {
                                pop.error( json.bizMsg || CONST.DELETE_ERROR );
                            }
                        } ).fail( function() {
                            pop.error( CONST.AJAX_ERROR );
                        } ).always( function() {
                            $loading.hide();
                        } )
                    } )
                   
                } )

                success = successCb;
            }
        }

        return ret;
    } )();

    /*
     * 添加、修改和删除操作对象
    */
    var operate = ( function() {
        var hasInit  = false,
            success, ret;

        //绑定各种按钮点击事件
        function bindClick() {
            // $( '.J-add_user' ).click( function() {
            //     addObj.operate( success );
            // } )

            $( '.J-page-wrap' ).delegate( 'button', 'click', function() {
                var $this   = $( this ),
                    operate = $this.data( 'operate' ),
                    parData = $this.parent().data();

                if( operate === 'update' ) {
                    updateObj.operate( parData, success );
                }
                // else if( operate === 'delete' ) {
                //     deleteObj.operate( parData.username, success );
                // }
            } )
        }

        ret = {
            // successCb： 添加、修改、删除成功后的回调函数
            init: function( successCb ) {
                if( !hasInit ) {
                    hasInit = true;
                    success = successCb;
                    bindClick();
                }
            }
        };

        return ret;
    } )();

    module.exports = operate;
} );

