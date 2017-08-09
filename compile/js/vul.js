define( function( require, exports, module ) {
	var pageList    = require( 'page-list' ),
		Table      = require( 'vul-react_table' ),
		timeLogout = require( 'timeLogout' );

	timeLogout.init();

	/************************显示分页信息**************************/
	var vulList = pageList(),
		$par = $( '.J-page-wrap' );

	vulList.init( {
		url: './vulList',
		method: 'GET',		 //请求方式
		isCache: false,		 //是否缓存分页数据
		isTimeRefresh: true, //是否定时刷新
		$par: $par,
		success: function( pageObj ) {
			ReactDOM.render(
				React.createElement(Table, {data: pageObj}),
				$par.find( '.page-list' )[0]
			);
		}
	} );
	/*************************************************************/
} );
