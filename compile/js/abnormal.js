define( function( require, exports, module ) {
	var pageList   = require( 'page-list' ),
		timeLogout = require( 'timeLogout' ),
		operate	   = require('deleteRecord'),
		$form      = $( '.J-filter' ),      //过滤表单
		AbnormalTable = require( 'abnormal-react_table_abnormal' ), //react组件
		IgnoreTable   = require( 'abnormal-react_table_ignore' ), //react组件
		Space 	   = require( 'leftSpace' ),				 //剩余空间
		Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) ),
		$form      = $( '.J-filter' ),      //过滤表单
		$selePerpage = $(".sele-perpage");  //选择每页显示多少行

	/**************************顶部提示栏****************************/
	timeLogout.init();

	/**************************手动删除异常消息****************************/
	operate.init( 'deleteAbnormal', $('#deleteAbnormal'), function() {
		abnormalList.refresh();
	})

	/************************显示异常列表分页信息**************************/
	var search = location.search.substr(1),
		mac = search.match(/(^|&)mac=([^&]*)(;|$)/);

	if(mac && mac[2]) {
		$form.find('input[name=mac]').val(mac[2]);
	}

	/************************显示异常列表分页信息**************************/
	var abnormalList = pageList(),
		$par = $( '.abnormal-page-wrap' ),
		$allNum = $( '.J-all_num' );

	abnormalList.postData = $form.serialize();
	abnormalList.init( {
		url: './abnormalList',
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
				React.createElement(AbnormalTable, {data: pageObj}),
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
		abnormalList.selectPerpageNum( $(this).children('option:selected').val() );
	})

	/************************显示忽略异常列表分页信息**************************/
	$('.check-ignore').click(function() {
		$('#ignoreModal').modal();
	})

	var ignoreList = pageList(),
		$parIgnore = $( '.ignore-wrap' );

	ignoreList.init( {
		url: './ignoreAbnormalList',
		method: 'POST',		 //请求方式
		isCache: false,		 //是否缓存分页数据
		isTimeRefresh: false, //是否定时刷新
		pageInfo: {
		    perPage: 5,
		    currentPage: 1
		},
		$par: $parIgnore,
		success: function( pageObj ) {
			ReactDOM.render(
				React.createElement(IgnoreTable, {data: pageObj}),
				$parIgnore.find( '.page-list' )[0]
			);
		}
	} );

	/*************************************************************/
	//处理异常消息成功
    $('body').on('handleAbnormalSuccess', function() {
        abnormalList.refresh();
        abnormalList.setTimeRefresh();
    })

    $('body').on('handleAbnormalError', function() {
        abnormalList.setTimeRefresh();
    })

    $('body').on('handleIgnoreSuccess', function() {
    	//刷新异常列表和异常忽略列表
        abnormalList.refresh();
        ignoreList.refresh();

        abnormalList.setTimeRefresh();
    })

    $('body').on('handleIgnoreError', function() {
        abnormalList.setTimeRefresh();
    })

    $('body').on('beforeHandleAbnormal', function() {
        abnormalList.stopTimeRefresh();
    })

    $('body').on('cancelHandleAbnormal', function() {
        abnormalList.setTimeRefresh();
    })

	$('body').on('beforeHandleIgnore', function() {
        abnormalList.setTimeRefresh();
    })

    $('body').on('cancelHandleIgnore', function() {
        abnormalList.setTimeRefresh();
    })


	/*************************************************************/

	$( '.J-query' ).click( function() {
		abnormalList.postData = $form.serialize();

		//如果用户取消了所有的复选框，为复选框赋值为 undefined
		if( abnormalList.postData.indexOf( 'type=' ) === -1 ) {
			abnormalList.postData += '&type=undefined';
		}

		//过滤时请求第一页数据
	    abnormalList.pagenation.requestPage( 1, abnormalList.postData );
	} );

	/**************************日历插件初始化*************************/
	$( '.timepicker' ).datetimepicker( {
    	defaultDate: '',
        dateFormat: "yy-mm-dd",
        showSecond: true,
        timeFormat: 'hh:mm:ss',
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1
    } );

    /****************************处理全部****************************/
    $('.J-handleAll').click(function() {
    	pop.warning('是否处理全部异常?');
			pop.on( '.ok', 'click', function() {
				$.ajax({
					url: 'handleAllAbnormal',
					dataType: 'JSON'
				}).then(function(json) {
					if(json.bizNo > 0) {
						abnormalList.pagenation.requestPage( 1, abnormalList.postData );
						pop.hide(function() {
							pop.success('处理成功!');
						});
					} else {
						pop.hide(function(){
							pop.error('处理失败!');
						})
					}
				}, function() {
					pop.hide(function(){
						pop.error('处理失败!');
					})
				});
			});
    })

} );
