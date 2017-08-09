define( function( require, exports, module ) {
	var COMMON_FUN = require( 'common' ),
		CONST = require( 'const' );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 8,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1,
		    	i;

		  	lists = data.vulList.map( function( list, index ) {
		  		return React.createElement(TableCell, {key: index, index: startIndex+index, data: list});
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
				                React.createElement("th", null, "序号"), 
								React.createElement("th", null, "漏洞名称"), 
								React.createElement("th", null, "类型"), 
								React.createElement("th", null, "危害"), 
								React.createElement("th", null, "等级"), 
								React.createElement("th", null, "防护状态"), 
								React.createElement("th", null, "设备个数"), 
								React.createElement("th", null, "修复建议")
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
				state = '';

			switch( data.state ) {
				case '已检测':
					state = 'u-success';
					break;
				case '未检测':
					state = 'u-warning';
					break;
				default:
					break;
			}

		    return  React.createElement("tr", null, 
		    			React.createElement("td", null, this.props.index), 
		      			React.createElement("td", {className: "text-l"}, data.name), 
		            	React.createElement("td", null, data.style), 
		             	React.createElement("td", null, data.harm), 
		             	React.createElement("td", null, data.grade), 
		             	React.createElement("td", {className: state}, data.state), 
		             	React.createElement("td", null, data.deviceNum), 
		             	React.createElement("td", null, data.fixedMethod)
		            );
	  	}
	} );

	module.exports = Table;
} );

