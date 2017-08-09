define( function( require, exports, module ) {
    'use strict';
    /*
     * switch为保留字，请注意命名
     * 开关对象，利用工厂模式创建对象，外部调用无需new
    */
    var Switch = require( 'g-switch' ),
        changeFun, //点击开关需要执行的函数
        switchObj;

    //获取开关对象
    function getSwitch( option ) {
    
        if( !option.$switch || !option.$select ) {
            return null;
        }

        switchObj = new Switch( option );

        changeFun = option.change || function() {
            success();
        };

        //注册开关点击事件
        option.$switch.click( function() {
            changeFun( option.state, success );
        } );

        return switchObj;
    }

    //请求成功后回调
    function success() {
        var state = switchObj.state;

        if( state === 'off' ) {
            switchObj.on();
        } else if( state === 'on' ) {
            switchObj.off();
        }
    }

    module.exports = getSwitch;

} );