define( function( require, exports, module ) {
	var terminalList = ( function() {
		/*
		 * COMMON_FUN下有一个分页对象，这是显示页码列表的
		 * 还有一个pagenation.js，这个是封装的用于请求分页数据的对象
		*/
		var Table              = require( 't-react-table' ), //react组件
			COMMON_FUN         = require( 'common' ),        //公用函数
			Deliver            = require( 'subscribe' ),	 //订阅对象
			terminalPub        = new Deliver(),			     //创建订阅对象
			pagenation         = require( 'pagenation' ),	 //分页对象
			terminalPagenation = pagenation(),		         //创建分页对象
			$par               = $( '.terminal-wrapper' ),   //分页信息的父元素
			hasInit            = false, 
			ret;

			ret = {
				init: function() {
					if( !hasInit ) {
						hasInit = true;

						ReactDOM.render(
							<Table pub={terminalPub} />,
							document.getElementById( 'terminal' )
						);

						terminalPagenation.init( {
						  	url: 'terminalList',
							$par: $par,
							isCache: true,
							perPage: ret.pageInfo.perPage,
							successCb: function( pageObj ) {
							    var pagenation = pageObj.pagenation;
							    pageInfo = pagenation;
							    terminalPub.deliver( pageObj );

							    if( pagenation.allNum > pagenation.perPage ) {
							    	//重新绘制分页信息
							    	COMMON_FUN.pagenation( 'terminal-page', Math.ceil( pagenation.allNum / pagenation.perPage ), function( page ) {
							    		terminalPagenation.requestPage( page );
							        	pageInfo.currentPage = page;
							    	}, pagenation.currentPage  );
							    } else {
							    	//清空分页信息
							      	$par.empty();
							    }
							}
						} );
						//请求currentPage页数据
						terminalPagenation.requestPage( ret.pageInfo.currentPage );
					}
				},
				pageInfo: {	//分页信息
				    perPage: 15,
				    currentPage: 1
				},
				pagenation: terminalPagenation
				
			};

			return ret;
	} )();

	
	
	module.exports = terminalList;

} );
