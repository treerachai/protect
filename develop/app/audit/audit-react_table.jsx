define( function( require, exports, module ) {
	var Deliver    = require( 'subscribe' ),
		CONST      = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 4,
		    	data = this.props.auditData,
		    	isEditing = this.props.isEditing;

		  	//返回的结果需要存储在lists数组中，由于react只接受元素、数组因此需要将每个tr push到数组中，由于涉及到单元格的合并，因此不能像其他地方一样等于map的返回值
		  	data.map( function( list, index ) {
		  		var rowSpan = list.typeList.length;
		  		
		  		list.typeList.map( function( typeItem, item ) {
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
								<th>范围</th>
								<th>禁止规则</th>
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
				isEditing = this.props.isEditing,
				scopeArr = data.scope.split( '@' ),
				scopeRender = scopeArr[ 0 ],
				rulesList = [];

			rulesList = data.rulesList.map( function( rule, index ) {
				return <Rule key={getRandom()} rule={rule} isEditing={isEditing} pos={pos+'-'+index}/>
			} )

			//判断是否是通信审计
			if( scopeArr.length > 1 ) {
				scopeRender = <Communication range={scopeArr} />;
			}

			//type对应的第一个行（index为0）需要设置rowspan，其他行不需要设置rowspan
			if( index === 0 ) {
				return  <tr>
			      			<td rowSpan={rowSpan}>{type}</td>
			            	<td>{scopeRender}</td>
			            	<td className="text-l">{rulesList}</td>
			            	<td key={getRandom()}><Grade alarmLevel={data.alarmLevel} isEditing={isEditing} pos={pos}/></td>
			            </tr>;
			}

			return  <tr>
		            	<td>{scopeRender}</td>
		            	<td className="text-l">{rulesList}</td>
		            	<td key={getRandom()}><Grade alarmLevel={data.alarmLevel} isEditing={isEditing} pos={pos}/></td>
		            </tr>;
	  	}
	} );

	//规则
	var Rule = function( props ) {
		return <label><input className="rule-item" data-pos={props.pos} data-text={props.rule.value} type="checkbox" name={props.rule.value} defaultChecked={props.rule.checked===1?1:0} disabled={props.isEditing?'':'disabled'}/>{props.rule.value}</label>;
	}

	//等级
	var Grade = function( props ) {
		return	<select className="alarmLevel" data-pos={props.pos} defaultValue={props.alarmLevel} disabled={props.isEditing?'':'disabled'}>
			   		<option value="0">关闭</option>
			   		<option value="1">一级</option>
			   		<option value="2">二级</option>
			   		<option value="3">三级</option>
			   	</select>;
	};

	//获取随机数
	function getRandom() {
		return '' + Math.random() + Math.random();
	}

	//范围中通信组件
	function Communication( props ) {
		return <div className="exchange">
				<div className="value">{props.range[0]}</div>
				<div className="iconfont">&#xe60c;</div>
				<div className="value">{props.range[1]}</div>
			   </div>;
	}

	module.exports = Table;
} );

