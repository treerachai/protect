define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 5,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1

		    //由于这个表格的数据涉及到了修改操作，所以key值为随机数，让react重新创建dom元素
		    //防止jquery缓存data数据
		  	lists = data.userList.map( function( list, index ) {
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
								React.createElement("th", null, "角色"), 
								React.createElement("th", null, "用户名"), 
								React.createElement("th", null, "授权IP"), 
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
		getInitialState: function() {
			return {
				isAdmin: this.props.data.userType === 'admin' ? true : false
			};
		},
		getIpTpl: function( ipList ) {
			//将ipList中的ip转换为dom节点，在ip之间加入换行符
			var that = this,
				ipArr = [];

			ipList.map( function( ip, index ) {
				//默认ip
				if( that.state.isAdmin && ip === '192.168.0.234' ) {
					ipArr.push( React.createElement("p", {key: ip+index, className: "default-ip"}, ip) );
				} else {
					ipArr.push( React.createElement("p", {key: ip+index}, ip) );
				}
			} );
			return ipArr;
		},
	  	render: function() {
			var data = this.props.data,
				ip1  = data.ipList[ 0 ] || '',
				ip2  = data.ipList[ 1 ] || '',
				ip3  = data.ipList[ 2 ] || '';
				
			

		    return  React.createElement("tr", null, 
		    			React.createElement("td", null, this.props.index), 
		      			React.createElement("td", null, data.userType), 
		            	React.createElement("td", null, data.username), 
		             	React.createElement("td", null, this.getIpTpl(data.ipList)), 
		             	React.createElement("td", {className: "operate", 
		             		"data-userType": data.userType, 
		             		"data-username": data.username, 
		             		"data-ip1": ip1, 
		             		"data-ip2": ip2, 
		             		"data-ip3": ip3}, 
		             		React.createElement("button", {className: "u-btn u-radius", "data-operate": "update"}, React.createElement("i", {className: "iconfont"}, ""), " 修改")
		             	)
		            );
		}
	} );
	module.exports = Table;
} );

