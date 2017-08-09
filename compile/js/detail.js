
var isRunning = false, //是否有正在执行的任务
	taskPage = {}, //任务列表页缓存数据
	devPage = {}, //设备也缓存数据
	root = '../../task/', //动态请求数据的根路径
	runningId, //正在执行的任务id,X.taskId不同
	curveData, //画所有任务曲线图的数据
	water,
	timeId; //定时器id

//初始化过滤关键字对象，序列化的时候需要，因为后台需要将所有关键字都传递过去
//没有输入的填写'*'，seralize函数处理
var origin = {
		devicetype: '*',
		service: '*',
		port: '*',
		os: '*',
		vultype: '*',
		keywords: '',
		sort: 'vul',
		taskid: X.taskId
	},

	//存储上一次过滤和搜索条件
	oldFilterObj = $.extend( {}, origin );

function init() {
	var ser = serialize( $.extend( {}, origin ) );
	
	reset();

	initSideCharts( ser );
	initDeviceList( ser );
	initCurveChart();
	initTaskList( taskPage.currentPage );

	 $( '.filter .f' ).removeClass( 'active' );
	 $( '.filter .init.f' ).addClass( 'active' );
}

init();

$( function() {
	var $search = $( '.filter-wrap .search' ),
		$f = $( '.filter .f' ),
		resizeTimeId;

	$( '.btn-search' ).click( function() {
		$f.removeClass( 'active' );
		handleSearch( $.trim( $search.val() ) );
	} )

	$( '.filter-list' ).delegate( '.f', 'click', function() {
		var _this = $( this ),
			activeStr = '';

		if( _this.hasClass( 'active' ) ) {
			return ;
		}

		handleSearch( _this.data( 'f' ) );

		$search.val( '' );

	} )

	$( '.filter-wrap .search' ).focus( function() {
		$( document ).on( 'keydown.a', function( e ) {
			if( e.keyCode === 13 ) {
				$( '.filter .f' ).removeClass( 'active' );
				handleSearch( $.trim( $search.val() ) );
			}
		} )
	} )

	$( '.filter-wrap .search' ).blur( function() {
		$( document ).off( 'keydown.a' );
	} )

	$( '#task-list .list tbody' ).delegate( '.operate', 'click', function() {
		var _this = $( this );

		handleOperate( _this );

		//切换当前高亮的任务行
		if( _this.data( 'url' ).indexOf( 'detail' ) > -1 ) {
			$( '#task-list .list tbody tr' ).removeClass( 'active' );
			_this.parents( 'tr' ).addClass( 'active' );

			//更新页面中的任务概览以及任务折线图
			//updateState( taskPage.cache.items[ _this.parents( 'tr' ).index() ] );
		}

	} );

	//服务柱状图更多按钮点击事件
	$( '.unit .more' ).click( function() {
		var $this = $( this );

		if( !$this.data( 'count' ) ) {
			$( '#service' ).css( 'height', 'auto' );
			$this.data( 'count', true ).text( '收起>>' );
		} else {
			$( '#service' ).css( 'height', '100px' );
			$this.data( 'count', false ).text( '更多>>' );
		}
		
	} );

	//排序sort-list
	$( '.sort-list' ).delegate( '.btn', 'click', function() {
		var $this = $( this );

		if( !$this.hasClass( 'active' ) ) {
			$this.addClass( 'active' ).siblings().removeClass( 'active' );

			changeSort( $this.data( 'sort' ) );
		}
	} );
	
	
	$( window ).resize( function() {
		clearTimeout( resizeTimeId );
		setTimeout( function() {
			water.fresh();
		}, 400 )
	} )

	//处理用户输入及用户点击过滤按钮的输入数据
	//@input: 过滤字符串
	function handleSearch( str ) {
		var rKey = /^(service|devicetype|port|os|vultype|sort)\s*=\s*([\w\W]*)$/i,
			i = 0,
			strArr, match;
		
		oldFilterObj.keywords = '';

		if( str === '' ) {
			return false;
		}

		strArr = str.split( ',' );

		for( ; i < strArr.length; i++ ) {
			strArr[ i ] = $.trim( strArr[ i ] );

			match = strArr[ i ].match( rKey );

			if( match != null ) {
				oldFilterObj[ match[ 1 ] ] = match[ 2 ];
			} else {
				oldFilterObj.keywords = $.trim( oldFilterObj.keywords + ' ' + strArr[ i ] + ' ' );
			}
		}
		
		console.log( oldFilterObj );
		
		$( '.filter-list li' ).removeClass( 'active' );
		$( '.type .filter-list li[data-f*="' + oldFilterObj.devicetype + '"]' ).addClass( 'active' );
		$( '.service .filter-list li[data-f*="' + oldFilterObj.service + '"]' ).addClass( 'active' );

		//添加sort关键字，优先使用用户输入的排序方式，其次使用上一次保存过的，再其次使用目前active的
		oldFilterObj.sort = oldFilterObj.sort || $( '.sort-list .active' ).data( 'sort' ) || 'vul';
		oldFilterObj.taskid = X.taskId;

		filter( oldFilterObj );
	}

	//处理任务列表的操作，删除和查看详情按钮
	function handleOperate( dom ) {
		var url = $( dom ).data( 'url' ),
			mask = $( '#task-list .page-mask' ),
			loading = $( '#task-list .loading' ),
			taskId = url.substring( url.lastIndexOf('/') + 1 ),
			notice = '此操作会删除该任务的所有信息，是否继续？',
			ser, listLen, trs;

		dom = $( dom );
		trs = $( '.list tr' );
		//mask.show();
		//loading.show();

		if( url.indexOf( 'delete' ) > -1 ) {		
			myCancel( notice, function() {
				changeElemsState( 'show', [ loading, mask ] );
				requestAjax( root + 'delete/' + taskId, 'json', function( data ) {
					//删除成功进行的操作
					if( data.state === 'success' ) {
						listLen = $( '.list tbody tr' ).length;
						delete taskPage.cache[ taskPage.currentPage ];

						if( taskId === X.taskId ) {
							//只有一条记录，返回项目列表
							if( listLen == 1 ) {
								location.href = '/CyberPecker/project/list';
							}
							location.reload();
						}
						if( listLen == 1 ) {
							initTaskList( taskPage.currentPage - 1 );
						} else {
							//initTaskList( taskPage.currentPage );
							requestAjax( root + 'taskList/' + X.projectId + '/' + taskPage.currentPage, 'json', function( json ) {
								json = json.tasklist;
								updateTaskPage( dom.parents( 'tbody' ), json, taskPage.currentPage );
							} )
						}
						changeElemsState( 'hide', [ loading, mask ] );
						
						curveData.forEach( function( elem, index ) {
							if( elem.taskid == taskId ) {
								curveData.splice( index, 1 );
								drawCurve( 'time-line', curveData );
								return;
							}
						} )
					}
				} )
			} )
		} else if( url.indexOf( 'detail' ) > -1 ) {
			handleTaskDetail( taskId );
		}
	}
	
	//更新任务列表的编号
	//@input: startNum--起始编号，$trs--tr的jquery对象集合
	function updateTableNum( startNum, $trs ) {
		console.log(startNum)
		console.log($trs)
		$trs.each( function( _, $tr ) {
			$( 'td', $tr ).eq( 0 ).text( startNum++ );
		} )
	}

	function filter( obj ) {
		var ser = serialize( obj );

		initSideCharts( ser );
		initDeviceList( ser );

	}

	//改变排序方式
	function changeSort( sortStr ) {
		var ser;

		oldFilterObj.sort = sortStr;

		ser = serialize( oldFilterObj );

		initDeviceList( ser );
	}
} )

//更新所有的饼图
function initSideCharts( filter ) {
	requestAjax( root + 'taskResultCount?' + filter, 'json', function( json ) {
		json = json.resultcount;
		
		//drawRadar( 'risk', data.assessment );
		drawPie( 'style', json.device_type );
		drawPie( 'vul', json.vuls );
		drawBar( 'service', json.service );
		drawPie( 'os', json.os );
	} )
}


function initCurveChart() {
	requestAjax( root + 'taskResultView/' + X.projectId, 'json', function( json ) {
		curveData = json.resultview;
		drawCurve( 'time-line', curveData );
	} )
}

//页面加载时请求任务列表数据
function initTaskList( page ) {

	page = page || 1;
	taskPage.cache = {};
	
	requestAjax( root + 'taskList/' + X.projectId + '/' + page, 'json', function( json ) {
		json = json.tasklist;

		if( json.items.length === 0 ) {
			return;
		}
		
		taskPage.perPage = json.perPage;
		updateTaskPage( $( '#task-list .list tbody' ), json, 1 );
		updateViewState( json.items[ 0 ] );
		
		
		if( json.items[ 0 ].state === 'running' ) {
			//触发有任务正在执行的函数，如果又需要可以用订阅方式
			//此处只会执行一次
			running();
			
			runningId = json.items[ 0 ].taskid;
		} else {
			taskPage.cache[ page ] = json;
		}

		if(  json.total > json.perPage ) {
			//点击不同页数的时候触发
			pagination( 'task-page', Math.ceil( json.total / json.perPage ), function( page ) {
				taskPageJump( page );
			}, page );
		}
	} );
}

//任务列表，页面跳转时执行的函数
function taskPageJump( page ) {
	var mask = $( '#task-list .page-mask' ),
		loading = $( '#task-list .loading' );

	changeElemsState( 'show', [ loading, mask ] );
	taskPage.currentPage = page;

	//如果请求的数据有缓存，并且第一页的时候不能有正在执行的任务，就使用缓存，否则请求数据
	if( taskPage.cache[ page ] != undefined && ( isRunning === false || page !== 1 )  ) {
		updateTaskPage( $( '#task-list .list tbody' ), taskPage.cache[ page ], page );
		changeElemsState( 'hide', [ loading, mask ] );
	} else {
		requestAjax( root + 'taskList/' + X.projectId + '/' + page, 'json', function( json ) {
			taskPage.cache[ page ] = json.tasklist;
			updateTaskPage( $( '#task-list .list tbody' ), json.tasklist, page );
			changeElemsState( 'hide', [ loading, mask ] );
		}, function() {
			changeElemsState( 'hide', [ loading, mask ] );
		} )
	}
}

function updateTaskPage( $par, pageInfo, page ) {
	var ret = '',
		i, len;

	for( i = 0, len = pageInfo.items.length; i < len; i++ ) {
		ret += getTrHtml( pageInfo.items[ i ], ( page - 1 ) * pageInfo.perPage + i + 1 );
	}

	$par.html( ret );
}

function getTrHtml( item, index ) {
	var active = X.taskId == item.taskid ? 'active' : '',
		errorStr = item.state === 'error' ? '<i class="fa fa-times" style="color: #f00;"></i>' :
		item.state === 'running' ? '<i class="fa fa-spinner rotate" style="color: #000;"></i>' : '';

	return '<tr class="' + active + ' ' + item.state + '">' +
				'<td>' + index + '</td>' +
				'<td>' +
					'<div class="progress bg-grey">' +
						'<div class="progress-bar bg-blue" style="width:' + item.progress + '%;white-space:nowrap">' +
							'<span>' + item.progress + '%</span>' +
							errorStr +
						'</div>' +
					'</div>' +
				'</td>' +
				'<td>' + formateDate( item.start_time, 'YYYY.MM.dd HH:mm:ss' ) + '</td>' +
				'<td>' + item.taking_time + '</td>' +
				'<td>' + item.properties + '</td>' +
				'<td>' + item.vuls + '</td>' +
				'<td>' +
					'<a class="operate" href="javascript:void(0);" data-url="../../delete/' + item.taskid + '">删除</a>&nbsp;&nbsp;' +
					'<a class="operate" href="javascript:void(0);" data-url="../../detail/' + item.taskid + '">详情</a>' +
				'</td>' +
			'</tr>';
}

//有正在执行的任务，更新相关信息
function running() {
	isRunning = true;

	clearTimeout( timeId );

	timeId = setTimeout( function requestData() {
		//请求进度和曲线图数据
		requestAjax( root + 'runningTaskResult/' + runningId, 'json', function( json ) {
			json = json.runningtask;
			
			isRunning = json.state === 'running' ? true : false;
			updateState( json );
		} );

		//如果当前页的任务id和正在执行的任务id相同，那么更新设备等相关信息
		if( runningId == X.taskId ) {
			//请求指定页的数据
			requestDev( devPage.currentPage, true );
			initSideCharts( serialize( oldFilterObj ) );
		}
		
		if( isRunning === true ) {
			timeId = setTimeout( function() {
				requestData();
			}, 2000 );
		}
	}, 2000 )
}

//更新任务曲线图，任务列表，以及页面中显示的概览信息
function updateState( data ) {
	var len = curveData.length;
	
	if( X.taskId == runningId ) {
		updateViewState( data );
	}

	if( data.properties != curveData[ len - 1 ].properties || data.vuls != curveData[ len - 1 ].vuls
			|| data.start_time != curveData[ len - 1 ].time ) {

		//如果有属性值改变了才去更新曲线图，否则不更新
		curveData.pop();
		curveData.push( {
			properties: data.properties,
		    vuls: data.vuls,
		    time: data.start_time
		} );
		drawCurve( 'time-line', curveData );
	}

	//如果任务列表是第一页，更新任务列表状态，只第一页有正在执行的任务
	if( taskPage.currentPage == 1 ) {
		$( '.list .running' ).replaceWith( getTrHtml( data, 1 ) );
	}
}

//更新详情页中的任务状态信息
function updateViewState( data ) {
	$( '.list-inline .progress' ).text( data.progress + '%' ),
	$( '.list-inline .state' ).text( data.state ),
	$( '.list-inline .start-time' ).text( formateDate( data.start_time, 'YYYY.MM.dd HH:mm:ss' ) ),
	$( '.list-inline .taking-time' ).text( data.taking_time + '分' ),
	$( '.list-inline .times' ).text( data.times );
}

//请求设备列表数据
function initDeviceList( filter ) {
	var mask = $( '.dev-page .page-mask' ),
		loading = $( '.result .loading' );
	
	mask.show();
	loading.show();
	//清空页码
	$( '#dev-page' ).empty();
	
	devPage.cache = {};
	
	requestAjax( root + 'taskResultDetail?' + filter + '&pageNum=1', 'json', function( json ) {
		json = json.taskResultDetail;
		updateDevPage( $( '.device-list' ), json, 1 );
		
		if( isRunning && runningId === X.taskId ) {
			devPage.cache[ 1 ] = json;
		}
		
		if( json.total > json.perPage ) {
			//点击不同页数的时候触发
			pagination( 'dev-page', Math.ceil( json.total / json.perPage ), function( page ) {
				requestDev( page );
			} )
		}
		
		changeElemsState( 'hide', [ loading, mask ] );
	}, function() {
		changeElemsState( 'hide', [ loading, mask ] );
	} )
}

//请求指定页的设备数据
function requestDev( page, forceFlag ) {
	var mask = $( '.dev-page .page-mask' ),
		loading = $( '.result .loading' ),
		filter = serialize( oldFilterObj );

	changeElemsState( 'show', [ loading, mask ] );
	devPage.currentPage = page;

	//如果请求的数据有缓存，并且第一页的时候不能有正在执行的任务，并且强制请求标志为false,
	//就使用缓存，否则请求数据
	if( devPage.cache[ page ] != undefined && ( isRunning === false ) && !forceFlag  ) {
		updateDevPage( $( '.device-list' ), devPage.cache[ page ], page );
		changeElemsState( 'hide', [ loading, mask ] );
	} else {
		requestAjax( root + 'taskResultDetail?' + filter + '&pageNum=' + page, 'json', function( json ) {
			json = json.taskResultDetail;
			devPage.cache[ page ] = json;
			updateDevPage( $( '.device-list' ), json, page );
			changeElemsState( 'hide', [ loading, mask ] );

			//如果任务是正在执行的，更新页码
			if( isRunning === true || forceFlag === true  ) {
				if( json.total > json.perPage ) {
					//点击不同页数的时候触发
					pagination( 'dev-page', Math.ceil( json.total / json.perPage ), function( page ) {
						requestDev( page );
					}, devPage.currentPage )
				}
			}
				
		}, function() {
			changeElemsState( 'hide', [ loading, mask ] );
		} )
	}
}

//更新设备列表数据
function updateDevPage( $par, devInfo, cPage ) {
	var i = 0,
		cNum;

	//$par.append( $( template.compile( X.tplDevice )( { items: devInfo.portDetailList } ) ) );
	$par.html( X.tplDevice( { data: devInfo.portDetailList } ) );
	
	water = waterFall( {
		$par: $( '.device-list' ),//瀑布流的父元素，向其中添加元素
	    perWidth: 270,//每个子元素的宽度
	    $children: $('.device-list .each-device'),//需要进行布局处理的jquery子元素
	    rowSpace: 10
	    //rowSpace: //每行之间的间隔
	} );
	
	//更新当前页设备数目和总数目
	cNum = devInfo.perPage * cPage;
	cNum = cNum > devInfo.total ? devInfo.total : cNum;
	$( '.result-sum .num' ).text( cNum + '/' + devInfo.total );
}

var water = waterFall( {
	$par: $( '.device-list' ),//瀑布流的父元素，向其中添加元素
    perWidth: 270,//每个子元素的宽度
    $children: '',//需要进行布局处理的jquery子元素
    rowSpace: 10
    //rowSpace: //每行之间的间隔
} );

//对过滤对象进行序列化
function serialize( obj ) {
	var ret = obj,
		key

	if( typeof obj === 'object' ) {
		ret = '';
		
		for( key in obj ) {
			obj[ key ] = $.trim( obj[ key ] );

			ret = ret + encodeURI( key + '=' + ( obj[ key ] === '' ? '*' : obj[ key ] ) ) + '&';
		}
	}

	return ret.replace( /&+$/, '' );
}

//点击详情页时重置数据
function reset() {
	taskPage = {
		cache: {},
		currentPage: 1
	},
	devPage = {
		cache: {},
		currentPage: 1
	}
}

//处理查看任务详情操作
function handleTaskDetail( taskId ) {
	//if( X.taskId !== taskId ) {
		X.taskId = taskId;
		oldFilterObj.taskid = taskId;
		devPage = {
			cache: {},
			currentPage: 1
		};
		ser = serialize( oldFilterObj );

		initSideCharts( ser );
		initDeviceList( ser );
		$('#task-list').modal( 'hide' );
		
		requestAjax( root + 'runningTaskResult/' + taskId, 'json', function( json ) {
			updateViewState( json.runningtask );
		}  )

	//}
}



//a.append( getData().list );

/*
var msnry = new Masonry( document.querySelector('.device-list'), {
      columnWidth: 60
    });
var list = getData().list;

for( i = 0; i < list.length; i++ ) {
	 $( '.device-list' ).append( list[ i ] );
}

$('.grid').masonry({
  // options
  itemSelector: '.each-device',
  columnWidth: 270
});
*/