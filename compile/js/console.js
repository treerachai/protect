$( function() {
	var webSocket;
	//@print{"progress":"","data":"asg"}
	/*
	$( '.console .ctrl' ).click( function() {
		 $( '.console' ).toggleClass( 'show' );
	} );
	*/alert(2)
	var consoles = $( '.console' );
	$( 'input[name="ctrl"]' ).change( function() {
			consoles.toggleClass( 'show' );
	} );
	
	var socket = ( function() {
		var errorCount = 0, //记录websocket新建次数
			socket = null,
			ret;
		
		var $tab = $( '.tab-content' ),
			tabObj = {
				HD: $( '#tab1' )
			},
			tab1 = $( '#tab1' ),
			tab2 = $( '#tab2' ),
			tab3 = $( '#tab3' ),
			tab4 = $( '#tab4' );
		
		//向元素中追加一条数据
		function appendData( dom, data ) {
			var $dom = $( dom ),
				tpl;
			tpl = '<p>' + data + '</p>';
			$dom.append( tpl );
		}
		
		//设置元素滚动条到底部
		function goToBottom( $dom ) {
			setTimeout( function() {
				$dom.scrollTop( $dom[0].scrollHeight );
			} );
		}
		
		//获取websocket，同时注册错误信息处理等函数
		function getWebSocket( option ) {
			var _socket;
			
			if( 'WebSocket' in window ) {
				_socket = new WebSocket( option.url );
				_socket.onmessage = function( event ) {
					option.message.call( socketObj, event.data );
				};
				_socket.onerror = option.error;
				_socket.onopen = option.open;
				_socket.onclose = option.close;
				
	            return _socket;
	        } else {
	        	myWarning( '您的浏览器太老了，不支持websockt，请更换新版本！' );
	        	return null;
	        }
		}
		
		ret = {
			openSocket: function() {
				if( socket ) {
					return socket;
				}
				
				socket = getWebSocket( {
					url: 'ws://' + location.host + X.root + '/webterminalsocket',
					message: handleMessage,
					error: handleError,
					close: handleClose,
					open: handleOpen
				} );
				return socket;
			},
			//处理websocket返回的信息
			handleMessage: function ( data ) {
				appendData( tab1, data );
				appendData( tab2, data );
				appendData( tab3, data );
				appendData( tab4, data );
				
				goToBottom( $tab );
			},
			handleError: function () {
				if( errorCount++ < 20 ) {
					console.log( errorCount );
					setTimeout( function() {
						socket = this.openSocket();
					}.bind( this ), 3000 );
				}
			},
			handleOpen: function() {
				errorCount = 0;
			},
			handleClose: this.handleError
		};

		return ret;
	} )();
	
	socket.openSocket();

	/*
	//点击tab按钮，让控制台滚动条滚动到底部
	$( '.console .nav-tabs a' ).click( function() {
		goToBottom( $tab );
	} );
	*/
	
	
} );