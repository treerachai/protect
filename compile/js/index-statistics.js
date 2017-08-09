define( function( require, exports, module ) {
	var charts  = require( 'index-charts' ),
		COMMON_FUN = require( 'common' ),
		CONST   = require( 'const' );

	/*************************************************************************/
	//绘制统计图表对象
	var statistics = ( function() {
		var timeSpace = 10000,
			hasInit = false,
			$abnormalPie,
			$abnormalLine,
			$vulBar,
			$vulPie,
			ret;

		//暂无数据
		function setNoData( $dom ) {
			$dom.html( '<div class="no-data"><i class="fa fa-exclamation-circle"></i><span class="content">暂无数据</span></div>' );
		}
		//请求统计数据
		function requestData( successCb, cb ) {
			$.ajax( {
				url: CONST.ADMIN + '/statistics',
				dataType: 'JSON'
			} ).then( function( json ) {
				var finalPortList = [];

				if( json.bizNo > 0 ) {
					successCb && successCb( json );
				}
			} ).always( function() {
				cb && cb();
			} )
		}

		//更新图表信息
		function updateChart( data ) {
			var color = [ '#36c6d3', '#659be0', '#ed6b75', '#8775a7' ],
				temp;

			//异常类型分布饼图
			temp = data.abnormal.abnormalStyleList;
			if( temp.length > 0 ) {
				charts.drawPie( 'abnormalPie', temp, color, '异常类型' );
			} else {
				setNoData( $abnormalPie );
			}

			//异常分布折线图
			temp = data.abnormal.abnormalNumList;
			if( temp.length > 0 ) {
				charts.drawPie( 'abnormalLine', formatData( formatDate( temp ), 'line' ), color, '异常类型' );
			} else {
				setNoData( $abnormalLine );
			}

			//漏洞类型柱状图
			temp = data.vul.vulStyleList;
			if( temp.length > 0 ) {
				charts.drawPie( 'vulBar', formatData( temp, 'bar' ), color, '异常类型' );
			} else {
				setNoData( $vulBar );
			}

			//漏洞等级饼图
			temp = data.vul.vulGradeList;
			if( temp.length > 0 ) {
				charts.drawPie( 'vulPie', temp, color, '异常类型' );
			} else {
				setNoData( $vulPie );
			}
		}

		//将原始数据中unix时间戳转为yyyy-mm-dd格式
		//默认日期字段的key值为date
		function formatDate( data ) {
			return data.map( function( item ) {
				return {
					name: COMMON_FUN.formateDate( data.date, 'YYYY-MM-DD' ),
					value: data.value
				}
			} )
		}

		//格式化折线或者柱状图数据
		function format( data, type ) {
			var hasInit = false,
				ret = {
					xAxis: [],
					series: {
						type: type,
						data: []
					}
				};

			data.foreach( function( item ) {
				ret.xAxis.push( item.name );
				ret.series.data.push( item.value );
			} )

			return ret;
		}

		ret = {
			init: function() {
				if( !hasInit ) {
					hasInit = true;

					$abnormalPie = $( '#abnormalPie' );
					$abnormalLine = $( '#abnormalLine' );
					$vulBar = $( '#vulBar' );
					$vulPie = $( '#vulPie' );

					requestData( function( json ) {
						//更新图表信息
						updateChart( json );
					} );
				}
			},
			setTimeUpdate: function() {
				setTimeout( function request() {
					requestData( function( json ) {
						//更新图表信息
						updateChart( json );
						setTimeout( request, timeSpace );
					} );
				}, timeSpace )
			}
		};
		return ret;
	} )();

	module.exports = statistics;

} );


