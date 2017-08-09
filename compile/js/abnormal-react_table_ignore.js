define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' ),
		Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) );

	var Table = React.createClass( {displayName: "Table",
  	render: function() {
	  	var lists = [],
	    	colspan = 6,
			data = this.props.data,
	    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;
			
	  	lists = data.ignoreAbnormalList.map( function( list, index ) {
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
		                React.createElement("th", {className: "ignore-th-index"}, "序号"), 
										React.createElement("th", {className: "ignore-th-type"}, "类型"), 
										React.createElement("th", {className: "ignore-th-source"}, "源"), 
										React.createElement("th", {className: "ignore-th-target"}, "目的"), 
										React.createElement("th", {className: "ignore-th-desc"}, "描述"), 
										React.createElement("th", {className: "ignore-th-btn"}, "操作")
	            	)
	          	), 
			        React.createElement("tbody", null, 
			            lists
			        )
		        );
	  	}
	} );

	var TableCell = React.createClass( {displayName: "TableCell",
		handleClick: function() {
			var that = this;

			$('body').trigger('beforeHandleAbnormal');
			pop.on( '.cancel', 'click.pop-cancel', function() {
				$('body').trigger('cancelHandleAbnormal');
			});

			pop.warning('移除后将继续监控该类异常, 是否移除?');
			pop.on( '.ok', 'click', function() {
				$.ajax({
					url: 'deleteIgnoreAbnormal?id=' + that.props.data.id + '&sameAbnormalFlag=' + that.props.data.sameAbnormalFlag,
					dataType: 'JSON'
				}).then(function(json) {
					if(json.bizNo > 0) {
						that.setState({
							isHandled: 1
						});
						pop.hide(function() {
							pop.success('移除成功!');
						});
						$('body').trigger('handleIgnoreSuccess');
					} else {
						pop.hide(function(){
							pop.error(json.bizMsg || '移除失败!');
						})
					}
				}, function() {
					pop.hide(function(){
						pop.error('移除失败!');
					})
				});
			});
		},
	  	render: function() {
			var data = this.props.data; 
		    return  React.createElement("tr", null, 
		              React.createElement("td", null, this.props.index), 
		            	React.createElement("td", null, data.type), 
		             	React.createElement("td", null, data.sourceIp, React.createElement("br", null), data.sourceMac), 
		             	React.createElement("td", null, data.targetIp, React.createElement("br", null), data.targetMac), 
		             	React.createElement("td", {className: "ignore-td-desc"}, data.desc), 
		             	React.createElement("td", null, React.createElement("button", {className: "u-btn", onClick: this.handleClick}, "移除"))
		            );
	  	}
	} );

	module.exports = Table;
} );

