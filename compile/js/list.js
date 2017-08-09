/*假设：
 * 在项目列表页中，不会有新的项目加入进来，这会影响缓存机制
 */

//项目配置信息展示
$( function() {
	var title = $( '#config input[name="title"]' ),
		descrip = $( '#config input[name="descrip"]' ),
		circle = $( '#config input[name="circle"]' ),
		days = $( '#config input[name="days"]' ),
		loading = $( '#config .loading' );
	
	var $cList = $( '.c-list' );
	function fillConfig( data ) {
		var ipArr = [],
			key, $name, $content, tmp;
		
		$cList.hide();
		for( key in data ) {
			$name = $( '.' + key );
			$content = $( '.' + key + ' .c-content');
			switch ( key ) {
				case 'target':
					ipArr = data[ key ].match( /\S+/g );
					ipArr = ipArr.map( function( ip ) {
						return '<p>' + ip + '</p>';
					} );
					$content.html( ipArr.join( '' ) );
					$name.show();
					break;
				case 'protocol':
					if( data[ key ] === 'promis' ) {
						$content.text( 'TCP和UDP' );
					} else {
						$content.text( data[ key ] );
					}
					break;
				case 'scan_type':
					tmp = data[ key ].replace( /(sA|sT|sF|sI|sM|sN|sS|sW|sX)/, 'TCP:' + '$1' ).replace( /(sU)/, 'UDP:' + '$1' ).replace( /(sY)/, 'SCTP:' + '$1' );
					if( tmp !== '' ) {
						$content.text( tmp );
						$name.show();
					}
					break;
				case 'addition_port':
					tmp = data[ key ].replace( /t/i, 'TCP' ).replace( /u/i, 'UDP' ).replace( /s/i, 'SCTP' );
					if( tmp !== '' ) {
						$content.text( tmp );
						$name.show();
					}
					break;
					
				//下面这些的操作是相同的，所以没有在每条后面加break
				case 'enable_topo_probe':
				case 'enable_os_detec':	
				case 'enable_version_detec':
				case 'enable_reboot':
				case 'enable_change':
					data[ key ] === 0 ? $content.text( '否' ) : $content.text( '是' );
					$name.show();
					break;
				case 'projectFlag':
					if( data[ key ] === 0 ) {
						$content.text( '一次性任务' );
					} else {
						$content.text( '周期性任务' );
						$( '.interval .c-content' ).text( data.interval + '天' );
						$( '.interval' ).show();
					}
					$name.show();
					break;
				case 'interval':
					//不用进行任何操作，已经在projectFlag中处理了
					break;
				default:
					if( data[ key ] !== '' ) {
						$content.text( data[ key ] );
						$name.show();
					}
					break;
			}
		}	
	}

	//根据浏览器窗口大小设置项目配置modal框的body高度
	$( '.modal-body' ).css( 'max-height', $( window ).height() - 200 + 'px' );

	//查看项目配置详情
	var cache = {};
	$( '.content' ).delegate( '.config', 'click', function() {
		var id = $( this ).data( 'id' );
		
		$( '#config' ).modal();
		loading.show();
		
		
		if( cache[ id ] != undefined ) {
			fillConfig( cache[ id ] );
			setTimeout( function(){
				$( '.modal-body' ).scrollTop( 0 )
			}, 200 );
			loading.hide();
		} else {
			requestAjax( 'config/' + id, 'json', function( json ) {
				cache[ id ] = json.project;
				fillConfig( cache[ id ] );
				setTimeout( function(){
					$( '.modal-body' ).scrollTop( 0 )
				}, 200 );
				loading.hide();
			}, function() {
				loading.hide();
			} )
		}
	} )
} )

$( function() {
	$( window ).resize( function() {
		//动态改变配置弹窗的高度
		$( '.modal-body' ).css( 'max-height', $( window ).height() - 200 + 'px' );
	} )
} )

//项目列表信息请求及显示
$( function() {
	var timeId = null,
		cache = {},
		noRunning = false; //是否确定没有正在执行的项目
	
	$( '.list' ).delegate( '.operate', 'click', function() {
		var $this = $( this ),
			href = $this.data( 'href' ),
			notice;

		if( href.indexOf( 'command=exec' ) > -1 ) {
			notice = '是否立即执行此项目？';
		} else if( href.indexOf( 'command=stop' ) > -1 ) {
			notice = '是否停止该扫描任务？';
		} else if( href.indexOf( 'command=cancel' ) > -1 ) {
			notice = '是否取消该扫描任务？';
		} else if( href.indexOf( 'delete' ) > -1 ) {
			notice = '此操作会删除该项目的所有信息，是否继续？';
		}
		
		myCancel( notice, function() {
			$this.attr( 'href', $this.data( 'href' ) );
			$this[0].click();
		} )		
	} )
	
	requestPage( 'list/', 1, function( pageInfo ) {
		//需要分页显示
		if( pageInfo.total > pageInfo.perPage ) {
			pagination( 'project-page', Math.ceil( pageInfo.total / pageInfo.perPage ), function( page ) {
				requestPage( 'list/', page, function( pageInfo ) {
					clearTimeout( timeId );
					$( '.list tbody' ).empty();

					handle( pageInfo, page );
				} )

			} );
		}

		handle( pageInfo, 1 );
	} );

	function requestPage( method, page, callBack ) {
		var loading = $( '.loading' ),
			mask = $( '.page-mask' );
		
		changeElemsState( 'show', [ loading, mask ] );
		
		//如果是第一页并且可能有正在执行的项目，或者缓存里没有当前页的数据，动态请求，否则使用缓存
		if( ( page === 1 && noRunning === false ) || cache[ page ] == undefined ) {
			requestAjax( method + page, 'json', function( json ) {
				//只要有正在执行的项目就不缓存
				if( noRunning === true ) {
					cache[ page ] = json.projects;
				}

				callBack( json.projects );
				changeElemsState( 'hide', [ loading, mask ] );
			}, function() {
				changeElemsState( 'hide', [ loading, mask ] );
			} );
			
		} else {
			callBack( cache[ page ] );
			loading.hide();
			mask.hide();
		}
	
	}

	function handle( result, page ) {
		var $content = $( '.list tbody' );

		if( result.items.length === 0 ) {
			noData( $content );
			return;
		}
		
		clearTimeout( timeId );
		
		if( page == 1 ) {
			if( result.items[ 0 ].state === 'running' || result.items[ 0 ].state === 'waiting' ) {
				noRunning = false;
				setTimeout( function() {
					requestPage( 'list/', 1, function( pageInfo ) {
						handle( pageInfo, 1 );
					} )
				}, 5000 )
				
				/*
				loopRequest( 'refreshRuningTask/' + result.items[ 0 ].projectID, function( item ) {
					$( '.running', $content ).remove();
					$content.prepend( getItemTpl( item ) );

					if( item.state === 'running' ) {
						return true;
					}
					
					return false;
				} )*/
			} else {
				noRunning = true;
			}
		} else {
			clearTimeout( timeId );
		}

		addItems( $content.empty(), result.items );
	}

	//when no project to show, show no data
	function noData( $par ) {
		var tpl = '<tr class="center"><td colspan="7">暂无数据</td></tr>';
		$par.append( tpl );
	}

	function addItems( $par, items ) {
		var str = '';
		
		$.each( items, function( _, item ) {
			str += getItemTpl( item );
		} )
		
		$par.append( str );
	}

	function getItemTpl( item ) {
		var stateCode = '',
			runCode = '',
			runClass = '',
			tpl, key, progressCode, state;

		if( item.state === 'error' ) {
			stateCode = '<i class="fa fa-times" style="color: red;"></i>';
			runCode = '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a class="operate" data-href="executecmd/' + item.projectID + '?command=exec">立即执行</a></div>';
		} else if( item.state === 'running' ) {
			stateCode = '<i class="fa fa-spinner rotate" style="color: #000;"></i>';
			runClass = 'running';
			runCode = '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a class="operate" data-href="executecmd/' + item.projectID + '?command=stop">停止项目</a></div>';
		} else if( item.state === 'waiting' ) {
			stateCode = '<i class="fa fa-hourglass-1 roll" style="color: #000;"></i>';
			runCode = '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a class="operate" data-href="executecmd/' + item.projectID + '?command=cancel">取消排队</a></div>';
		} else {
			runCode = '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a class="operate" data-href="executecmd/' + item.projectID + '?command=exec">立即执行</a></div>';
		}
		
		//生成状态信息
		if( item.nextRunTime == -1 ) {
			state = '已完成';
		} else {
			if( item.state === 'running' ) {
				state = '<div>进行中</div><div>第' + 0 + '次执行';
			} else if( item.state === 'waiting' ) {
				state = '<div>排队中</div><div>第' + 0 + '次执行';
			} else {
				state = '<div>下次执行日期:</div><div>' + formateDate( item.nextRunTime, 'YYYY.MM.dd HH:mm:ss' ) + '</div>';
			}
		}
		//生成进度信息
		progressCode = '<div class="progress bg-grey" style="margin-bottom:0;">' +
							'<div class="progress-bar bg-blue" style="width:' + item.progress + '%;white-space:nowrap;">' +
								'<span class="number">' + item.progress + '%</span>' +
								stateCode +
							'</div>' +
						'</div>';
		
		tpl = '<tr class="' + runClass + '">' +
				'<td>' + item.name + '</td>' +
				'<td>' + item.des + '</td>' +
				'<td>' +
					progressCode +
				'</td>' +
				'<td>' + item.result.properties + '</td>' +
				'<td>' + item.result.vuls + '</td>' +
				'<td>' + state + '</td>' +
				'<td style="width:200px;">' + runCode +
					' <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a class="operate" data-href="delete/' + item.projectID + '">删除项目</a></div>' +
					' <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="detail/' + item.projectID + '">项目详情</a></div>' +
					' <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><a href="javascript:;" class="config" data-id="' + item.projectID + '">配置信息</a></div>' +
				'</td>' +
			'</tr>';

		return tpl;
	}

	//循环请求某个url，根据回调函数的返回值来判断是否继续请求
	function loopRequest( url, callBack ) {
		timeId = setTimeout( function call() {
			requestAjax( url, 'json', function( json ) {
				noRunning = !callBack( json.project );
				
				if( !noRunning ) {
					timeId = setTimeout( call, 5000 );
				}
			}, function() {
				timeId = setTimeout( call, 5000 );
			} )
		}, 5000 )
	}
} )


