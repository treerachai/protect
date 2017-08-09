define( function( require, exports, module ) {
	var deviceList = ( function() {
		/*
		 * COMMON_FUN下有一个分页对象，这是显示页码列表的
		 * 还有一个pagenation.js，这个是封装的用于请求分页数据的对象
		*/
		var Table            = require( 'device-react_table' ), //react组件
			COMMON_FUN       = require( 'common' ),        //公用函数
			CONST            = require( 'const' ),
			Deliver          = require( 'subscribe' ),	   //订阅对象
			devicePub        = new Deliver(),			   //创建订阅对象
			pagenation       = require( 'pagenation' )(),	   //创建分页对象
			$par             = $( '.device-wrapper' ),   //分页信息的父元素
			hasInit          = false,
			timeId = null,
			ret;

			function repaintPage( pageInfo ) {
				ret.pageInfo.currentPage = pageInfo.currentPage;
			    ret.pageInfo.allNum = pageInfo.allNum;

			    if( pageInfo.allNum > pageInfo.perPage ) {
			    	
			    	//重新绘制分页信息
			    	COMMON_FUN.pagenation( 'page-number', Math.ceil( pageInfo.allNum / pageInfo.perPage ), function( page ) {
			    		pagenation.requestPage( page, ret.postData );
			    	}, pageInfo.currentPage  );
			    } else {
			    	//清空分页信息
			      	$( '#page-number' ).empty();
			    }
			}

			ret = {
				init: function() {
					if( !hasInit ) {
						hasInit = true;

						ReactDOM.render(
							<Table pub={devicePub} />,
							document.getElementById( 'deviceList' )
						);

						pagenation.init( {
						  	url: 'deviceList',
							$par: $par,
							isCache: false,
							perPage: ret.pageInfo.perPage,
							successCb: function( pageObj ) {
							    devicePub.deliver( pageObj );
							    repaintPage( pageObj.pagenation );
							    ret.setTimeRefresh();
							}
						} );
						//请求currentPage页数据
						pagenation.requestPage( ret.pageInfo.currentPage );
					}
				},
				//刷新当前页信息
				refresh: function() {
					pagenation.requestPage( ret.pageInfo.currentPage );
				},
				//设置定时刷新
				setTimeRefresh: function() {
					if( timeId ) {
						clearTimeout( timeId );
						timeId = null;
					}
					
					timeId = setTimeout( function() {
						ret.refresh();
					}, CONST.REFRESH_TIME );
				},
				//取消定时刷新
				stopTimeRefresh: function() {
					clearTimeout( timeId );
				},
				pageInfo: {	//分页信息
				    perPage: 15,
				    currentPage: 1
				},
				pagenation: pagenation
				
			};

			return ret;
	} )();

	module.exports = deviceList;

} );
