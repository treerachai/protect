define(function(require, exports, module) {
	var Cards = require('index-react_cards'),
        chart = require('index-chart'),
		timeLogout = require('timeLogout'),
        resize = require('index-resize'),
        audio = require('index-alarm'),
        COMMON_FUN = require('common'),
        timeId = null,
        isStop = false,
        abnormalList = [],
        $abnormal = $('#abnormal');

    (function init() {
        resize.init(function() {
            //renderCharts(statisticData);
        });

        //初始化音频播放器
        audio.init({
            loop: true,
            src: '../public/alarm.wav'
        })

        //开始请求数据
        startRequest();

        //处理异常消息成功
        $('body').on('handleAbnormalSuccess', function() {
            $abnormal.addClass('handled');
            stopRequest();
            startRequest();
        })

        $('body').on('beforeHandleAbnormal', function() {
            stopRequest();
        })

        $('body').on('cancelHandleAbnormal', function() {
            startRequest();
        })

        timeLogout.init();
    })();

    //请求数据
    function startRequest() {
        isStop = false;

        requestData('./statistic', function( data ) {
            chart.draw(data);
            renderNum(data);
            renderList('abnormal', data.abnormalList);
        }, function _loop() {
            if(!isStop) {
                timeId = setTimeout( function () {
                    requestData('./statistic', function(data) {
                        chart.draw(data);
                        renderNum(data);
                        renderList('abnormal', data.abnormalList);
                    }, _loop);
                }, 5000 );
            }
        })
    }

    //停止请求数据
    function stopRequest() {
        clearTimeout(timeId);
        timeId = null;
        isStop = true;
    }
    

    //请求统计数据
    function requestData(url, successCb, alwayseCb) {
        $.ajax({
            url: url,
            dataType: 'JSON'
        }).then(function( json ) {
            var finalPortList = [];

            if(json.bizNo > 0) {
                successCb && successCb(json);
            }
        }).always(function() {
            alwayseCb && alwayseCb();
        })
    }

    //生成或更新异常信息弹框
    function renderList(id, data) {
        if(!COMMON_FUN.isEqualLike(data, abnormalList)){
            if(abnormalList.length === 0 && data.length !== 0) {
                //原来没有弹框，本次重新弹框

                ReactDOM.render(
                    React.createElement(Cards, {data: data}),
                    document.getElementById(id)
                );

                audio.play();
                $abnormal.addClass('new');
            } else if(data.length === 0) {
                //原来有弹框，本次退出弹框
                audio.pause();
                $abnormal.removeClass('new').addClass('fade-out');
            } else{//++else等价abnormalList.length!==0
                //原来有弹框，本次退出再出现弹框
                audio.pause();
                $abnormal.removeClass('new').addClass('fade-out');

                //退出动画需要持续1500毫秒，因此采用定时器延时更新
                setTimeout(function() {
                    audio.replay();
                    $abnormal.removeClass('fade-out handled');

                    ReactDOM.render(
                        React.createElement(Cards, {data: data}),
                        document.getElementById(id)
                    );

                    //如果没有此定时器，不会出现退出又从底部弹出的效果
                    //原因有可能是浏览器为了优化，会把多个class操作都加载完后再渲染
                    setTimeout(function() {
                        $abnormal.addClass('new');
                    }, 10)
                }, 2000);
                
            }
            abnormalList = data;
        }
        
    }

    //渲染设备和威胁数目
    var $deviceAll = $('.s-device .s-all'),
        $deviceOnline = $('.s-device .s-online'),
        $alarmAll = $('.s-alarm .s-all'),
        $alarmUnhandled = $('.s-alarm .s-unhandled');
    function renderNum(data) {
        $deviceOnline.text(data.onlineDeviceNum + '台')
        $deviceAll.text('总设备' + data.allDeviceNum + '台');
        $alarmAll.html(data.allAlarmNum + '个')
        $alarmUnhandled.text('未处理' + data.unhandledAlarmNum + '个');
    }
});