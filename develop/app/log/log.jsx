define( function( require, exports, module ) {
	var pageList   = require( 'page-list' ),
		timeLogout = require( 'timeLogout' ),
		operate	   = require('deleteRecord'),
		Table      = require( 'log-react_table' ), //react组件
		Space 	   = require( 'leftSpace' ),				 //剩余空间
		$form      = $( '.J-filter' ),      //过滤表单
		$selePerpage = $(".sele-perpage"),
		$selePage = $(".sele-page"), //选择跳转到第xx页
		$sPageForm = $(".s-page-form"),
		$jump = $(".jump"),
		$totalPage = $(".total-page");
	timeLogout.init();

	/************************显示分页信息**************************/
	var logList = pageList(),
		$par = $( '.J-page-wrap' ),
		$allNum = $( '.J-all_num' );

	logList.init( {
		url: './logList',
		method: 'POST',		 //请求方式
		isCache: false,		 //是否缓存分页数据
		isTimeRefresh: true, //是否定时刷新
		$par: $par,
		pageInfo: {
			perPage: $selePerpage.children('option:selected').val(),
		  currentPage: 1
		},
		success: function( pageObj ) {
			ReactDOM.render(
				<Table data={pageObj}/>,
				$par.find( '.page-list' )[0]
			);
			
			//显示跳转到xxx页
			var totalPageNum = Math.ceil( pageObj.pagenation.allNum/pageObj.pagenation.perPage );
			if( totalPageNum > 1 ){
				$totalPage.text( "共有" + totalPageNum + "页");
				$jump.show();
			}

			//更新总条数
			$allNum.text( pageObj.pagenation.allNum );

			//更新剩余空间
			ReactDOM.render(
		    	<Space data={pageObj} />,
		    	document.getElementById( 'J-space' )
		    );
		}
	} );

	/************************分页，每页显示数目**************************/
	$selePerpage.on('change',function() {
		logList.selectPerpageNum( $(this).children('option:selected').val() );
	})
	
	/************************选择，跳转至xxx页**************************/
	$sPageForm.submit(function() {
		var page = $selePage.val() - 0;
		if( isNaN(page) ) return;
		logList.refresh( page );
		return;
	});

	/*************************************************************/
	operate.init( 'deleteLog', $('#deleteLog'), function() {
		logList.refresh();
	})

	/*************************************************************/

	$( '.J-query' ).click( function() {
		logList.postData = $form.serialize();

		//如果用户取消了所有的复选框，为复选框赋值为 undefined
		if( logList.postData.indexOf( 'type=' ) === -1 ) {
			logList.postData += '&type=undefined';
		}

		//过滤时请求第一页数据
	    logList.pagenation.requestPage( 1, logList.postData );
	} );

	$( '.timepicker' ).datetimepicker( {
    	defaultDate: '',
        dateFormat: "yy-mm-dd",
        showSecond: true,
        timeFormat: 'hh:mm:ss',
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1
    } );
} );
