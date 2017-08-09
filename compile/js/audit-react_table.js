define( function( require, exports, module ) {
	var Deliver    = require( 'subscribe' ),
		CONST      = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 4,
		    	data = this.props.auditData,
		    	isEditing = this.props.isEditing;

		  	//返回的结果需要存储在lists数组中，由于react只接受元素、数组因此需要将每个tr push到数组中，由于涉及到单元格的合并，因此不能像其他地方一样等于map的返回值
		  	data.map( function( list, index ) {
		  		var rowSpan = list.typeList.length;
		  		
		  		list.typeList.map( function( typeItem, item ) {
		  			lists.push( React.createElement(TableCells, {key: ''+index+item, pos: index+'-'+item, type: list.type, index: item, rowSpan: rowSpan, data: typeItem, isEditing: isEditing}) );
		  		} )
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
				                React.createElement("th", null, "类型"), 
								React.createElement("th", null, "范围"), 
								React.createElement("th", null, "禁止规则"), 
								React.createElement("th", null, "报警设置")
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
			var data  = this.props.data,
				index = this.props.index,
				pos = this.props.pos,   //表格的第几行
				rowSpan = this.props.rowSpan,   //合并几行tr
				type = this.props.type,
				isEditing = this.props.isEditing,
				scopeArr = data.scope.split( '@' ),
				scopeRender = scopeArr[ 0 ],
				rulesList = [];

			rulesList = data.rulesList.map( function( rule, index ) {
				return React.createElement(Rule, {key: getRandom(), rule: rule, isEditing: isEditing, pos: pos+'-'+index})
			} )

			//判断是否是通信审计
			if( scopeArr.length > 1 ) {
				scopeRender = React.createElement(Communication, {range: scopeArr});
			}

			//type对应的第一个行（index为0）需要设置rowspan，其他行不需要设置rowspan
			if( index === 0 ) {
				return  React.createElement("tr", null, 
			      			React.createElement("td", {rowSpan: rowSpan}, type), 
			            	React.createElement("td", null, scopeRender), 
			            	React.createElement("td", {className: "text-l"}, rulesList), 
			            	React.createElement("td", {key: getRandom()}, React.createElement(Grade, {alarmLevel: data.alarmLevel, isEditing: isEditing, pos: pos}))
			            );
			}

			return  React.createElement("tr", null, 
		            	React.createElement("td", null, scopeRender), 
		            	React.createElement("td", {className: "text-l"}, rulesList), 
		            	React.createElement("td", {key: getRandom()}, React.createElement(Grade, {alarmLevel: data.alarmLevel, isEditing: isEditing, pos: pos}))
		            );
	  	}
	} );

	//规则
	var Rule = function( props ) {
		return React.createElement("label", null, React.createElement("input", {className: "rule-item", "data-pos": props.pos, "data-text": props.rule.value, type: "checkbox", name: props.rule.value, defaultChecked: props.rule.checked===1?1:0, disabled: props.isEditing?'':'disabled'}), props.rule.value);
	}

	//等级
	var Grade = function( props ) {
		return	React.createElement("select", {className: "alarmLevel", "data-pos": props.pos, defaultValue: props.alarmLevel, disabled: props.isEditing?'':'disabled'}, 
			   		React.createElement("option", {value: "0"}, "关闭"), 
			   		React.createElement("option", {value: "1"}, "一级"), 
			   		React.createElement("option", {value: "2"}, "二级"), 
			   		React.createElement("option", {value: "3"}, "三级")
			   	);
	};

	//获取随机数
	function getRandom() {
		return '' + Math.random() + Math.random();
	}

	//范围中通信组件
	function Communication( props ) {
		return React.createElement("div", {className: "exchange"}, 
				React.createElement("div", {className: "value"}, props.range[0]), 
				React.createElement("div", {className: "iconfont"}, ""), 
				React.createElement("div", {className: "value"}, props.range[1])
			   );
	}

	module.exports = Table;
} );

