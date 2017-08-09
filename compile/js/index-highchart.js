define(function(require, exports, module) {
    function drawPie(id, data, colorArray, title) {
        Highcharts.chart(id, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            credits: { //去掉版权信息
                enabled: false
            },
            title: {
                text: title,
                verticalAlign: 'bottom',
                style: {
                    'fontSize': '14px',
                    'fontWeight': 'bold'
                }
            },
            tooltip: {
                formatter: function() {
                    return this.point.name + '占比: <b>' + this.point.percentage.toFixed(2) + '%</b>';
                }
            },
            exporting: {
                enabled:false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            colors: colorArray,
            series: [{
                name: '威胁类型占比',
                data: data
            }]
        });
    }
    
    exports.drawPie = drawPie;
})