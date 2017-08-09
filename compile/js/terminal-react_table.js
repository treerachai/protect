define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 9,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1,
		    	i;

		    //由于这个表格的数据涉及到了修改操作，所以key值为随机数，让react重新创建dom元素
		    //防止jquery缓存data数据
		  	lists = data.guardTerminalList.map( function( list, index ) {
		  		return React.createElement(TableCell, {key: Math.random(), index: startIndex+index, data: list});
		  	} );

		    if( lists.length === 0 ) {
		      lists = [ React.createElement("tr", {key: Math.random()}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
		    } else if( lists.length < CONST.TABLE_MIN_ROW ) {
		    	for( i = CONST.TABLE_MIN_ROW - lists.length; i-- ; ) {
		    		lists.push( React.createElement(COMMON_FUN.EmptyTr, {key: CONST.TABLE_MIN_ROW+i, tdNum: colspan}) );
		    	}
		    }

			return  React.createElement("table", {className: "table table-bordered"}, 
		          	React.createElement("thead", null, 
		            	React.createElement("tr", null, 
			              React.createElement("th", null, "序号"), 
										React.createElement("th", null, "ID"), 
										React.createElement("th", null, "IP"), 
										React.createElement("th", null, "用户名"), 
										React.createElement("th", null, "连接状态"), 
										React.createElement("th", null, "运行状态"), 
										React.createElement("th", null, "当前流量", React.createElement("br", null), "(Mb/s)"), 
										React.createElement("th", null, "当前包量", React.createElement("br", null), "(Kp/s)"), 
										React.createElement("th", null, "操作")
		            	)
		          	), 
				        React.createElement("tbody", null, 
				            lists
				        )
			        );
	  	}
	} );

	var TableCell = React.createClass( {displayName: "TableCell",
	  	render: function() {
			var data  = this.props.data,
				stateClass = '',
				levelHigh = 0.8,			//cpu等使用率过高报警界限
				levelMiddle = 0.6,			//cpu等使用率较高报警界限
				runningStatusHtmlArr, 	//运行状态组合成的dom数组
				key;

			switch( data.connStatus ) {
				case '已连接':
					stateClass = 'u-success';
					break;
				case '未发现终端':
					stateClass = 'u-warning';
					break;
				case '认证信息错误':
					stateClass = 'u-error';
					break;
				case '连接已断开':
					stateClass = 'u-error';
					break;
				default:
					break;
			}

			//得到比例对应的状态
			function getStatusClass( rate ) {
				if( rate > levelHigh ) {
					return 'pu-error';
				} else if( rate > levelMiddle ) {
					return 'pu-warning';
				} else {
					return 'pu-success';
				}
			}

			runningStatusHtmlArr = [
				React.createElement("em", {key: 0, className: "config-item "+getStatusClass(data.cpuUsage)}, 
					"CPU: ", parseInt(data.cpuUsage*100), "%"
				),
				React.createElement("em", {key: 1, className: "config-item "+getStatusClass(data.memUsage)}, 
					"内存: ", parseInt(data.memUsage*100), "%"
				)
			];

			runningStatus = data.runningStatus;
			for( key in runningStatus ) {
				if( runningStatus.hasOwnProperty( key ) ) {
					runningStatusHtmlArr.push(  );
				}
			}

		    return  React.createElement("tr", null, 
		    			React.createElement("td", null, this.props.index), 
		      			React.createElement("td", null, 
		      				React.createElement("div", {className: "pm-id"}, 
		    					React.createElement("span", {className: "pm-title"}, data.termId), 
		    					React.createElement("div", {className: "pm-content"}, data.configDes)
		    				)
		      			), 
		            	React.createElement("td", null, data.ip), 
		            	React.createElement("td", null, data.username), 
		             	React.createElement("td", {className: stateClass}, data.connStatus), 
		             	React.createElement("td", null, runningStatusHtmlArr), 
		             	React.createElement("td", null, COMMON_FUN.convertUnit( data.curMonitorFlowRate, 'M', 1)), 
		             	React.createElement("td", null, COMMON_FUN.convertUnit( data.curMonitorPacketRate, 'K', 1)), 
		             	React.createElement("td", {className: "operate", "data-id": data.termId, "data-ip": data.ip, "data-username": data.username}, 
		             		React.createElement("div", {className: "button-wrapper"}, 
			             		React.createElement("button", {className: "u-btn u-radius", "data-operate": "update"}, React.createElement("i", {className: "iconfont"}, ""), " 修改"), 
			             		React.createElement("button", {className: "u-btn_warning u-radius", "data-operate": "delete"}, React.createElement("i", {className: "iconfont"}, ""), " 删除")
		             		)
		             	)
		            );
	  	}
	} );

	module.exports = Table;
} );

