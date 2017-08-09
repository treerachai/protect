
define( function( require, exports, module ) {

    var CONST = require( 'const' ),
        Pop   = require( 'pop' ),
        pop   = new Pop( $( '#popModal' ) );   //弹框

    /*
     * 添加和修改网段用两个模态框进行表单填充
    */

    /*
     * 更新网段信息对象
    */
    var updateObj = ( function() {
        var $modal       = $( '#update_modal' ),
            $form        = $modal.find( 'form' ),
            $oldNetwork  = $modal.find( 'input[name=oldNetwork]' ),
            $newNetwork  = $modal.find( 'input[name=newNetwork]' ),
            $notes       = $modal.find( 'textarea[name=notes]' ),
            $loading     = $modal.find( '.loading' ),
            $okBtn       = $modal.find( '.ok' ),
            success, ret;

        //初始化表单验证
        $form.validate( {
            rules: {
                oldNetwork: {
                    required: true,
                    ip: true
                },
                newNetwork: {
                    required: true,
                    ip: true
                }
            },
            ignore: '.ignore'
        } );

        $okBtn.click( function() {
            if( $form.valid() ) {
                updateNetSegment( function() {
                    success();
                } )
            }
        } )

        //填充表单信息
        function fillInfo( netSegmentInfo ) {
            console.log(netSegmentInfo)
            $oldNetwork.val( netSegmentInfo.network );
            $newNetwork.val( netSegmentInfo.network );
            $notes.val( netSegmentInfo.notes );
        }

        //更新用户信息
        function updateNetSegment( cb ) {
            $loading.show();

            $.ajax( {
                url: 'updateNetSegment?' + $form.serialize(),
                dataType: 'JSON'
            } ).done( function( json ) {
                if( json.bizNo > 0 ) {
                    cb && cb();
                    pop.success( CONST.UPDATE_SUCCESS );
                } else {
                    pop.error( CONST.UPDATE_ERROR );
                }
            } ).fail( function() {
                pop.error( CONST.AJAX_ERROR );
            } ).always( function() {
                $loading.hide();
            } )
        }

        ret = {
            operate: function( netSegmentInfo, successCb ) {
                success = successCb || function() {};
                fillInfo( netSegmentInfo );
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
                netSegment: {
                    required: true,
                    ip: true
                }
            },
            ignore: '.ignore'
        } );

        $okBtn.click( function() {
            if( $form.valid() ) {
                addUser( function() {
                    success && success();
                } )
            }
        } )

        //添加用户
        function addUser( cb ) {
            $loading.show();

            $.ajax( {
                url: 'addNetSegment?' + $form.serialize(),
                dataType: 'JSON'
            } ).done( function( json ) {
                if( json.bizNo > 0 ) {
                    cb && cb();
                    pop.success( CONST.ADD_SUCCESS );
                } else {
                    pop.error( json.bizMsg || CONST.ADD_ERROR );
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
            operate: function( netSegment, successCb ) {
                pop.warning( '是否删除网段' + netSegment + ', 请谨慎操作?' );
                pop.on( '.ok', 'click', function() {
                    pop.hide( function() {
                        $loading.show();

                        $.ajax( {
                            url: 'deleteNetSegment?netSegment=' + netSegment,
                            dataType: 'JSON'
                        } ).done( function( json ) {
                            if( json.bizNo > 0 ) {
                                successCb && successCb();
                                pop.success( CONST.DELETE_SUCCESS );
                            } else {
                                pop.error( CONST.DELETE_ERROR );
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
            $( '.J-add_ip' ).click( function() {
                addObj.operate( success );
            } )

            $( '.J-page-wrap' ).delegate( 'button', 'click', function() {
                var $this   = $( this ),
                    operate = $this.data( 'operate' ),
                    parData = $this.parent().data();

                if( operate === 'update' ) {
                    updateObj.operate( parData, success );
                } else if( operate === 'delete' ) {
                    deleteObj.operate( parData.network, success );
                }
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

