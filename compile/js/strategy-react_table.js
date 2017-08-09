define( function( require, exports, module ) {
	var Deliver    = require( 'subscribe' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
		getInitialState: function() {
			return {
				data: [
						{
							vulName          : 'asdg', 
							scriptUploadTime : 21564645445, 
							alertType        : '一级'
						}
					],
				startIndex: 1
			};
		},
		componentDidMount: function() {
			//注册函数
			var updateState = function( data ) {
				this.setState( {
					data: data.terminalList,
					startIndex: ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage
				} );
			};
			Deliver.subscribe( updateState.bind( this ), this.props.pub );
		},
	  	render: function() {
		  	var lists = [],
		    	colspan = 6,
		    	startIndex = this.state.startIndex;

		  	lists = this.state.data.map( function( list, index ) {
		  		return React.createElement(TableCell, {key: index+1, index: startIndex+index+1, data: list});
		  	} );

		    if( lists.length === 0 ) {
		      lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
		    }

			return  React.createElement("table", {className: "table table-bordered"}, 
			          	React.createElement("thead", null, 
			            	React.createElement("tr", null, 
				                React.createElement("th", null, "序号"), 
                                React.createElement("th", null, "漏洞名"), 
                                React.createElement("th", null, "脚本上传时间"), 
                                React.createElement("th", null, "报警设置")
			            	)
			          	), 
				        React.createElement("tbody", null, 
				            lists
				        )
			        );
	  	}
	} );

	var TableCell = React.createClass( {displayName: "TableCell",
		getOption: function( value ) {
			return React.createElement("select", {defaultValue: value, disabled: true}, 
					React.createElement("option", {defaultValue: "关闭"}, "关闭"), 
					React.createElement("option", {defaultValue: "一级"}, "一级"), 
					React.createElement("option", {defaultValue: "二级"}, "二级"), 
					React.createElement("option", {defaultValue: "三级"}, "三级")
				   );
		},
	  	render: function() {
			var data = this.props.data;

		    return  React.createElement("tr", null, 
		    			React.createElement("td", null, this.props.index), 
		            	React.createElement("td", null, data.vulName), 
		      			React.createElement("td", null, 
		      				COMMON_FUN.formateDate(data.scriptUploadTime,'YYYY-MM-DD hh:mm:ss'), 
		      				React.createElement("input", {className: "float-left hidden", type: "file", name: data.vulName})
		      			), 
		             	React.createElement("td", null, this.getOption(data.alertType))
		            );
	  	}
	} );

	module.exports = Table;
} );

