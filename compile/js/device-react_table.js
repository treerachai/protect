define( function( require, exports, module ) {
	var CONST	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 11,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;

		  	lists = data.deviceList.map( function( list, index ) {
		  		//注意key是随机的，因为这个表格有修改的需求
		  		return React.createElement(TableCell, {key: Math.random(), index: startIndex+index, data: list});
		  	} );

		    if( lists.length === 0 ) {
		      lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
		    } else if( lists.length < CONST.TABLE_MIN_ROW ) {
		    	for( i = CONST.TABLE_MIN_ROW - lists.length; i-- ; ) {
		    		lists.push( React.createElement(COMMON_FUN.EmptyTr, {key: CONST.TABLE_MIN_ROW+i, tdNum: colspan}) );
		    	}
		    }

			return  React.createElement("table", {className: "table table-bordered"}, 
			          	React.createElement("thead", null, 
			            	React.createElement("tr", null, 
				                React.createElement("th", {rowSpan: "2"}, "序号"), 
								React.createElement("th", {rowSpan: "2"}, "Mac"), 
								React.createElement("th", {rowSpan: "2"}, "IP"), 
								React.createElement("th", {rowSpan: "2"}, "设备", React.createElement("br", null), "类型"), 
								React.createElement("th", {rowSpan: "2"}, "品牌", React.createElement("br", null), "型号"), 
								React.createElement("th", {rowSpan: "2"}, "描述"), 
								React.createElement("th", {rowSpan: "2"}, "在线", React.createElement("br", null), "状态"), 
								React.createElement("th", {colSpan: "2"}, "流量(Kb/s)"), 
								React.createElement("th", {rowSpan: "2"}, "近30日", React.createElement("br", null), "异常数"), 
								React.createElement("th", {rowSpan: "2"}, "操作")
			            	), 
			            	React.createElement("tr", null, 
			            		React.createElement("td", null, "发送"), 
			            		React.createElement("td", null, "接收")
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
				stateName = '',
				deviceStateObj = COMMON_FUN.userSetFlag( data.deviceSetState ),
				brandStateObj = COMMON_FUN.userSetFlag( data.brandSetState ),
				deviceClass = 'iconfont ' + deviceStateObj.stateClass,
				brandClass  = 'iconfont ' + brandStateObj.stateClass;
		
			switch( data.linkState ) {
				case 1:
				    stateName = '在线';
					stateClass = 'u-success';
					break;
				case -1:
				    stateName = '离线';
					stateClass = 'u-error';
					break;
				default:
					break;
			}
			var sendFlowRate = COMMON_FUN.convertUnit(data.sendFlowRate, 'K', 1),
					recvFlowRate = COMMON_FUN.convertUnit(data.recvFlowRate, 'K', 1);
		    return  React.createElement("tr", null, 
		    			React.createElement("td", null, this.props.index), 
		      			React.createElement("td", null, data.mac), 
		            	React.createElement("td", null, data.ip), 
		             	React.createElement("td", {className: "relative"}, data.deviceStyle, React.createElement("i", {className: deviceClass}, "")), 
		             	React.createElement("td", {className: "relative"}, React.createElement("span", {className: "ellipsis-span", title: data.brand !== "未识别" ? data.brand : ""}, data.brand), " ", React.createElement("i", {className: brandClass}, "")), 
		             	React.createElement("td", {className: "relative"}, React.createElement("span", {className: "ellipsis-span", title: data.describe}, data.describe)), 
		             	React.createElement("td", {className: stateClass}, stateName), 
		             	React.createElement("td", {className: "relative"}, React.createElement("span", {className: "ellipsis-span", title: sendFlowRate}, sendFlowRate)), 
		             	React.createElement("td", {className: "relative"}, React.createElement("span", {className: "ellipsis-span", title: recvFlowRate}, recvFlowRate)), 
		             	React.createElement("td", null, data.abnormalNum === 0
		             			? 0
		             			: React.createElement("a", {href: "./abnormal?mac=" + data.mac, className: "pu-error", target: "_blank"}, data.abnormalNum)), 
		             	React.createElement("td", {className: "operate", "data-ip": data.ip, "data-mac": data.mac, "data-deviceStyle": data.deviceStyle, "data-brand": data.brand, "data-legalState": data.legalState}, 
		             		React.createElement("div", {className: "button-wrapper"}, 
			             		React.createElement("button", {title: "编辑", className: "pu-btn J-update"}, React.createElement("i", {className: "iconfont"}, "")), 
			             		React.createElement("button", {title: "查看", className: "pu-btn_success J-link"}, React.createElement("i", {className: "iconfont"}, "")), 
			             		React.createElement("button", {title: "删除", className: "pu-btn_warning J-delete"}, React.createElement("i", {className: "iconfont"}, ""))
		             		)
		             	)
		            );
	  	}
	} );

	module.exports = Table;
} );