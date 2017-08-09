define( function( require, exports, module ) {
	var CONST      = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
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
		  			lists.push( <TableCells key={''+index+item} pos={index+'-'+item} type={list.type} index={item} rowSpan={rowSpan} data={typeItem} isEditing={isEditing}/> );
		  		} )
		  	} );

		    if( lists.length === 0 ) {
		      lists = [ <tr key="0"><td colSpan={colspan}><div className="no-data"><i className="fa fa-exclamation-circle"></i><span className="content">暂无数据</span></div></td></tr> ];
		    } else if( lists.length < CONST.TABLE_MIN_ROW ) {
		    	for( i = CONST.TABLE_MIN_ROW - lists.length; i-- ; ) {
		    		lists.push( <COMMON_FUN.EmptyTr key={CONST.TABLE_MIN_ROW+i} tdNum={colspan} /> );
		    	}
		    }

			return  <table className='table table-bordered'>
			          	<thead>
			            	<tr>
				                <th>类型</th>
								<th>检测项</th>
								<th>说明</th>
								<th>报警设置</th>
			            	</tr>
			          	</thead>
				        <tbody>
				            {lists}
				        </tbody>
			        </table>;
	  	}
	} );

	var TableCells = React.createClass( {
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
				return  <tr>
			      			<td rowSpan={rowSpan}>{type}</td>
			            	<td>{name}</td>
			            	<td>{des}</td>
			            	<td key={getRandom()}><Grade alarmLevel={data.alarmLevel} isEditing={isEditing} pos={pos}/></td>
			            </tr>;
			}

			return  <tr>
		            	<td>{name}</td>
		            	<td>{des}</td>
		            	<td key={getRandom()}><Grade alarmLevel={data.alarmLevel} isEditing={isEditing} pos={pos}/></td>
		            </tr>;
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

		return 	<select className="bs-select form-control alarmLevel" data-show-subtext="true" defaultValue={props.alarmLevel}>
                    <option data-content={'<span data-value="0" '+'data-pos='+props.pos+' class="pm-option closed">关闭 <span class="dot"></span></span>'}>0</option>
                    <option data-content={'<span data-value="1" '+'data-pos='+props.pos+' class="pm-option one">一级 <span class="dot"></span></span>'}>1</option>
                    <option data-content={'<span data-value="2" '+'data-pos='+props.pos+' class="pm-option two">二级 <span class="dot"></span></span>'}>2</option>
                    <option data-content={'<span data-value="3" '+'data-pos='+props.pos+' class="pm-option three">三级 <span class="dot"></span></span>'}>3</option>
                </select>;
	};

	//获取随机数
	function getRandom() {
		return '' + Math.random() + Math.random();
	}

	module.exports = Table;
} );

