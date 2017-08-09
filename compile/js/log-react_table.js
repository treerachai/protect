define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 6,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;

		  	lists = data.logList.map( function( list, index ) {
		  		return React.createElement(TableCell, {key: index+1, index: startIndex+index, data: list});
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
								React.createElement("th", null, "时间"), 
								React.createElement("th", null, "角色"), 
								React.createElement("th", null, "用户名"), 
								React.createElement("th", null, "类型"), 
								React.createElement("th", null, "描述")
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
			var data = this.props.data;

		    return  React.createElement("tr", null, 
		    			React.createElement("td", null, this.props.index), 
		      			React.createElement("td", null, COMMON_FUN.formateDate(data.operationTime,'YYYY-MM-DD hh:mm:ss')), 
		            	React.createElement("td", null, data.userType), 
		             	React.createElement("td", null, data.username), 
		             	React.createElement("td", null, data.logType), 
		             	React.createElement("td", null, data.logDesc)
		            );
	  	}
	} );

	module.exports = Table;
} );

