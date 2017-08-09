define( function( require, exports, module ) {
	/*
	 * 时间同步工作原理:
	 * 为了尽可能准确记录客户端和服务器的时间差，记录请求发出时间sendTime
	 * 和请求完成时间recvTime，recvTime-sendTime为总的请求耗时，ajax请求到
	 * 的服务器时间需要加上请求延迟，才是客户端接收到请求时服务器的'真实'时间
	 */

	var Count 	  = require( 'timeConfig-count' ),
		CONST 	  = require( 'const' ),
		timeLogout= require( 'timeLogout' ),
		$local 	  = $( '.J-local' ),
		$server   = $( '.J-server' ),
		$timeDiff = $( '.time-diff .error' ),
		$okBtn 	  = $( '.ok' ),
		sendTime  = 0,	//发送请求时间
		recvTime  = 0,	//接收到请求时间
		local 	  = null,
		server 	  = null;

	//获取本机电脑当前时间
	function now() {
		return Date.now() || new Date.getTime();
	}

	//获取服务器端事件
	function getServerTime( successCb ) {
		$.ajax( {
			url: 'serverTime',
			dataType: 'JSON'
		} ).done( function( json ) {
			if( json.bizNo > 0 ) {
				successCb && successCb( json.serverTime );
			}
		} )
	}

	//填充误差时间，单位是秒
	function fillDiff( $dom, diff ) {
		$dom.text( Math.floor( ( diff / 1000 ) ) + 's' );
	}

	//绑定确定按钮点击事件
	function bindClick( successCb ) {
		$okBtn.click( function() {
			$okBtn.attr( 'disabled', 'disabled' );
			sendTime = now();

			$.ajax( {
				url: 'adjustTime?time=' + sendTime,
				dataType: 'JSON'
			} ).done( function( json ) {
				if( json.bizNo > 0 ) {
					recvTime = now();
					successCb && successCb( json.serverTime + parseInt( ( recvTime - sendTime ) / 2 ) );
				}
			} ).always( function() {
				$okBtn.removeAttr( 'disabled' );
			} )
		} )
	}
	
	function init() {
		//定时退出
		timeLogout.init();

		sendTime = now();

		//显示本机时间
		local = new Count( $local, sendTime );
		local.start();


		//填充服务器时间
		getServerTime( function( serverTime ) {
			recvTime = now();
			realServerTime = serverTime + parseInt( ( recvTime - sendTime ) / 2 );

			fillDiff( $timeDiff, recvTime - realServerTime );
			
			server = new Count( $server, realServerTime );
			server.start();
		} )

		//绑定点击事件，
		bindClick( function( serverTime ) {
			//更新服务器计时对象当前时间
			server.currentTime = serverTime;
			//填写误差
			fillDiff( $timeDiff, local.currentTime - server.currentTime );
		} );
	}

	init();

} );
