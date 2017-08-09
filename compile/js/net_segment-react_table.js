define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 4,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;

		    //由于这个表格的数据涉及到了修改操作，所以key值为随机数，让react重新创建dom元素
		    //防止jquery缓存data数据
		  	lists = data.netSegmentList.map( function( list, index ) {
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
								React.createElement("th", null, "被防护网段"), 
								React.createElement("th", null, "备注"), 
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
			var data = this.props.data;

		    return  React.createElement("tr", null, 
		    			React.createElement("td", null, this.props.index), 
		      			React.createElement("td", null, data.network), 
		            	React.createElement("td", null, data.notes), 
		             	React.createElement("td", {className: "operate", 
		             		"data-network": data.network, 
		             		"data-notes": data.notes}, 
		             		React.createElement("button", {className: "u-btn_warning u-radius", "data-operate": "delete"}, 
		             			React.createElement("i", {className: "iconfont"}, ""), " 删除"
		             		)
		             	)
		            );
	  	}
	} );

	module.exports = Table;
} );
