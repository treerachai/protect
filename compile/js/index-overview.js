define( function( require, exports, module ) {
	var CONST = require( 'const' );
	/*************************************************************************/
	var overviewObj = ( function() {
		var $terminal = $( '.J-terminal' ),
			$device = $( '.J-device' ),
			$abnormal = $( '.J-abnormal' ),
			$device = $( '.J-device' ),
			hasInit = false,
			ret;

		//更新终端数据
		function updateTerminal( $dom, data ) {
			var percent = getPercent( data.onlineNum / data.termimalNum ) + '%';

			$dom.find( '.J-numbr' ).text( data.termimalNum + ' 台' );
			$dom.find( '.progress-number' ).css( {
				width: percent
			} ).text( percent );
		}

		//更新设备信息
		function updateDevice( $dom, data ) {
			var percent = getPercent( data.legalOnlineNum / data.legalNum ) + '%';

			$dom.find( '.J-numbr' ).text( data.legalNum + ' / ' + data.illegalNum + ' 台' );
			$dom.find( '.progress-number' ).css( {
				width: percent
			} ).text( percent );
		}

		//更新异常设备
		function updateAbnormal( $dom, data ) {
			var percent = getPercent( data.abnormalDeviceRate / data.abnormalNum );

			$dom.find( '.J-numbr' ).text( data.abnormalNum + ' 次' );
			$dom.find( '.progress-number' ).css( {
				width: percent
			} ).text( percent );
		}
		
		//更新漏洞设备
		function updateVul( $dom, data ) {
			var percent = getPercent( data.vulDeviceRate / data.vulNum );
			
			$dom.find( '.J-numbr' ).text( data.vulNum + ' 个' );
			$dom.find( '.progress-number' ).css( {
				width: percent
			} ).text( percent );
		}

		/*
		 * 将小数转为百分数
		 * @param: data-待转换数据，dotNum-小数点位数
		*/
		function getPercent( data, dotNum ) {
			dotNum = dotNum || 0;
			return ( data * 100 ).toFixed( dotNum );
		}

		function requestData( successCb, cb ) {
			$.ajax( {
				url: CONST.ADMIN + '/overview',
				dataType: 'JSON'
			} ).then( function( json ) {
				if( json.bizNo > 0 ) {
					successCb && successCb( json );
				}
			} ).always( function() {
				cb && cb();
			} );
		}

		function updateData( data ) {
			updateTerminal( $terminal, data.terminal );
			updateDevice( $device, data.device );
			updateAbnormal( $abnormal, data.abnormal );
			updateVul( $vul, data.vul );
		}

		ret = {
			init: function() {
				if( !hasInit ) {
					hasInit = true;

					requestData( function( data ) {
						//更新统计数据
						updateData( data );
					} );
				}
			},
			setTimeUpdate: function() {
				setTimeout( function request() {
					requestData( function( intrusionList ) {
						updateData( data );
						setTimeout( request, timeSpace );
					} );
				}, timeSpace );
			}
		};

		return ret;
	} )();

	module.exports = overviewObj;

} );


