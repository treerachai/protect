define( function( require, exports, module ) {
    var CONST = require( 'const' ),
        COMMON_FUN = require( 'common' ),
        Pop   = require( 'pop' ),
        pop   = new Pop( $( '#popModal' ) ),
        Table = require( 'audit-react_table' );  //弹框;

    var operate = ( function() {
        var hasInit = false,
            $par = $( '#auditItem' ),
            $cancelBtn = $( '.J-cancel' ),
            $okBtn = $( '.J-ok' ),
            $editBtn = $( '.J-edit' ),
            auditData = {},
            curAuditData = {},
            isEditing = false, //是否处于编辑状态
            ret;

// auditData = [
//     { type:'设备审计', typeList: [{scope: '所有设备', rulesList:[ { value:'a1_1', checked: 1 },{ value:'a1_2', checked: 1 } ] , alarmLevel: 0},
//                                   {scope: '所有设备', rulesList:[ { value:'a1_1', checked: -1 } ] , alarmLevel: 1}] },
//     { type:'服务审计', typeList: [ {scope: '11:11dd', rulesList:[ { value:'c1_1', checked: -1 } ] , alarmLevel: 2},
//                                     {scope: '11:11dd', rulesList:[ { value:'c1_1', checked: -1 } ] , alarmLevel: 3} ]},
//     { type:'通信审计', typeList: [ {scope: '摄像头', rulesList:[ { value:'b1_1', checked: 1 },{ value:'b1_2', checked: 1 } ] , alarmLevel: 3}]}
// ];


        //更新审计规则列表
        function renderAudit() {
            ReactDOM.render(
                <Table auditData={auditData} isEditing={isEditing}/>,
                document.getElementById( 'auditItem' )
            );
        }

        //请求设计规则数据
        function requestAudit( successCb ) {
            $.ajax( {
                url: 'auditItem',
                dataType: 'JSON'
            } ).then( function( json ) {
                if( json.bizNo > 0 ) {
                    successCb && successCb( json.audit );
                }
            });
        }

        //更新设计规则
        function updateAudit( successCb ) {        	
            $.ajax( {
                url: 'updateAuditItem',
                method: 'POST',
                dataType: 'JSON',
                data: { audit: JSON.stringify( curAuditData ) }
            } ).then( function( json ) {
                if( json.bizNo > 0 ) {
                    pop.success( CONST.UPDATE_SUCCESS );

                    successCb && successCb();
                } else {
                    pop.error( CONST.UPDATE_ERROR );
                }
            }, function() {
                pop.error( CONST.AJAX_ERROR );
            } );
        }

        //绑定按钮的点击事件
        function bindClick() {
            $cancelBtn.click( function() {
                //处于编辑状态
                if( isEditing ) {
                    isEditing = false;

                    renderAudit();

                    $cancelBtn.hide();
                    $okBtn.hide();
                    $editBtn.show();
                }
            } );

            $editBtn.click( function() {
                //处于编辑状态
                if( !isEditing ) {
                    isEditing = true;

                    renderAudit();

                    $cancelBtn.show();
                    $okBtn.show();
                    $editBtn.hide();
                }
            } );

            $okBtn.click( function() {
                //获取当前规则
                curAuditData = getCurAudit( auditData );

                //处于编辑状态
                if( isEditing ) {
                    updateAudit( function( data ) {
                        isEditing = false;
                        
                        //编辑成功，重新渲染
                        auditData = curAuditData;
                        renderAudit();

                        $cancelBtn.hide();
                        $okBtn.hide();
                        $editBtn.show();
                    } );
                }
            } );
        }

        //获取当前审计规则
        function getCurAudit( tplObj ) {
            var resObj = COMMON_FUN.deepCopy( tplObj );

            $par.find( '.rule-item' ).each( function( _, rule ) {
                var $this = $( rule );
                    posArr = $this.data( 'pos' ).split( '-' ),
                    checked = $this.is( ':checked' ) === true ? 1 : -1;

                resObj[ posArr[ 0 ] ].typeList[ posArr[ 1 ] ].rulesList[ posArr[ 2 ] ] ={
                    checked: checked,
                    value: $this.data( 'text' )
                }
            } )

            $par.find( '.alarmLevel' ).each( function( _, level ) {
                var $this = $( level );
                    posArr = $this.data( 'pos' ).split( '-' ),
                    value = +$this.val(); //转为number类型

                
                resObj[ posArr[ 0 ] ].typeList[ posArr[ 1 ] ].alarmLevel = +value;
            } )

            return resObj;
        }

        ret = {
            init: function() {
                if( !hasInit ) {
                    hasInit = true;

                    requestAudit( function( data ) {
                        auditData = data;
                        renderAudit();
                    } );
                    
                    bindClick();

                    /*************前端调试使用，与后台合并时请删除****************/
                    // ( function() {
                    //     renderAudit();
                    //     console.error( '与后台联调时请删除本段程序！' );
                    // } )();
                    /*************************************************************/
                }
            }
        };

        return ret;
    } )();

    module.exports = operate;
} );