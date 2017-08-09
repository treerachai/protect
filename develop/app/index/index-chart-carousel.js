define( function( require, exports, module ) {
    //设置页面中每个表格和图的高度
    var curIndex = 0,
        timeSpace = 2000,
        chart, xLen, cb, timeId;

    carousel = {
        init: function( myChart, length, callback ) {
            clearTimeout( timeId );
            chart = myChart;
            xLen = length;
            cb = callback || function() {};
            play();
            start();
        },
        reset: function() {
            clearTimeout( timeId );
            curIndex = 0;
            start();
        }
    }

    function start() {
        timeId = setTimeout( function() {
            play();
            start();
        }, timeSpace );
    }

    function play() {
        if( xLen <= 0 ) {
            return;
        }

        //xLen是动态改变的，因此需要判断当前播放索引是否超出
        if( curIndex >= xLen ) {
            curIndex = 0;
        }

        showTip( curIndex );
        cb( curIndex );
        curIndex++;
    }

    function showTip( index ) {
        chart.dispatchAction( {
          type: 'showTip',
          // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
          seriesIndex: 1,
          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
          dataIndex: index
            // 可选，数据名称，在有 dataIndex 的时候忽略
            //name?: string
        } );
    }

    module.exports = carousel;
} );