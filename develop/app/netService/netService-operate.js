define( function( require, exports, module ) {

    /*  处理终端设备的添加、修改、删除、查看等操作
     *  添加和修改终端用同一个模态框，根据不同功能禁用掉一些表单输入段
     *  同时改变模态框的标题和确定按钮的功能
    */
    var operate = ( function() {
        var CONST      = require( 'const' ),
            Pop        = require( 'pop' ),
            hasInit    = false,
            pop        = new Pop( $( '#popModal' ) ),      //弹框
            $addBtn    = $( '.J-add_terminal' ),           //添加终端按钮
            $loading   = $( '#config .loading' ),          //加载图标
            $modal     = $( '#config' ),
            $title     = $modal.find( '.modal-title' ),
            $form      = $modal.find( 'form' ),
            $id        = $form.find( 'input[name=id]' ),
            $ip        = $form.find( 'input[name=ip]' ),
            $username  = $form.find( 'input[name=username]' ),
            $pw        = $form.find( 'input[name=pw]' ),
            $confirmPw = $form.find( 'input[name=confirmPw]' ),
            $okBtn     = $modal.find( '.ok' ),             //添加或删除终端设备确定按钮
            success, ret,
            $configModal;                                  //配置窗口


        //绑定各种按钮点击事件
        function bindClick() {
            $addBtn.click( function() {
                resetModal();

                $okBtn.click( function() {
                    if( $form.valid() ) {
                        addTerminal( function() {
                            success && success();
                        } );
                    }
                } );

                $title.text( '添加防护终端' );
                $username.val( 'admin' );
                $modal.modal();
            } )

            $( '#terminal table' ).delegate( 'button', 'click', function() {
                var $this   = $( this ),
                    operate = $this.data( 'operate' ),
                    parData = $this.parent().data();

                if( operate === 'update' ) {
                    resetModal();

                    $okBtn.click( function() {
                        if( $form.valid() ) {
                            updateTerminal();
                        }
                    } );

                    fillInfo( parData );
                    $title.text( '修改防护终端' );
                    $modal.modal();
                } else if( operate === 'delete' ) {
                    deleteTerminal( parData.id, function() {
                        success && success();
                    } );
                }
            } )
        }

        //填充修改终端表单
        function fillInfo( terminalInfo ) {
            $id.val( terminalInfo.id ).attr( 'readonly', 'readonly' );
            $ip.val( terminalInfo.ip );
            $username.val( terminalInfo.username ).attr( 'readonly', 'readonly' );
        }

        //添加终端设备
        function addTerminal( successCb ) {
            $loading.show();

            $.ajax( {
                url: 'addTermimal',
                method: 'POST',
                data: $form.serialize(),
                dataType: 'JSON'
            } ).then( function( json ) {
                if( json.bizNo > 0 ) {
                    pop.success( '添加成功!' );
                    successCb && successCb();
                } else {
                    pop.error( '添加失败!' );
                }
            }, function() {
                pop.error( CONST.AJAX_ERROR );
            } ).always( function() {
                $loading.hide();
            } )
        }

        //修改终端设备
        function updateTerminal( ip, successCb ) {
            $loading.show();

            $.ajax( {
                url: 'updateTermimal',
                method: 'POST',
                data: $form.serialize(),
                dataType: 'JSON'
            } ).then( function( json ) {
                if( json.bizNo > 0 ) {
                    pop.success( '添加成功!' );
                    successCb && successCb();
                } else {
                    pop.error( '添加失败!' );
                }
            }, function() {
                pop.error( CONST.AJAX_ERROR );
            } ).always( function() {
                $loading.hide();
            } )
        }

        //重置模态框，
        function resetModal() {
            $id.val( '' ).removeAttr( 'readonly' ).removeClass( 'error' );
            $ip.val( '' ).removeClass( 'error' );
            $username.val( '' ).removeClass( 'error' );
            $pw.val( '' ).removeClass( 'error' );
            $confirmPw.val( '' ).removeClass( 'error' );


            $( 'label.error' ).remove();
            $okBtn.off();
        }

        //初始化修改终端模态框
        function initUpdateModal() {
            $username.attr( 'readonly' );
        }

        //初始化表单验证
        function initValid() {
            //初始化表单验证
            $form.validate( {
                rules: {
                    id: {
                        required: true
                    },
                    ip: {
                        required: true,
                        ip: true
                    },
                    username: {
                        required: true
                    },
                    pw: {
                        required: true,
                        password: true
                    }
                },
                ignore: '.ignore'
            } );
        }

        //删除终端设备
        function deleteTerminal( id , successCb) {
            pop.warning( '是否删除终端设备, 此操作不可撤销, 请谨慎操作!' );
            pop.on( '.ok', 'click', function() {
                $loading.show();
                pop.hide( function() {
                    $.ajax( {
                        url: 'deleteTermimal?id=' + id,
                        dataType: 'JSON'
                    } ).then( function( json ) {
                        if( json.bizNo > 0 ) {
                            pop.success( '删除成功!' );
                            successCb && successCb();
                        } else {
                            pop.error( '删除失败!' );
                        }
                    }, function() {
                        pop.error( CONST.AJAX_ERROR );
                    } ).always( function() {
                        $loading.hide();
                    } )
                } );
            } )
        }
          

        ret = {
            /*
             * $modal: 添加和修改模态框
             * successCb： 添加、修改、删除成功后的回调函数
            */
            init: function( successCb ) {
                if( !hasInit ) {
                    hasInit      = true;
                    success   = successCb;
                    bindClick();
                    initValid();
                }
            }
        };

        return ret;
    } )();

    module.exports = operate;
} );

