define( function( require, exports, module ) {
	var terminalList = ( function() {
		/*
		 * COMMON_FUN下有一个分页对象，这是显示页码列表的
		 * 还有一个pagenation.js，这个是封装的用于请求分页数据的对象
		*/
		var Table       = require( 'communication-react_table' ), //react组件
			COMMON_FUN  = require( 'common' ),           //公用函数
			CONST       = require( 'const' ),
			Deliver     = require( 'subscribe' ),	     //订阅对象
			Space 		= require( 'leftSpace' ),				 //剩余空间
			pagePub     = new Deliver(),			     //创建订阅对象
			pagenation  = ( require( 'pagenation' ) )(), //创建分页对象
			$par        = $( '.page-wrapper' ),          //分页信息的父元素
			$allNum     = $( '.J-all_num' ),
			$dataWrap   = $( '.data-wrap' ),
			hasInit     = false,
			timeId		= null,
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
							React.createElement(Table, {pub: pagePub}),
							document.getElementById( 'page-list' )
						);
						
						//更新总条数
						Deliver.subscribe( function( pageObj ){
							$allNum.text( pageObj.pagenation.allNum );
						}, pagePub );

						//更新剩余空间
						Deliver.subscribe( function( pageObj ){
							ReactDOM.render(
						    	React.createElement(Space, {data: pageObj}),
						    	document.getElementById('J-space')
						    );
						}, pagePub );

						pagenation.init( {
						  	url: './communicationList',
							$par: $par,
							method: 'POST',
							isCache: false,
							perPage: ret.pageInfo.perPage,
							successCb: function( pageObj ) { 
							    pagePub.deliver( pageObj );
							    repaintPage( pageObj.pagenation );
							    ret.setTimeRefresh();
							}
						} );
						//请求currentPage页数据
						pagenation.requestPage( ret.pageInfo.currentPage );
						
					} 
				},
				refresh: function() {
					pagenation.requestPage( ret.pageInfo.currentPage, ret.postData );
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
				postData: '',
				pagenation: pagenation
				
			};

			return ret;
	} )();
	
	module.exports = terminalList;

} );