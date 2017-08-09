define( function( require, exports, module ) {
	var pageList   = require( 'page-list' ),
		timeLogout = require( 'timeLogout' ),
		operate	   = require('deleteRecord'),
		Table      = require( 'communication-react_table' ), //react组件
		Space 	= require( 'leftSpace' ),				 //剩余空间
		$form      = $( '.J-filter' ),      //过滤表单
		$selePerpage = $(".sele-perpage");  //分页每页数目
	/************************显示分页信息**************************/
	var communicationList = pageList(),
		$par = $( '.J-page-wrap' ),
		$allNum = $( '.J-all_num' );

	communicationList.init( {
		url: './communicationList',
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
				React.createElement(Table, {data: pageObj}),
				$par.find( '.page-list' )[0]
			);

			//更新总条数
			$allNum.text( pageObj.pagenation.allNum );

			//更新剩余空间
			ReactDOM.render(
		    	React.createElement(Space, {data: pageObj}),
		    	document.getElementById( 'J-space' )
		    );
		}
	} );

	/************************分页，每页显示数目**************************/
	$selePerpage.on('change',function() {
		communicationList.selectPerpageNum( $(this).children('option:selected').val() );
	})
  	/*****************************************************************/

	/*************************************************************/
	operate.init( 'deleteCommunication', $('#deleteCommunication'), function() {
		communicationList.refresh();
	})
	/*************************************************************/

	$( '.timepicker' ).datetimepicker( {
    	defaultDate: '',
        dateFormat: "yy-mm-dd",
        showSecond: true,
        timeFormat: 'hh:mm:ss',
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1
    } );

    $( '.J-query' ).click( function() {
		communicationList.postData = $form.serialize();

		//如果用户取消了所有的复选框，为复选框赋值为 undefined
		if( communicationList.postData.indexOf( 'type=' ) === -1 ) {
			communicationList.postData += '&type=undefined';
		}

		//过滤时请求第一页数据
	    communicationList.pagenation.requestPage( 1, communicationList.postData );
	} );	
	
	timeLogout.init();
} );
