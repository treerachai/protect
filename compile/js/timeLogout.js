define( function( require, exports, module ) {
	var CONST = require('const'),
		// Pop = require( 'pop' ), 
		// pop = new Pop( $( '#popModal' ) ),
		COMMON_FUN = require( 'common' );
		
	var timeLogout = ( function() {
		var hasInit = false,
			timeId, ret;

		function start( time ) {
			clearTimeout( timeId );
			timeId = setTimeout( function() {
				location.href = '/logout';
			}, time );
		}

		function renderState( state ) {
			ReactDOM.render(
				React.createElement(StateAndTime, {state: state}),
				document.getElementById( 'stateAndTime' )
			);
		}

		ret = {
			//@param: {number} time
			init: function( time ) {
				//默认是5秒
				var lazyTimeId;
				
				if( !hasInit ) {
					hasInit = true;

					time = time * 1000 || 30 * 60 * 1000;
					$( document ).on( 'mousemove click', function() {
						//mousemove会多次触发，出于性能考虑过1秒后再重新计时
						//触屏设备没有mousemove事件，所以加入了click事件
						clearTimeout( lazyTimeId );
						lazyTimeId = setTimeout( function() {
							start( time );
						}, 1000 );
					} );

					//定时请后台发送请求，重置session空闲时间为0
					//防止页面没有与后台通信（但用户有滑动鼠标等操作）而session过期
					//页面加载就请求一次
					setTimeout( function resetSessionTime() {
						$.ajax( {
							method: 'GET',
							url: '/systemStatus'
						} ).then( function( json ) { 
							if( json.bizNo > 0 ) {
								renderState( json );
							} else {
								// if( !pop.isShow ) {
								// 	//pop.error( CONST.AJAX_ERROR );
								// }
							}
						} ).always( function() {} );
						
						setTimeout( resetSessionTime, 5 * 1000 );
					}, 0 );
				}
			}
		};

		return ret;
	} )();

	/*+#+
	 *1.计算时间+1秒是js完成的；
	 *2.每个五秒重新接受this.props.state用来更新notice，不包括没有时间
	 */
	var StateAndTime = React.createClass( {displayName: "StateAndTime",
		getInitialState: function() {
			return {
				startTime: this.props.state.nowTime
			};
		},
		componentDidMount: function() {
			var that = this,
				timeSpace = 1000;

			setTimeout( function count() {
				that.setState( {
					startTime: that.state.startTime + timeSpace
				} );
				setTimeout( count, timeSpace );
			}, timeSpace );
		},
	  	render: function() {
	  		var stateDes = '',
	  			stateClass = '',
	  			startTime = this.state.startTime,
	  			state = this.props.state,
	  			noticeList,
	  			week = '';

	  		noticeList = this.props.state.storageCondition.map(function(notice, index) {
	  			return React.createElement("li", {key: index}, index + 1 + '. ' + notice);
	  		})

	  		switch( state.status ){
				case -1:
					stateDes = '有终端未接入';
					stateClass = 'warning';
					break;
				case 1:
					stateDes = '正常运行';
					stateClass = 'success';
					break;
				default:
					break;
			}
			switch( new Date( startTime ).getDay() ){
				case 1:
					week = '星期一';
					break;
				case 2:
					week = '星期二';
					break;
				case 3:
					week = '星期三';
					break;
				case 4:
					week = '星期四';
					break;
				case 5:
					week = '星期五';
					break;
				case 6:
					week = '星期六';
					break;
				case 0:
					week = '星期日';
					break;
				default:
					break;
			}

	  		return  React.createElement("div", {className:  'm-state '+stateClass}, 
	  					React.createElement("div", {className: "notice-wrap"}, 
							React.createElement("ul", {className: "notice-par", style: {'animationDuration': noticeList.length * 3 + 's'}}, 
								noticeList
							)
						), 
	  					React.createElement("span", {className: "dot"}), 
	  					React.createElement("span", {className: "des"}, stateDes), 
	  					React.createElement("span", {className: "time"}, COMMON_FUN.formateDate(startTime,'YYYY-MM-DD hh:mm:ss')+' '+week)
	  				);
		}
	} );

	module.exports = timeLogout;

} );