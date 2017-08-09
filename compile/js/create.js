$( function() {
	var config = $( '#config' ),
		validateObj;
	
	$( '.cycle-trl' ).change( function() {
		var val = $( this ).val(),
			$cycle = $( '#config .cycle' ),
			$interval = $( 'input[name="interval"]' );

		if( val === '0' ) {
			$cycle.hide();
			$interval.attr( 'disabled', 'disabled' );

		} else {
			$cycle.show();
			$interval.removeAttr( 'disabled' );
		}
	} )
	
	$( 'input[name="tcpTmp"]' ).change( function() {
		checkScanType();
	} )
	$( 'input[name="udpTmp"]' ).change( function() {
		checkScanType();
	} )
	$( 'input[name="sctpTmp"]' ).change( function() {
		checkScanType();
	} )
	$( 'select[name="tcpList"]' ).change( function() {
		checkScanType();
	} )
	
	$( '#config .show' ).click( function() {
		var $this = $( this ),
			emptyFlag = true,
			$for = $( $this.data( 'for' ) );
		
		if( $for.css( 'display' ) === 'none' ) {
	
			$for.show();
		} else {
			$( 'input', $for ).each( function( _, elem ) {
				if( $( elem ).val() !== '' ) {
					emptyFlag = false;
				}
				
				if( emptyFlag ) {
					$for.hide();
				}
			} )
		}
		
		
	} )
	
	//检验scanType，三种类型至少选择一种
	//@input: none
	//@output: boolean
	function checkScanType() {
		var $scanType = $( 'input[name="scan_type"]' ),
			val;
		
		val = getScanTypeVal();
		$scanType.val( val );
		
		if( val === '' ) {
			return false;
		}
		return true;
	}
	
	//生成扫描类型需要的数据格式
	function getScanTypeVal() {
		var $tcpTmp = $( 'input[name="tcpTmp"]' ),
			$udpTmp = $( 'input[name="udpTmp"]' ),
			$sctpTmp = $( 'input[name="sctpTmp"]' ),
			$scanTypeError = $( '#scan-type-error' ),
			ret = '',
			emptyFlag = true;
		
		if( $tcpTmp.is( ':checked' ) ) {
			ret += $( 'select[name="tcpList"]' ).val() + ' ';
			emptyFlag = false;
		}
		if( $udpTmp.is( ':checked' ) ) {
			ret += $udpTmp.val() + ' ';
			emptyFlag = false;
		}
		if( $sctpTmp.is( ':checked' ) ) {
			ret += $sctpTmp.val() + ' ';
			emptyFlag = false;
		}
		
		if( emptyFlag ) {
			$scanTypeError.show();
		} else {
			$scanTypeError.hide();
		}
		
		return ret.trim();
	}
	
	//生成服务类型检测中的额外类型格式
	function getAdditionPort() {
		var tcpVal = $( 'input[name="additionTcpTmp"]' ).val().trim(),
			udpVal = $( 'input[name="additionUdpTmp"]' ).val().trim(),
			sctpVal = $( 'input[name="additionSctpTmp"]' ).val().trim(),
			ret = '';
		
		if( tcpVal !== '' ) {
			ret += 'T:' + tcpVal + ' ';
		}
		if( udpVal !== '' ) {
			ret += 'U:' + udpVal + ' ';
		}
		if( sctpVal !== '' ) {
			ret += 'S:' + sctpVal + ' ';
		}

		return ret.trim();
	}

	$.validator.addMethod( "ip", function( value, element, params ) {
		var cidrReg = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\/(?:3[0-1]|[1-2]?\d))?)$/,
			ipReg = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?)$/,
			ipArr = value.trim().split( /\s+/ ),
			i;
			
		for( i = 0; i < ipArr.length; i++ ) {
			if( cidrReg.test( ipArr[ i ] ) || ipReg.test( ipArr[ i ] ) ) {
				continue;
			}
			return false;
		}

		return true;

	}, "输入格式不正确");
	$.validator.addMethod( "port", function( value, element, params ) {
		var portReg = /^(?:\d+(?:-\d+)?)(?:\s+(?:\d+(?:-\d+)?)){0,}$/;
		
		value = value.trim();

		if( value === '' || portReg.test( value ) ) {
			return true;
		}

		return false;
	}, "输入格式不正确");
	$.validator.addMethod( "scanType", function( value, element, params ) {
		var portReg = /^(?:\d+(?:-\d+)?)(?:\s+(?:\d+(?:-\d+)?)){0,}$/;
		
		value = value.trim();

		if( value === '') {
			return false;
		}

		return true;
	}, "请至少选择一种扫描类型");

	validateObj = config.validate( {
	    rules: {
	    	name: {
	    		required: true,
	    		remote: {
                    type: "GET",
                    url: "checkProjectValid",
                    dataType: "json",
                    data: {
                        name: function () {
                            return $( 'input[name="name"]' ).val();
                        }
                    }
                }
	    	}, 
	    	//describe: 'required',
	    	target: {
	    		required: true,
	    		ip: true
	    	},
	    	hd_addition_port_tcp: {
	    		port: true
	    	},
	    	hd_addition_port_udp: {
	    		port: true
	    	},
	    	sd_addition_port_tcp: {
	    		port: true
	    	},
	    	sd_addition_port_udp: {
	    		port: true
	    	},
	    	scan_type: {
	    		scanType: true,	    		
	    	},
	    	top_ports: {
	    		required: true,
	    		number: true,
	    		range: [1, 1000]
	    	},
	    	additionTcpTmp: {
	    		port: true
	    	},
	    	additionUdpTmp: {
	    		port: true
	    	},
	    	additionSctp: {
	    		port: true
	    	},
	    	exclude_ports: {
	    		port: true
	    	},
	    	interval: {
	     		required: true,
	     		range: [1, 1000]
	     	}
	 	},
	 	messages: {
	 		title: {
                remote: "该项目名称已存在！"
	 		},
	 		interval: {
	 			range: '周期间隔应在1~999之间！'
	 		}
	 	},
	 	onkeyup: false,//这个地方要注意，修改去控制器验证的事件。
	 	ignore: '.ignore'
	} );
	
	//选项卡切换时验证表单是否正确，不正确的话禁止切换
	$( '.nav-tabs li' ).click( function( e ) {
		//changeIgnore( $( this ).index() );
		if( !config.valid() ) {
			validateObj.focusInvalid();;
			return false;
		}
	} )
	
	$( '.submit' ).click( function() {
		//changeIgnore( false );
		if( config.valid() ) {
			return true;
		} else {
			return false;
			//myError( '内容填写错误，请重新填写再提交！' );
		}
	} )
		
	//更改所有页ignore类，如果参数是布尔值 false，则去掉所有的ignore
	function changeIgnore( currentPage ) {
		var totalPage = $( '.page' ).length,
			$dom,
			i;
		
		if( currentPage === false ) {
			$( '.page input' ).removeClass( 'ignore' );
			return;
		}
		
		for( i = 0; i < totalPage; i++ ) {
			$dom = $( '.page' + i );

			if( i === currentPage ) {
				$( 'input', $dom ).removeClass( 'ignore' );
			} else {
				$( 'input', $dom ).addClass( 'ignore' );
			}
		}
	}
	
} )


/*
 * 翻页配置效果，后来改为选项卡效果 
 */
/*
$( function() {
	var currentPage = 1,
	totalPage = $( '.page' ).length,
	$config = $( '#config' ),
	$step = $( '.control .step' ),
	i;
	
	var slide = ( function( par ) {
		var left = 0,
			totalPage =$( '.page', par ).length,
			perWidth = $( '.content', par ).width(),
			$content = $( '.content', par );

		$( '.page', par ).outerWidth( perWidth );
		$content.outerWidth( perWidth * totalPage );
		
		return {
			//上一页
			pre: function() {
				left = left + perWidth;
				$content.css( 'left', left + 'px' );
			},
			//下一页
			next: function() {
				
				left = left - perWidth;
				$content.css( 'left', left + 'px' );
			}
		}
	} ) ( $( '.page-wrap' ) );
	
	
	changeIgnore( currentPage );

	$( '.next' ).click( function() {
		
		if( $config.valid() ) {
			$( '.pre' ).removeAttr( 'disabled' );
			if( currentPage === totalPage ) {
				$( '#config' ).submit();
			} else {
				currentPage += 1;
				changeIgnore( currentPage );
				slide.next();
				
				if( currentPage === totalPage ) {
					$( this ).text( '提交' );
				}
			}
			$step.text( currentPage + '/' + totalPage );
		}
	} )
	$( '.pre' ).click( function() {
		currentPage -= 1;
		slide.pre();
		changeIgnore( currentPage );
		
		if( currentPage === 1 ) {
			$( this ).attr( 'disabled', 'disabled' );
		}
		$step.text( currentPage + '/' + totalPage );
		$( '.next' ).text( '下一页' );
		
	} )
	
	
	//更改所有页ignore类
	function changeIgnore( currentPage ) {
		var totalPage = $( '.page' ).length,
			$dom,
			i;
		
		for( i = 1; i <= totalPage; i++ ) {
			$dom = $( '.page' + i );
			
			if( i === currentPage ) {
				$( 'input', $dom ).removeClass( 'ignore' );
			} else {
				$( 'input', $dom ).addClass( 'ignore' );
			}
		}
	}
} )*/
