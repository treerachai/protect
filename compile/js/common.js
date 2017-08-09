define( function( require, exports, module ) {
	//格式化日期
	function formateDate( oriDate, fmt ) {
	    var date = new Date( +oriDate ),
	        o = {
	            "M+": date.getMonth() + 1,
	            "D+": date.getDate(),
	            "h+": date.getHours(),
	            "m+": date.getMinutes(),
	            "s+": date.getSeconds(),
	            "q+": Math.floor((date.getMonth() + 3) / 3),
	            "S": date.getMilliseconds()
	        };

	    if (/(y+)/i.test(fmt)) {
	        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }

	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        }
	    }
	    
	    return fmt;
	}

	//分页
	function pagenation( id, total, callBack, currentPage ) {
	    var options = {
	        bootstrapMajorVersion: 3,
	        currentPage: currentPage || 1, //当前页数
	        totalPages: total, //总页数
	        numberOfPages: 8,
	        itemTexts: function (type, page, current) {
	        	//控制每个操作按钮的显示文字
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
	            callBack( page );
	        }
	    };
	    return $( '#' + id ).bootstrapPaginator( options );
	}

	//请求url对应的json数据，fun为请求成功回调函数
	function requestAjax( url, dataType, successFun, errorFun ) {
		dataType = dataType || 'text';
		errorFun = errorFun || $.noop;
		
		$.ajax( {
			type: 'GET',
			url: url,
			dataType: dataType,
			success: function( json ) {
				successFun( json );
			},
			error: function() {
				errorFun();
			}
		} );
	}

	//显示或隐藏元素，数据为数组或者单一元素或者多个参数传递。元素为jquery或dom元素
	function changeElemsState( state, elems ) {
		var arg = [].slice.call( arguments, 1 );

		arg.forEach( function( elem ) {
			if( $.type( elem ) === 'array' ) {
				elem.forEach( function( ele ) {
					changeElemsState.apply( null, [ state, ele ] );
				} );
			} else {
				if( state === 'show' ) {
					$( elem ).show();
				} else if( state === 'hide' ) {
					$( elem ).hide();
				}
				
			}
		} );
	}

	//比较两个变量的值是否形式相等，也就是{a:1,b:1}=={a:1,b:1}，主要用来判断数据是否发生改变
	//可以用于动态更新图表，如果数据没有改变则不更新
	function isEqualLike( a, b ) {
	  	if(typeof a == 'number' || typeof b == 'number'){
	        return a === b;
	    }
	    if(typeof a == 'string' || typeof b == 'string'){
	        return a === b;
	    }

	    if( a == null || b ==null ) {
	    	return a == b;
	    }

	    var aProps = Object.getOwnPropertyNames( a );
	    var bProps = Object.getOwnPropertyNames( b );
	 
	    if ( aProps.length != bProps.length ) {
	        return false;
	    }
	    
	    for ( var i = 0; i < aProps.length; i++ ) {
	        var propName = aProps[ i ];
	        if( Object.prototype.toString.call( a[ propName ] ) == '[object Object]' || Object.prototype.toString.call( a[ propName ] ) == '[object Array]' ) {
	            return isEqualLike( a[ propName ],b[ propName ] );
	        } else if( a[ propName ] !== b[ propName ] ) {
	            return false;
	        }
	    }
	    return true;
	}

	function lazyExe( time ) {
		var timeId;
		time = isNaN( parseInt( time ) ) === true ? 100 : parseInt( time );
		
		return function( fn ) {
			clearTimeout( timeId );
			setTimeout( function() {
				fn();
			}, time );
		};
	}

	/*
	 * 单位转换
	 * @param: data {number} 待转换数据
	 * @param: unit {string} 需要转换为K、M、G
	 * @param: fixedLen {number} 保留几位小数
	*/
	function convertUnit( data, unit/*''*/, fixedLen/*0*/ ) {
		var radix = 1024, //进制
			loopLen = {
				def: 0,
				k: 1,
				m: 2,
				g: 3
			},
			i,
			unitVal = data,
			unitArray = [],
			tempVal;

		//是否是数字
		function isNumber( src ) {
			if( typeof src === 'number' ) {
				return true;
			}

			return false;
		}

		if( unit == null ) {
			unit = 'def';
			fixedLen = 0;
		} else if( isNumber( unit ) ) {
			unit = 'def';
			fixedLen = unit;
		} else if( !isNumber( fixedLen ) ) {
			fixedLen = 0;
		}

		unit = unit.toLowerCase();

		//所传单位是否正确，
		if( i = loopLen[ unit ] ) {
			while( i-- ) {
				unitVal /= radix;
			}
		}

		return addSeparator( unitVal, fixedLen );
	}

	function addSeparator( number, fixedLen/*0*/ ) {
		var num = number,
			rSeparator = /(\d{1,3})(?=(\d{3})+$)/g,
			matchRet;
	
		fixedLen = fixedLen || 0;
		num = num.toFixed( fixedLen ).toString();
	
		matchRet = num.split( '.' );
		matchRet[ 0 ] = matchRet[ 0 ].replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,');
	
		return matchRet.length > 1 ? matchRet[ 0 ] + '.' + matchRet[ 1 ] : matchRet[ 0 ];
	}

	//表格空列空列
	var EmptyTr = function( props ) {
		var tdList = [],
			tdNum = props.tdNum || 0,
			i = 0;

		for( ; i < tdNum; i++ ) {
			tdList.push( React.createElement("td", {key: i}, ".") );
		}

		return 	React.createElement("tr", {className: "u-empty_tr"}, 
	    			tdList
	            );
	}
	
	//定义一个判断用户操作状态设置表格标记的功能
	function userSetFlag( colData ){
		var stateinfo, stateClass;
		
		switch( colData ) {
			case -1: //表示系统默认值
			  stateinfo = '系统默认';
				stateClass = 'hideFlag';
				break;
			case 1:  //表示用户操作值
			  stateinfo = '用户操作';
				stateClass = 'showFlag';
				break;
			default:
				break;
		}
		
		return {
			stateinfo  : stateinfo,
			stateClass : stateClass
		}; 
	}

	//深拷贝
	function deepCopy ( source ) {
      var proToString = Object.prototype.toString,
      	ret, key, i;
      
      if( proToString.apply( source ) === '[object Object]' ) {
        ret = {};
        for ( key in source) {
          ret[ key ] = deepCopy( source[ key ] );
          }
      } else if( proToString.apply( source ) === '[object array]' ) {
        ret = [];
        for( i = 0; i < source.length; i++ ) {
          ret[ i ] = deepCopy( source[ i ] );
        }
      } else {
        ret = source;
      }
      
      return ret;
    }

	module.exports = {
		formateDate: formateDate,
		pagenation : pagenation,
		isEqualLike: isEqualLike,
		convertUnit: convertUnit,
		EmptyTr	   : EmptyTr,
		userSetFlag: userSetFlag,
		deepCopy   : deepCopy
	};
} )

