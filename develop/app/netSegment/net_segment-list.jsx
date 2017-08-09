define( function( require, exports, module ) {
	var terminalList = ( function() {
		/*
		 * COMMON_FUN下有一个分页对象，这是显示页码列表的
		 * 还有一个pagenation.js，这个是封装的用于请求分页数据的对象
		*/
		var Table       = require( 'net_segment-react_table' ), //react组件
			COMMON_FUN  = require( 'common' ),           //公用函数
			Deliver     = require( 'subscribe' ),	     //订阅对象
			pagePub     = new Deliver(),			     //创建订阅对象
			pagenation  = ( require( 'pagenation' ) )(), //创建分页对象
			$par        = $( '.page-wrapper' ),          //分页信息的父元素
			hasInit     = false, 
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
							<Table pub={pagePub} />,
							document.getElementById( 'page-list' )
						);

						pagenation.init( {
						  	url: 'netSegmentList',
							$par: $par,
							isCache: true,
							perPage: ret.pageInfo.perPage,
							successCb: function( pageObj ) {
							    pagePub.deliver( pageObj );
								repaintPage( pageObj.pagenation );
							}
						} );
						//请求currentPage页数据
						pagenation.requestPage( ret.pageInfo.currentPage );
					}
				},
				pageInfo: {	//分页信息
				    perPage: 15,
				    currentPage: 1
				},
				pagenation: pagenation
				
			};

			return ret;
	} )();

	module.exports = terminalList;

} );
