define( function( require, exports, module ) {
	var CONST	   = require( 'const' ),
		COMMON_FUN = require( 'common' ),
		dot        = require( 'dot' );

	var Table = React.createClass( {
		componentWillUpdate: function() {
			$( '.more' ).remove();
			$( '.less' ).remove();
		},
		componentDidMount: function() {
			$( '.dot' ).dot();
		},
		componentDidUpdate: function() {
			$( '.dot' ).dot();
		},
	  	render: function() {
		  	var lists = [],
		    	colspan = 5,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1,
		    	i;

		    //遍历serviceList，填充表格
		  	data.netServiceList.map( function( list, index ) {
		  		var rowSpan = list.portList.length;

		  		list.portList.map( function( portItem, item ) {
		  			lists.push( <TableCells key={''+index+item} service={list.service} index={startIndex+index} item={item} rowSpan={rowSpan} data={portItem}/> );
		  		} );
		  	} );

		  	//如果没有数据，填写暂无数据信息，如果表格行数小于CONST.TABLE_MIN_ROW
		  	//填充空白行
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
												<th>服务名</th>
												<th>端口</th>
												<th>数量</th>
												<th>设备ip</th>	
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
			var data = this.props.data,
				ipList = data.ipList.join(', '),
				isShowMoreBtn = data.ipList.length > 10 ? true : false,
				item = this.props.item,
				index = this.props.index,
				rowSpan = this.props.rowSpan,
				service = this.props.service;

			//mac对应的第一个行（index为0）需要设置rowspan，其他行不需要设置rowspan
			if( item === 0 ) {
				return  <tr>
			            <td rowSpan={rowSpan}>{index}</td>
			      			<td rowSpan={rowSpan}>{service}</td>
		            	<td>{data.port}</td>
		            	<td>{data.num}</td>
		             	<td>
		             		<div key={Math.random()} className="dot-wrap">
	             				<div className="dot">{ipList}</div>
	             			</div>
	             		</td>
			           </tr>;
			}

			return  <tr>
	            	<td>{data.port}</td>
	            	<td>{data.num}</td>
	             	<td>
	             		<div key={Math.random()} className="dot-wrap">
             				<div className="dot">{ipList}</div>
             			</div>
	             	</td>
	            </tr>;
	  	}
	} );

	module.exports = Table;
} );

