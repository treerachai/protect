define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' ),
		Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 7,
				data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;
				
		  	lists = data.abnormalList.map( function( list, index ) {
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
								React.createElement("th", null, "类型"), 
								React.createElement("th", null, "源"), 
								React.createElement("th", null, "目的"), 
								React.createElement("th", null, "描述"), 
								React.createElement("th", null, "状态")
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
				id: this.props.data.id,
				isHandled: this.props.data.checkFlag
			}
		},
		componentWillReceiveProps: function(nextProps) {
			this.setState({
				id: nextProps.data.id,
				isHandled: nextProps.data.checkFlag
			});
		},
		handleClick: function() {
			var that = this;

			$('body').trigger('beforeHandleAbnormal');
			pop.on( '.cancel', 'click.pop-cancel', function() {
				$('body').trigger('cancelHandleAbnormal');
			});

			pop.warning('是否将此异常报警状态置为已处理?');
			pop.on( '.ok', 'click', function() {
				$.ajax({
					url: 'handleAbnormal?id=' + that.state.id,
					dataType: 'JSON'
				}).then(function(json) {
					if(json.bizNo > 0) {
						that.setState({
							isHandled: 1
						});
						pop.hide(function() {
							pop.success('处理成功!');
						});
						$('body').trigger('handleAbnormalSuccess');
					} else {
						pop.hide(function(){
							pop.error('处理失败!');
						})
					}
				}, function() {
					pop.hide(function(){
						pop.error('处理失败!');
					})
				});
			});
		},
	  	render: function() {
			var data = this.props.data; 
		    return  React.createElement("tr", null, 
		                React.createElement("td", null, this.props.index), 
		      			React.createElement("td", null, COMMON_FUN.formateDate(data.startTime,'YYYY-MM-DD hh:mm:ss')), 
		            	React.createElement("td", null, data.type), 
		             	React.createElement("td", null, data.sourceIp), 
		             	React.createElement("td", null, data.targetIp), 
		             	React.createElement("td", null, data.desc), 
		             	React.createElement("td", null, this.state.isHandled === -1
		             			? React.createElement("button", {className: "u-btn", onClick: this.handleClick}, "未处理")
		             			: '已处理')
		            );
	  	}
	} );

	module.exports = Table;
} );

