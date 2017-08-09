define( function( require, exports, module ) {
	var pageList = require( 'page-list' ),
		operate    = require( 'device-operate' ),
		Table      = require( 'device-react_table' ),
		timeLogout = require( 'timeLogout' ),
		$jump = $(".jump"),
		$totalPage = $(".total-page");

	timeLogout.init();

	/************************显示分页信息**************************/
	var deviceList = pageList(),
		$par = $( '.J-page-wrap' ),
		$selePerpage = $(".sele-perpage");
	deviceList.init( {
		url: './deviceList',
		method: 'GET',		 //请求方式
		isCache: false,		 //是否缓存分页数据
		isTimeRefresh: false, //是否定时刷新
		$par: $par,
		pageInfo: {
			perPage: $selePerpage.children('option:selected').val(),
		  currentPage: 1
		},
		success: function( pageObj ) {
			ReactDOM.render(
				React.createElement(Table, {data: pageObj}),
				$par.find( '.page-list' )[0]
			);
			//显示跳转到xxx页
			$totalPage.text( "共有" + Math.ceil( pageObj.pagenation.allNum/pageObj.pagenation.perPage ) + "页");
			$jump.show();
		}
	} );
	/*************************************************************/

	operate.init( function() {
		var pageInfo = deviceList.pageInfo;

	  	if( pageInfo.allNum >= 0 ) {
	    	deviceList.pagenation.requestPage( pageInfo.currentPage );
	  	}
	} , deviceList.selectPerpageNum );
} );
