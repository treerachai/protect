define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 6,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;

		  	lists = data.logList.map( function( list, index ) {
		  		return <TableCell key={index+1} index={startIndex+index} data={list}/>;
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
								<th>时间</th>
								<th>角色</th>
								<th>用户名</th>
								<th>类型</th>
								<th>描述</th>
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
			var data = this.props.data;

		    return  <tr>
		    			<td>{this.props.index}</td>
		      			<td>{COMMON_FUN.formateDate(data.operationTime,'YYYY-MM-DD hh:mm:ss')}</td>
		            	<td>{data.userType}</td>
		             	<td>{data.username}</td>
		             	<td>{data.logType}</td>
		             	<td>{data.logDesc}</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );

