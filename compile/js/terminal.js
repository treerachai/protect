define( function( require, exports, module ) {
	var pageList   = require( 'page-list' ),
		operate    = require( 'terminal-operate' ),
		Table      = require( 'terminal-react_table' ),
		timeLogout = require( 'timeLogout' ),
		$jump = $(".jump"),
		$totalPage = $(".total-page");
	timeLogout.init();

	/************************显示分页信息**************************/
	var terminalList = pageList(),
		$par = $( '.J-page-wrap' );

	terminalList.init( {
		url: './terminalList',
		method: 'GET',		 //请求方式
		isCache: false,		 //是否缓存分页数据
		isTimeRefresh: true, //是否定时刷新
		$par: $par,
		success: function( pageObj ) {
			ReactDOM.render(
				React.createElement(Table, {data: pageObj}),
				$par.find( '.page-list' )[0]
			);
			//显示跳转到xxx页
			var totalPageNum = Math.ceil( pageObj.pagenation.allNum/pageObj.pagenation.perPage );
			if( totalPageNum > 1 ){
				$totalPage.text( "共有" + totalPageNum + "页");
				$jump.show();
			}
		}
	} );
	/*************************************************************/

	operate.init( function() {
		var pageInfo = terminalList.pageInfo,
			allPage  = Math.ceil( pageInfo.allNum / pageInfo.perPage );

		//删除列表项目时，总页数会减少，如果删除的是本页的最后一条，那么请求上一页数据
		if( allPage < pageInfo.currentPage ) {
			pageInfo.currentPage = pageInfo.currentPage - 1;
				if( pageInfo.currentPage < 1 ) {
			    	pageInfo.currentPage = 1;
			    }
			}

	  	if( pageInfo.allNum >= 0 ) {
	    	terminalList.pagenation.requestPage( pageInfo.currentPage );
	  	}
	}, terminalList.refresh );
} );
