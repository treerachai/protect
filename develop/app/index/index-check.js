define( function( require, exports, module ) {
	/*
	 * 检查提示信息和按钮都是动态添加的，所以需要动态绑定按钮点击事件
	 * @param: 添加检测信息和按钮的容器
	*/

	var COMMON_FUN = require( 'common' ),
		CONST      = require( 'const' );

	/*************************************************************************/
	var check = ( function() {
		var timeSpace = 5000,
			hasInit = false,
			state = '',
			$mCheck, $btn, timeId, ret;

		//更新检查状态
		function updateState( checkState ) {
			state = checkState.state;
			//取消按钮绑定事件，因为addCheckHtml会将按钮删除掉，添加新的按钮
			$btn.off();
			addCheckHtml( checkState );
			$mCheck = $par.find( '.m-check' );
			$btn = $par.find( '.m-check button' );
			//重新注册按钮的点击事件
			bindClick();
		}
		
		//绑定$btn点击事件
		function bindClick() {
			$btn.click( function() {
            	toggleCheck();
            } )
		}

		//改变检查状态
		function toggleCheck() {
			if( state === 'running' ) {
				$.ajax( {
					url: CONST.ADMIN + '/stopCheck',
					dataType: 'JSON'
				} ).done( function( json ) {
					if( json.bizNo > 0 ) {
						updateState( checkState );
						clearTimeout( timeId );
					}
				} )
			} else {
				$btn.attr( 'disabled', 'disabled' );
				$.ajax( {
					url: CONST.ADMIN + '/startCheck',
					dataType: 'JSON'
				} ).done( function( json ) {
					if( json.bizNo > 0 ) {
						updateState( checkState );
						setTimeUpdate();
					}
				} ).always( function() {
					$btn.removeAttr( 'disabled' );
				} )
			}
		}

		//定时更新检查状态
		function setTimeUpdate() {
			timeId = setTimeout( function request() {
				requestData( function( checkState ) {
					updateState( checkState );
					timeId = setTimeout( request, timeSpace );
				} );
			}, timeSpace )
		}

		//请求检查状态
		function requestCheckState( successCb ) {
			$.ajax( {
				url: CONST.ADMIN + '/checkState',
				dataType: 'JSON'
			} ).done( function( json ) {
				if( json.bizNo > 0 ) {
					successCb && successCb( json.checkState );
				}
			} );
		}

		//添加检查按钮和文本提示信息
		function addCheckHtml( checkState ) {
			var html = '';

			state = checkState.state;

			if( state === 'running' ) {
				html ='<div class="m-check running">' +
                        '<span class="content"><em class=>' + checkState.progress + '%</em></span>' +
                        '<button class="u-btn">停止检查</button>' +
                      '</div>'
			} else {
				if( checkState.progress < 100 ) {
					html ='<div class="m-check">' +
	                        '<span class="content">上次检查未完成(<em class=>' + checkState.progress + '</em>)</span>' +
	                        '<button class="u-btn_warning">立即检查</button>' +
	                      '</div>'
				} else {
					if( checkState.uncheckedNum > 0 ) {
						html ='<div class="m-check">' +
		                        '<span class="content"><em class=>' + checkState.uncheckedNum + '</em>台设备未检查漏洞</span>' +
		                        '<button class="u-btn_warning">立即检查</button>' +
		                      '</div>'
					} else if( checkState.lastCheckDate > 0 ) {
						html ='<div class="m-check">' +
		                        '<span class="content">上次检查日期<em class="date">' + COMMON_FUN.formateDate( checkState.lastCheckDate, 'YYYY-MM-HH' ) + '</em></span>' +
		                        '<button class="u-btn_warning">立即检查</button>' +
		                      '</div>'
					} else {
						html ='<div class="m-check">' +
		                        '<button class="u-btn_warning">立即检查</button>' +
		                      '</div>'
					}
				}
			}

			$par.html( html );
		}

		ret = {
			init: function( $par ) {
				$par = $( $par );
				if( !hasInit ) {
					//先请求目前的检查状态
					requestCheckState( function( checkState ) {
						updateState( checkState );
	                    hasInit = true;
					} );
				}
			}
		};

		return ret;
	} )();

	module.exports = check;

} );


