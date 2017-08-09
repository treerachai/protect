define( function( require, exports, module ) {
	var CONST	   = require( 'const' ),
		COMMON_FUN = require( 'common' ),
		dot        = require( 'dot' );

	var Table = React.createClass( {displayName: "Table",
		componentWillUpdate: function() {
			$( '.more' ).remove();
			$( '.less' ).remove();
		},
		componentDidMount: function() {
			$( '.dot' ).dot();
		},
		componentDidUpdate: function() {
			$( '.dot' ).dot();
		},
	  	render: function() {
		  	var lists = [],
		    	colspan = 5,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1,
		    	i;

		    //遍历serviceList，填充表格
		  	data.netServiceList.map( function( list, index ) {
		  		var rowSpan = list.portList.length;

		  		list.portList.map( function( portItem, item ) {
		  			lists.push( React.createElement(TableCells, {key: ''+index+item, service: list.service, index: startIndex+index, item: item, rowSpan: rowSpan, data: portItem}) );
		  		} );
		  	} );

		  	//如果没有数据，填写暂无数据信息，如果表格行数小于CONST.TABLE_MIN_ROW
		  	//填充空白行
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
												React.createElement("th", null, "服务名"), 
												React.createElement("th", null, "端口"), 
												React.createElement("th", null, "数量"), 
												React.createElement("th", null, "设备ip")	
			            	)
			          	), 
				        React.createElement("tbody", null, 
				            lists
				        )
			        );
	  	}
	} );

	var TableCells = React.createClass( {displayName: "TableCells",
	  	render: function() {
			var data = this.props.data,
				ipList = data.ipList.join(', '),
				isShowMoreBtn = data.ipList.length > 10 ? true : false,
				item = this.props.item,
				index = this.props.index,
				rowSpan = this.props.rowSpan,
				service = this.props.service;

			//mac对应的第一个行（index为0）需要设置rowspan，其他行不需要设置rowspan
			if( item === 0 ) {
				return  React.createElement("tr", null, 
			            React.createElement("td", {rowSpan: rowSpan}, index), 
			      			React.createElement("td", {rowSpan: rowSpan}, service), 
		            	React.createElement("td", null, data.port), 
		            	React.createElement("td", null, data.num), 
		             	React.createElement("td", null, 
		             		React.createElement("div", {key: Math.random(), className: "dot-wrap"}, 
	             				React.createElement("div", {className: "dot"}, ipList)
	             			)
	             		)
			           );
			}

			return  React.createElement("tr", null, 
	            	React.createElement("td", null, data.port), 
	            	React.createElement("td", null, data.num), 
	             	React.createElement("td", null, 
	             		React.createElement("div", {key: Math.random(), className: "dot-wrap"}, 
             				React.createElement("div", {className: "dot"}, ipList)
             			)
	             	)
	            );
	  	}
	} );

	module.exports = Table;
} );

