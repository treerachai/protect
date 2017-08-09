/*
taskChart();
radarChart( riskOpt )
pieChart( styleOpt );
pieChart( vulOpt );
pieChart( osOpt );


drawBar( 'service', {
    'http': 10,
    'ftp': 20,
    'rtsp': 100
} )
*/
function drawCurve( id, data ) {
    var opt = {
            id: id,
            xAxis: [],
            properties: [],
            vuls: []
        },
        i, len;

    for( i = 0, len = data.length; i < len; i++ ) {
    	opt.xAxis.push( formateDate( data[ i ].time, 'YYYY.MM.DD HH:mm:ss' ) );
    	opt.properties.push( data[ i ].properties );
    	opt.vuls.push( data[ i ].vuls );
    }

    var myChart = echarts.init( document.getElementById( opt.id ) );
    var option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['资产数','漏洞数']
        },
        toolbox: {
            show : false,
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : opt.xAxis
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'资产数',
                type:'line',
                stack: '总量',
                data: opt.properties
            },
            {
                name:'漏洞数',
                type:'line',
                stack: '总量',
                data: opt.vuls
            }
        ]
    };          
    myChart.setOption(option);
}




//饼图 data=[{name:'',value:''}]
function drawPie( id, data ) {
    var myChart = echarts.init(document.getElementById( id ));
        option = {
            title : {
            },
            // color:['red', 'green','gray','blueviolet','black'],
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
            series : [
                {
                    name: name,
                    type:'pie',
                     itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'outer'
                            },
                            labelLine: {
                                show: true,
                                lineStyle: {
                                    color: 'red'
                                }
                            }
                        }
                    },
                    radius : '60%',
                    center: ['50%', '60%'],
                    data: data
                }
            ]
        };

    myChart.setOption(option);
}


function drawRadar( id, data ) {
    var key, 

        //雷达图需要的数据格式
        opt = {
            id: id,
            indicator: [],
            data: [ {
                value: []
            } ]
        };
    
    if( data.length === 0 ) {
    	return;
    }

    for( key in data ) {
        opt.indicator.push( {
            text: key,
            max: 100
        } );

        opt.data[ 0 ].value.push( data[ key ] );
    }

    var myChart = echarts.init(document.getElementById( opt.id ));
    var option = {
        title: {
            show: false,
            text: '多雷达图',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'center'
        },
        radar: [
            {
                indicator: opt.indicator,
                center: ['50%','50%'],
                radius: 40
            }
        ],
        series: [
            {
                type: 'radar',
                 tooltip: {
                    trigger: 'item'
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: opt.data
            }
        ]
    };
    myChart.setOption(option);
}

function drawBar( id, data ) {
    var tpl = '<div class="bar right clear">' +
                '<div class="service" title="{{name}}">{{name}}</div>' +
                '<div class="bg">' +
                    '<div class="real" style="width:{{width}}%"><span class="text">{{value}}</span></div>' +
                '</div>' +
            '</div>',
       // data = formatData( data ),
        str = '',
        i, len;

    //sort the data
    data.sort( function( val1, val2 ) {
        return val2.value - val1.value;
    } );


    for( i = 0, len = data.length; i < len; i++ ) {
        str += tpl.replace( /{{name}}/g, data[ i ].name )
                .replace( '{{value}}', data[ i ].value )
                .replace( '{{width}}', parseInt( ( data[ i ].value / data[ 0 ].value ) * 100, 10 ) );
    }

    $( '#' + id ).html( str );
}

//将{"camera":"80"}型的数据，转换为[{name:"camera",value:"80"}]格式的数据
function formatData( orign ) {
    var key,
        result = [];

    if( $.type( orign ) !== 'array' ) {
        return result;
    }

    for( key in orign ) {
        result.push( {
            name: key,
            value: orign[ key ]
        } )
    }

    return result;
}

