define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 4,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;

		    //由于这个表格的数据涉及到了修改操作，所以key值为随机数，让react重新创建dom元素
		    //防止jquery缓存data数据
		  	lists = data.netSegmentList.map( function( list, index ) {
		  		return <TableCell key={Math.random()} index={startIndex+index} data={list}/>;
		  	} );

		    if( lists.length === 0 ) {
		      lists = [ <tr key={Math.random()}><td colSpan={colspan}><div className="no-data"><i className="fa fa-exclamation-circle"></i><span className="content">暂无数据</span></div></td></tr> ];
		    } else if( lists.length < CONST.TABLE_MIN_ROW ) {
		    	for( i = CONST.TABLE_MIN_ROW - lists.length; i-- ; ) {
		    		lists.push( <COMMON_FUN.EmptyTr key={CONST.TABLE_MIN_ROW+i} tdNum={colspan} /> );
		    	}
		    }

			return  <table className='table table-bordered'>
			          	<thead>
			            	<tr>
				                <th>序号</th>
								<th>被防护网段</th>
								<th>备注</th>
								<th>操作</th>
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
		      			<td>{data.network}</td>
		            	<td>{data.notes}</td>
		             	<td className="operate"
		             		data-network={data.network}
		             		data-notes={data.notes}>
		             		<button className="u-btn_warning u-radius" data-operate="delete">
		             			<i className="iconfont">&#xe61b;</i> 删除
		             		</button>
		             	</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );
