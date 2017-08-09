define( function( require, exports, module ) {
    //@param {domElement} dom 画图容器DOM元素
    //@param {array} data 数据list,格式为[{name:'',value:''}]
    //@return: null
    function drawPie( dom, data, colorArray, title ) {
        if( !dom || dom.nodeType !== 1 || typeof data !== 'object' ) {
            return false;
        }
        var myChart = echarts.init( dom ),
            option = {
                title : {
                    text: title || '',
                    bottom: -5,
                    left:'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bolder',
                        color: '#333'
                    }
                },
                color: colorArray || [ '' ],
                tooltip : {
                    trigger: 'item',
                    //formatter: "{a} <br/>{b} : {c} ({d}%)"
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left'
                },
                toolbox: {
                    show : false,
                },
                calculable : true,
                animation: false,
                series : [
                    {
                        name: name,
                        type:'pie',
                         itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: "{b}:{c}",
                                    //position: 'inner'
                                },
                                labelLine: {
                                    show: true,
                                    lineStyle: {
                                        color: 'red'
                                    }
                                }
                            }
                        },
                        radius : '56%',
                        center: ['50%', '48%'],
                        data: data
                    }
                ]
            };

        myChart.setOption(option);
    }

    //@param {string} id 画图容器DOM的id
    //@param {object} data 数据list,格式为{xAxis:[],series:[{name: , type: , data: }]}
    //@return: null
    function drawColumn( dom, data, colorArray, title ) {
        var myChart = echarts.init( dom ),
            option = {
                title : {
                    text: title || '',
                    bottom: -5,
                    left:'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bolder',
                        color: '#333'
                    }
                },
                tooltip : {
                    trigger: 'axis'
                },
                color: colorArray,
                legend: {
                },
                toolbox: {
                },
                calculable : true,
                animation: false,
                //position:'top', //x轴坐标位置
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '3%',
                    bottom: '18%',
                    containLabel: true
                },
                yAxis : {
                    type : 'value',
                    splitNumber: 3
                },
                xAxis : {
                    type: 'category',
                    data:  data.xAxis,
                    axisLabel:{
                        interval: 0,
                        rotate: 10
                    }
                },
                series : data.series
            };

        myChart.setOption(option);
    }

    /*
     * @param {option}  object {
                            dom: {domElement} 绘图元素dom引用,
                            title='': {string} 标题
                            xAxis: {array} x轴数据,
                            xAxisName='': {string} x轴名称,
                            yAxisName='': {string} y轴名称,
                            colorArray=['#32c5d2']: {array} 画图用的颜色,
                            boundaryGap=false: {boolean},
                            series: {array} 数据
                        }
    */
    function drawBarOrLine( option ) {
        if( !option || !option.dom || !option.xAxis || !option.series ) {
            return false;
        }

        var myChart = echarts.init(option.dom),
            option = {
                title: {
                    text: option.title || '',
                    bottom: -5,
                    left:'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bolder',
                        color: '#333'
                    }
                },
                animation: false,
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '3%',
                    bottom: '18%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: option.boundaryGap || false, //控制x轴间隔的
                    data: option.xAxis,
                    name: option.xAxisName || ''
                    // axisLabel:{
                    //     interval: 0,
                    //     rotate: 30
                    // }
                },
                color: option.colorArray || [ '#32c5d2' ],
                yAxis: {
                    type: 'value',
                    name: option.yAxisName || '',
                    splitNumber: 3
                },
                series: option.series
            };
        myChart.setOption( option );

        return myChart;
    }

    module.exports = {
        drawPie: drawPie,
        drawColumn: drawColumn,
        drawBarOrLine: drawBarOrLine
    }
} );

