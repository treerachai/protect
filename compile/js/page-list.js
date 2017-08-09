define( function( require, exports, module ) {
	var REFRESH_TIME = 15000, //页面定时刷新的时间
		Pagenation = require( 'pagenation' );

	function pageList() {
		var hasInit = false,
			timeId = null,
			isStop = false,
			pagenation = Pagenation(),
			$par, $pageNumber, $jump,
			successFun,
			ret;

		//页码显示对象
		function setPageNumber( $dom, total, callBack, currentPage ) {
		    var options = {
		        bootstrapMajorVersion: 3,
		        currentPage: currentPage || 1, //当前页数
		        totalPages: total, //总页数
		        numberOfPages: 8,
		        itemContainerClass: function( type, page, current ) {
		        	if( current === 1 && ( type === 'first' || type === 'prev' ) ) {
		        		return "disabled";
		        	} else if( current === total && ( type === 'next' || type === 'last' ) ) {
		        		return "disabled";
		        	}
		        	if( page === current ) {
		        		return 'active';
		        	}
		        },
		        shouldShowPage: true, //显示所有按钮
		        itemTexts: function ( type, page, current ) {
		            switch (type) {
		                case "first":
		                  return "首页";
		                case "prev":
		                  return "上一页";
		                case "next":
		                  return "下一页";
		                case "last":
		                  return "末页";
		                case "page":
		                  return page;
		            }
		        },

		        //点击事件，用于通过Ajax来刷新整个list列表
		        onPageChanged: function ( event, type, page ) {
					if( timeId ) {
						clearTimeout( timeId );
						timeId = null;
					}
		            callBack( page );
		        }
		    };
		    return $dom.bootstrapPaginator( options );
		}

		//显示共xx页 跳转到xx页
		function setJumpTo( $dom, totalPageNum ) {
			$dom.html(['<li><span class="total-page"></span></li>'
				+ '<li>'
					+ '<form action="javascript:;" class="s-page-form">'
						+ '<input class="sele-page" type="text" value="">'
						+ '<span>页</span>'
						+ '<button class="confirm">确定</button>'
					+ '</form>'
				+ '</li>']);
			var $totalPage = $dom.find(".total-page"),
				$selePage = $dom.find(".sele-page"), //选择跳转到第xx页
				$sPageForm = $dom.find(".s-page-form");

			//显示共xx页
			$totalPage.text( "共" + totalPageNum + "页  跳转至  第");
			$dom.show();

			/************************选择，跳转至xxx页**************************/
			$sPageForm.submit(function() {
				var page = $selePage.val() - 0;
				if( isNaN(page) ) return;
				ret.refresh( page );
				return;
			});
		}

		//重新生成分页页码信息
		function repaintPage( pageInfo ) {
			ret.pageInfo.currentPage = pageInfo.currentPage;
		    ret.pageInfo.allNum = pageInfo.allNum;
		    if( pageInfo.allNum > pageInfo.perPage ) {
		    	//重新绘制分页信息
		    	setPageNumber( $pageNumber, Math.ceil( pageInfo.allNum / pageInfo.perPage ), function( page ) {
		    		pagenation.requestPage( page, ret.postData );
				}, pageInfo.currentPage  );
				
				setJumpTo($jump, Math.ceil( pageInfo.allNum / pageInfo.perPage ) );
		    } else {
		    	//清空分页信息
		      $pageNumber.empty();
		    }
		}

		ret = {
			init: function( option ) {
				if( !hasInit ) {
					if( !option.$par || !option.url ) {
						return false;
					}

					$par = option.$par;
					$pageNumber = $par.find( '.page-number' );
					$jump = $par.find(".jump");
					successFun = option.success || function() {};

					//初始化option
					option.method = option.method || 'GET';
					option.isCache = option.isCache != null ? !!option.isCache : false;
					option.isTimeRefresh = option.isTimeRefresh != null ? !!option.isTimeRefresh : true;
					ret.pageInfo = option.pageInfo || {
					    perPage: 15,
					    currentPage: 1
					};

					hasInit = true;

					pagenation.init( {
					  	url: option.url,
						$par: $par,
						method: option.method,
						isCache: option.isCache,
						perPage: ret.pageInfo.perPage,
						successCb: function( pageObj ) { 
						    repaintPage( pageObj.pagenation );

						    successFun( pageObj );
						    if( option.isTimeRefresh && !isStop ) {
						    	ret.setTimeRefresh();
						    }
						}
					} );

					//请求currentPage页数据
					pagenation.requestPage( ret.pageInfo.currentPage, ret.postData );
					
				} 
			},
			refresh: function(page) {
				pagenation.requestPage( page || ret.pageInfo.currentPage, ret.postData );
			},
			//设置定时刷新
			setTimeRefresh: function() {
				if( timeId ) {
					clearTimeout( timeId );
					timeId = null;
				}

				isStop = false;
				
				timeId = setTimeout( function() {
					ret.refresh();
				}, REFRESH_TIME );
			},
			//取消定时刷新
			stopTimeRefresh: function() {
				clearTimeout( timeId );
				timeId = null;
				isStop = true;
			},

			//分页时选择每页的数目
			selectPerpageNum: function(perpage) {
				if(timeId) {
					clearTimeout( timeId );
					timeId = null;
				}
				pagenation.requestPage( 1 , ret.postData , perpage );
			},
			// pageInfo: {	//分页信息
			//     perPage: 15,
			//     currentPage: 1
			// },
			postData: '',
			pagenation: pagenation
			
		};

		return ret;
	}
	
	module.exports = pageList;

} );