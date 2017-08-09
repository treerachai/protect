define( function( require, exports, module ) {
	var pageList   = require( 'page-list' ),
		Table      = require( 'netService-react_table' ),
		timeLogout = require( 'timeLogout' );
	timeLogout.init();

	/************************显示分页信息**************************/
	var netServiceList = pageList(),
		$par = $( '.J-page-wrap' ),
		$selePerpage = $(".sele-perpage");

	netServiceList.init( {
		url: './netServiceList',
		method: 'GET',		 //请求方式
		isCache: false,		 //是否缓存分页数据
		isTimeRefresh: true, //是否定时刷新
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

		}
	} );
	/*************************************************************/

	var $selePerpage = $(".sele-perpage");
	/************************分页，每页显示数目**************************/
	$selePerpage.on('change',function() {
		netServiceList.selectPerpageNum( $(this).children('option:selected').val() );
	})
	/*************************************************************/

} );
