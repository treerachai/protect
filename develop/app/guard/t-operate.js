define( function( require, exports, module ) {

    /*  处理终端设备的添加、修改、删除、查看等操作
     *  添加和修改终端用同一个模态框，根据不同功能禁用掉一些表单输入段
     *  同时改变模态框的标题和确定按钮的功能
    */
    var operate = ( function() {
        var CONST    = require( 'const' ),
            Pop      = require( 'pop' ),
            hasInit  = false,
            pop      = new Pop( $( '#popModal' ) ),       //弹框
            $addBtn  = $( '.add_terminal' ),              //添加终端按钮
            $loading = $( '.terminal-wrapper .loading' ), //加载图标
            $okBtn,             //添加或删除终端设备确定按钮
            successFun, ret, $form,
            $configModal;                                 //配置窗口


        //绑定各种按钮点击事件
        function bindClick() {
            $addBtn.click( function() {
                $okBtn.off().click( function() {
                    if( $form.valid() ) {
                        addTerminal( function() {
                            success && success();
                        } );
                    }
                } );

                resetModal();
                $configModal.modal();
            } )

            $( '#terminal table' ).delegate( 'button', 'click', function() {
                var $this   = $( this ),
                    operate = $this.data( 'operate' ),
                    parData = $this.parent().data();

                if( operate === 'update' ) {
                    $okBtn.off().click( function() {
                        if( $form.valid() ) {
                            updateTerminal();
                        }
                    } );

                    resetModal();
                    $configModal.modal();
                } else if( operate === 'delete' ) {
                    deleteTerminal( parData.id, function() {
                        success && success();
                    } );
                }
            } )
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

        }

        //初始化修改终端模态框
        function initUpdateModal() {

        }

        //初始化表单验证
        function initValid() {
            $form.validate( {
                rules: {
                    id: 'required',
                    ip: {
                        required: true,
                        ip: true
                    },
                    username: 'required',
                    pw: 'required'
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
            init: function( $modal, successCb ) {
                if( !hasInit ) {
                    hasInit      = true;
                    successFun   = successCb;
                    $configModal = $modal;
                    $form        = $configModal.find( 'form' );
                    $okBtn       = $configModal.find( '.ok' );
                    $loading     = $configModal.find( '.loading' );
                    bindClick();
                    initValid();
                }
            }
        };

        return ret;
    } )();

    module.exports = operate;
} );

