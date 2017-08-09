define( function( require, exports, module ) {
    var CONST = require( 'const' ),
        COMMON_FUN = require( 'common' ),
        Pop   = require( 'pop' ),
        pop   = new Pop( $( '#popModal' ) ),
        Table = require( 'strategy-b-react_table' );  //弹框;

    var operate = ( function() {
        var hasInit = false,
            $par = $( '#page-list' ),
            $cancelBtn = $( '.J-base .J-cancel' ),
            $okBtn = $( '.J-base .J-ok' ),
            $editBtn = $( '.J-base .J-edit' ),
            strategyData = {},
            curStrategyData = {},
            isEditing = false, //是否处于编辑状态
            ret;

// strategyData = [
//     { type:'网络攻击', strategy: [{name: '端口扫描', des: 'aaa', alarmLevel: 0},
//                                   {name: '口令皮杰', des: 'bbb' , alarmLevel: 1}] },
//     { type:'通用漏洞探测', strategy: [ {name: '11dd', des: 'ccc', alarmLevel: 2},
//                                     {name: 'dd', des: 'ddd', alarmLevel: 3} ]},
//     { type:'通信审计', strategy: [ {name: '摄像头', des: 'eee', alarmLevel: 3}]}
// ];


        //更新审计规则列表
        function render() {
            ReactDOM.render(
                <Table strategyData={strategyData} isEditing={isEditing}/>,
                document.getElementById( 'page-list' )
            );
        }

        //请求设计规则数据
        function requestStrategy( successCb ) {
            $.ajax( {
                url: 'baseStrategy',
                dataType: 'JSON'
            } ).then( function( json ) {
                if( json.bizNo > 0 ) {
                    successCb && successCb( json.strategy );
                }
            });
        }

        //更新设计规则
        function updateStrategy( successCb ) {         
            $.ajax( {
                url: 'updateBaseStrategy',
                method: 'POST',
                dataType: 'JSON',
                data: { strategy: JSON.stringify( curStrategyData ) }
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

        //禁止select下拉菜单的点击事件
        function disabledSelectClick() {
            var $selects = $( '.bs-select.alarmLevel' );

            $selects.addClass( 'disabled' );
            $selects.on( 'click.drop', function( event ) {
                event.stopImmediatePropagation();
            } );
        }

        //启用select下拉菜单的点击事件
        function enabledSelectClick() {
            var $selects = $( '.bs-select.alarmLevel' );

            $selects.removeClass( 'disabled' );
            $selects.off( 'click.drop' );
        }

        //绑定按钮的点击事件
        function bindClick() {
            $cancelBtn.click( function() {
                //处于编辑状态
                if( isEditing ) {
                    isEditing = false;

                    render();

                    disabledSelectClick();
                    $cancelBtn.hide();
                    $okBtn.hide();
                    $editBtn.show();
                }
            } );

            $editBtn.click( function() {
                //处于编辑状态
                if( !isEditing ) {
                    isEditing = true;

                    render();

                    enabledSelectClick();

                    $cancelBtn.show();
                    $okBtn.show();
                    $editBtn.hide();
                }
            } );

            $okBtn.click( function() {
                //获取当前规则
                curStrategyData = getCurStrategy( strategyData );

                //处于编辑状态
                if( isEditing ) {
                    updateStrategy( function( data ) {
                        isEditing = false;
                        
                        //编辑成功，重新渲染
                        strategyData = curStrategyData;
                        render();

                        disabledSelectClick();
                        $cancelBtn.hide();
                        $okBtn.hide();
                        $editBtn.show();
                    } );
                }
            } );
        }

        //获取当前审计规则
        function getCurStrategy( tplObj ) {
            var resObj = COMMON_FUN.deepCopy( tplObj );

            $par.find( '.bs-select.alarmLevel .dropdown-toggle .pm-option' ).each( function( _, level ) {
                var $this = $( this );
                    posArr = $this.data( 'pos' ).split( '-' ),
                    value = +$this.data( 'value' ); //转为number类型
console.log(value)
                resObj[ posArr[ 0 ] ].checkList[ posArr[ 1 ] ].alarmLevel = value;
            } );

            return resObj;
        }

        ret = {
            init: function() {
                if( !hasInit ) {
                    hasInit = true;

                    requestStrategy( function( data ) {
                        strategyData = data;
                        render();
                    } );
                    
                    bindClick();

                    /*************前端调试使用，与后台合并时请删除****************/
                    // ( function() {
                    //     render();
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