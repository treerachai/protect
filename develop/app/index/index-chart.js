define( function( require, exports, module ) {
	var chart = require( 'index-echarts' ),
        highChart = require('index-highchart'),
		COMMON_FUN = require('common'),
		INDEX_CONST = require('index-const');

    //获取画图区域dom元素的引用
    var typeDom = $('#type-chart')[0],
    	timeDom = $('#time-chart')[0],
    	ipDom = $('#ip-chart')[0],
    	typeList = [],
    	timeList = null,
    	ipList = null,
    	colors = ['#317c7d', '#796d5e', '#9b1e1f', '#ffcc33', '#de573e', '#ff0000'],
    	typeColor = {
    		type1: '#317c7d',
    		type2: '#796d5e',
    		type3: '#9b1e1f',
    		type4: '#ffcc33',
    		type5: '#de573e',
    		type6: '#ff0000'
    	};

    //绘制表格
    //@param {object} data
    function draw(data) {
    	//统计饼图
		if( !COMMON_FUN.isEqualLike(data.type, typeList)) {
			typeList = data.type;

            var typeData = formatPieData(typeList);

            var tColorArr = typeList.map(function(item) {
            	var type = INDEX_CONST.type[item.name];
            	return typeColor[type];
            });

            highChart.drawPie('type-chart', typeData, tColorArr, '威胁类型分布');
        }

    	//时间轴图
        if(!COMMON_FUN.isEqualLike(data.timeList, timeList)) {
        	timeList = data.timeList;

            var timeData = formatBarOrLineData( timeList, 'line', function( name ) {
                return COMMON_FUN.formateDate( name, 'MM-DD' );
            } );

            chart.drawBarOrLine( {
                dom: timeDom,
                title: '每日威胁',
                xAxis: timeData.xAxis,
                colorArray: ['#3399ff'],
                series: timeData.series
            } );
        }

        //异常ip条状图
        if(!COMMON_FUN.isEqualLike(data.ipList, ipList)) {
        	ipList = data.ipList;

        	var iData = formatColumnData(ipList);

            //x轴最少10个ip位，如果不够补齐
            for(var i = 10 - iData.xAxis.length; i > 0 ; i--) {
                iData.xAxis.push('');
            }
            chart.drawColumn(ipDom, iData, colors, '高危设备ip');
        }
  
    }

    //格式化柱状图或折线图数据
    function formatBarOrLineData( data, type, xFun ) {
        var ret;

        //参数初始化
        if( type == null ) {
            type = 'line';
        }
        if( typeof type === 'function' ) {
            type = 'line';
            xFun = type;
        } else 
        xFun = xFun || function( value ) { return value; };

        ret = {
            xAxis: [],//格式化的时间Array
            series: [ {
                name: '异常数',
                type: type,
                smooth: true,
                data:[]
                // markPoint : {
                //     data : [
                //         {type : 'max', name: '最大值'},
                //         {type : 'min', name: '最小值'}
                //     ]
                // },
                // markLine : {
                //     data : [
                //         {type : 'average', name: '平均值'}
                //     ]
                // }
            } ]
        };

        if( !data || !data.length ) {
            return ret;
        }

        data.forEach( function( item ) {
            ret.xAxis.push( xFun( item.name ) );
            ret.series[0].data.push( item.value );
        } )
         return ret;
    }

    //格式化饼图数据
    function formatPieData( data, nameFun ) {
        nameFun = nameFun || function( name ) {
            return name;
        };

        var ret = data.map( function( item ) {
            return {
                name: nameFun( item.name ),
                y: item.value
            }
        } )
        return ret;
    }


    /*
     * 格式化条状图数据
     * @param {array} originData 数据格式: [{name: ,value},...]
     * @param {string} type 图类型: column-柱状图 or bar-条状图
     * 如果每个柱需要单独控制颜色，那么series.data = [{value: ,itemStyle:{normal:{color:'color'}}}]
    */
    function formatColumnData(originData) {
    	var i = 0,
        	ret = {
        		xAxis: [],
        		series: []
        	};

        originData.forEach(function(item) {
        	ret.xAxis.push(item.name);

        	item.value.forEach(function(list, i) {
        		ret.series[i] = ret.series[i] || {
        			name: list.name,
		            type: 'bar',
		            stack: '异常数',
		            label: {
		                normal: {
		                    show: true,
                            textStyle:{
                                color: 'black'
                            },
		                    position: 'insideRight'
		                }
		            },
                    barWidth:40,
		            data: []
        		}

        		ret.series[i].data.push(list.value === 0 ? '-' : list.value);
        	});
        })

    	return ret;
    }

    exports.draw = draw;
} );