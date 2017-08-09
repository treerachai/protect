define( function( require, exports, module ) {
	var pageList   = require( 'page-list' ),
		timeLogout = require( 'timeLogout' ),
		operate    = require( 'net_segment-operate' );
		Table      = require( 'net_segment-react_table' ), //react组件
		Space 	   = require( 'leftSpace' ),				 //剩余空间
		$form      = $( '.J-filter' );      //过滤表单

	timeLogout.init();

	/************************显示分页信息**************************/
	var netSegmentList = pageList(),
		$par = $( '.J-page-wrap' ),
		$allNum = $( '.J-all_num' );

	netSegmentList.init( {
		url: './netSegmentList',
		method: 'GET',		 //请求方式
		isCache: true,		 //是否缓存分页数据
		isTimeRefresh: false, //是否定时刷新
		$par: $par,
		success: function( pageObj ) {
			ReactDOM.render(
				React.createElement(Table, {data: pageObj}),
				$par.find( '.page-list' )[0]
			);
		}
	} );
	/*************************************************************/
	
	operate.init( function() {
		var pageInfo = netSegmentList.pageInfo,
			allPage  = Math.ceil( pageInfo.allNum / pageInfo.perPage );

		//删除列表项目时，总页数会减少，如果删除的是本页的最后一条，那么请求上一页数据
		if( allPage < pageInfo.currentPage ) {
			pageInfo.currentPage = pageInfo.currentPage - 1;
			if( pageInfo.currentPage < 1 ) {
		    	pageInfo.currentPage = 1;
		    }
		}

	  	if( pageInfo.allNum >= 0 ) {
	    	netSegmentList.pagenation.setOption( 'isCache', false );
	    	netSegmentList.pagenation.requestPage( pageInfo.currentPage );
	    	netSegmentList.pagenation.setOption( 'isCache', true );
	  	}
	} );
} );