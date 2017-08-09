define( function( require, exports, module ) {
	var CONST      = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {displayName: "Table",
		initDropSelect: function() {
			var $selects = $( '.bs-select.alarmLevel' );
			$selects.selectpicker();

			var $resSelects = $( '.bootstrap-select.alarmLevel' );

			//禁止select下拉菜单的点击事件
            $resSelects.on( 'click.drop', function( event ) {
                event.stopImmediatePropagation();
            } );
			$resSelects.addClass( 'disabled' );
		},
		componentDidMount: function() {
			this.initDropSelect();
		},
		componentDidUpdate: function() {
			this.initDropSelect();
		},
	  	render: function() {
		  	var lists = [],
		    	colspan = 4,
		    	data = this.props.strategyData,
		    	isEditing = this.props.isEditing;

		  	//返回的结果需要存储在lists数组中，由于react只接受元素、数组因此需要将每个tr push到数组中，由于涉及到单元格的合并，因此不能像其他地方一样等于map的返回值
		  	data.map( function( list, index ) {
		  		var rowSpan = list.checkList.length;
		  		
		  		list.checkList.map( function( typeItem, item ) {
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
								React.createElement("th", null, "检测项"), 
								React.createElement("th", null, "说明"), 
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
				name = data.name,
				des = data.des,
				isEditing = this.props.isEditing;

			//type对应的第一个行（index为0）需要设置rowspan，其他行不需要设置rowspan
			if( index === 0 ) {
				return  React.createElement("tr", null, 
			      			React.createElement("td", {rowSpan: rowSpan}, type), 
			            	React.createElement("td", null, name), 
			            	React.createElement("td", null, des), 
			            	React.createElement("td", {key: getRandom()}, React.createElement(Grade, {alarmLevel: data.alarmLevel, isEditing: isEditing, pos: pos}))
			            );
			}

			return  React.createElement("tr", null, 
		            	React.createElement("td", null, name), 
		            	React.createElement("td", null, des), 
		            	React.createElement("td", {key: getRandom()}, React.createElement(Grade, {alarmLevel: data.alarmLevel, isEditing: isEditing, pos: pos}))
		            );
	  	}
	} );

	//等级
	var Grade = function( props ) {
		// return	<select className="alarmLevel" data-pos={props.pos} defaultValue={props.alarmLevel} disabled={props.isEditing?'':'disabled'}>
		// 	   		<option value="0">关闭</option>
		// 	   		<option value="1">一级</option>
		// 	   		<option value="2">二级</option>
		// 	   		<option value="3">三级</option>
		// 	   	</select>;

		return 	React.createElement("select", {className: "bs-select form-control alarmLevel", "data-show-subtext": "true", defaultValue: props.alarmLevel}, 
                    React.createElement("option", {"data-content": '<span data-value="0" '+'data-pos='+props.pos+' class="pm-option closed">关闭 <span class="dot"></span></span>'}, "0"), 
                    React.createElement("option", {"data-content": '<span data-value="1" '+'data-pos='+props.pos+' class="pm-option one">一级 <span class="dot"></span></span>'}, "1"), 
                    React.createElement("option", {"data-content": '<span data-value="2" '+'data-pos='+props.pos+' class="pm-option two">二级 <span class="dot"></span></span>'}, "2"), 
                    React.createElement("option", {"data-content": '<span data-value="3" '+'data-pos='+props.pos+' class="pm-option three">三级 <span class="dot"></span></span>'}, "3")
                );
	};

	//获取随机数
	function getRandom() {
		return '' + Math.random() + Math.random();
	}

	module.exports = Table;
} );

