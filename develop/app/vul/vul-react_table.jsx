define( function( require, exports, module ) {
	var COMMON_FUN = require( 'common' ),
		CONST = require( 'const' );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 8,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1,
		    	i;

		  	lists = data.vulList.map( function( list, index ) {
		  		return <TableCell key={index} index={startIndex+index} data={list}/>;
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
				                <th>序号</th>
								<th>漏洞名称</th>
								<th>类型</th>
								<th>危害</th>
								<th>等级</th>
								<th>防护状态</th>
								<th>设备个数</th>
								<th>修复建议</th>
			            	</tr>
			          	</thead>
				        <tbody>
				            {lists}
				        </tbody>
			        </table>;
	  	}
	} );

	var TableCell = React.createClass( {
	  	render: function() {
			var data  = this.props.data,
				state = '';

			switch( data.state ) {
				case '已检测':
					state = 'u-success';
					break;
				case '未检测':
					state = 'u-warning';
					break;
				default:
					break;
			}

		    return  <tr>
		    			<td>{this.props.index}</td>
		      			<td className="text-l">{data.name}</td>
		            	<td>{data.style}</td>
		             	<td>{data.harm}</td>
		             	<td>{data.grade}</td>
		             	<td className={state}>{data.state}</td>
		             	<td>{data.deviceNum}</td>
		             	<td>{data.fixedMethod}</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );

