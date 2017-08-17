define(function(require, exports, module) {
    /**
     * 引入在页面中初始化的preConfig、fillConfig和setConfig没写完
     * */
    var $par = $( '#netConfig' ),
        editState = -1; //编辑状态，-1表示非编辑状态，1表示编辑进行状态
    var $edit = $par.find(' .edit '),
        $reset = $( '.reset' ),
        $submit = $par.find( '.edit-ok' ),
        $cancel = $par.find( '.edit-cancel' ),
        $input = $par.find( 'input' ),
        $loading = $par.find( '.loading' ),
        CONST = require( 'const' ),
        Pop        = require( 'pop' ),
        pop        = new Pop( $( '#popModal' ) ),
        cfmPop        = new Pop( $( '#confirmModal' ) );
    var preConfig; //当前配置
    //请求最新配置
    function requestConfig() {
        $.ajax( { 
            method  : 'GET',
            url     : 'getAlarmConfig',
            dataType: 'JSON'
        } ).then(function (res) {
            if (res.bizNo > 0) {
                preConfig = res.alarmConf;
                fillConfig(res.alarmConf);
            }
        });
    }
    requestConfig();

    //input的dom映射
    var configDom = { 
        joinConfList:{
            "设备断开网络连接": $("#closeNet"),
            "设备恢复网络连接": $("#openNet"),
            "设备IP地址变化": $("#ipChange"),
            "新设备接入网络": $("#newSet")
        },
        comConfList:{
            "摄像头": $("#camera"),
            "NVR/DVR": $("#NVRDVR"),
            "PC电脑": $("#PC"),
            "其他设备": $("#other-device")
        },
        videoConfList:{
            "新增视频流": $("#create-video"),
            "关闭视频流": $("#close-video")
        },
        netConfList:{
            "网络扫描": $("#net-scan"),
            "口令探测": $("#password-detection"),
            "ARP欺骗": $("#ARP-cheat"),
            "DDoS攻击": $("#DDoS-attack")
        },
        vulConfList:{
            "RTSP缓冲区溢出漏洞探测": $("#RTSP"),
            "特种漏洞探测": $("#leak-detection")
        }
    };
    //设置多选框不可选
    function disabledEdit() {
        editState = -1;

        $edit.show();
        $submit.hide();
        $cancel.hide();

        $input.attr( 'disabled', 'disabled' );
    }

    var preConfig;
    //在配置中填入数据
    function fillConfig(config) {
        $input.prop("checked",false);
        var props = Object.getOwnPropertyNames(config);
        props.forEach(function (list, idx, arr) {
          config[list].forEach(function (item, idx, arr){
            if(configDom[list][item] === undefined) console.log(list,item);
            configDom[list][item].prop("checked",true);
          })
        })
    }

    

    //后台设置配置
    function setConfig() {
        if( $par.find( 'input:checked' ).length > 0 ) {
            $loading.show();
            $submit.attr( 'disabled', 'disabled' );
            $cancel.attr( 'disabled', 'disabled' );

            $.ajax( {
                method  : 'POST',
                url     : 'setAlarmConfig',
                data    : $par.serialize(),
                dataType: 'JSON'
            } ).then( function( json ) {
                if(json.netConfig) {
                    preConfig = json.netConfig;
                    //填充后台返回的网络配置信息
                    fillConfig( preConfig );
                }

                if( json.bizNo > 0 ) {
                    pop.success( CONST.UPDATE_SUCCESS );
                    disabledEdit();
                } else {
                    pop.error( json.bizMsg || CONST.UPDATE_ERROR );
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
  
    //点击编辑按钮
    $edit.click(function() {
        if(editState === -1) {
            editState = 1;
            $edit.hide();
	        $submit.show();
            $cancel.show();
        }
            
        $input.removeAttr("disabled");
    })

    //点击取消按钮
    $cancel.click(function() {
        if(editState === 1) {
            requestConfig();
            disabledEdit();
        }
    })

    //点击确定按钮
    $submit.click(function() {
        if(editState === 1) {
            setConfig();
        }
    })
    
    //重置按钮
    $reset.click(function() {
        cfmPop.sure("是否恢复至默认配置？");
    });

    cfmPop.on( '.ok', 'click', function() {
        cfmPop.hide();
        $.ajax( { 
            method  : 'POST',
            url     : 'resetAlarmConfig',
            dataType: 'JSON'
        } ).then(function (res) {
            if (res.bizNo > 0) {
                requestConfig();
                disabledEdit();
                pop.success( CONST.RESET_SUCCESS );
            }
        },function() {
            pop.error( CONST.RESET_ERROR );
        });
    })
    

    
    
})
