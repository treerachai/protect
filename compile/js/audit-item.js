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
			pagenation       = require( 'pagenation' ),	   //分页对象
			devicePagenation = pagenation(),		       //创建分页对象
			$par             = $( '.device-wrapper' ),   //分页信息的父元素
			hasInit          = false, 
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
							React.createElement(Table, {pub: devicePub}),
							document.getElementById( 'deviceList' )
						);

						devicePagenation.init( {
						  	url: 'legalDeviceList',
							$par: $par,
							isCache: true,
							perPage: ret.pageInfo.perPage,
							successCb: function( pageObj ) {
							    devicePub.deliver( pageObj );
							    repaintPage( pageObj.pagenation );
							}
						} );
						//请求currentPage页数据
						devicePagenation.requestPage( ret.pageInfo.currentPage );
					}
				},
				//刷新当前页信息
				refresh: function() {
					devicePagenation.requestPage( ret.pageInfo.currentPage );
				},
				pageInfo: {	//分页信息
				    perPage: 15,
				    currentPage: 1
				},
				pagenation: devicePagenation
				
			};

			return ret;
	} )();

	module.exports = deviceList;

} );
