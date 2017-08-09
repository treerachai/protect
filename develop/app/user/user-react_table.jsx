define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 5,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1

		    //由于这个表格的数据涉及到了修改操作，所以key值为随机数，让react重新创建dom元素
		    //防止jquery缓存data数据
		  	lists = data.userList.map( function( list, index ) {
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
								<th>角色</th>
								<th>用户名</th>
								<th>授权IP</th>
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
		getInitialState: function() {
			return {
				isAdmin: this.props.data.userType === 'admin' ? true : false
			};
		},
		getIpTpl: function( ipList ) {
			//将ipList中的ip转换为dom节点，在ip之间加入换行符
			var that = this,
				ipArr = [];

			ipList.map( function( ip, index ) {
				//默认ip
				if( that.state.isAdmin && ip === '192.168.0.234' ) {
					ipArr.push( <p key={ip+index} className="default-ip">{ip}</p> );
				} else {
					ipArr.push( <p key={ip+index}>{ip}</p> );
				}
			} );
			return ipArr;
		},
	  	render: function() {
			var data = this.props.data,
				ip1  = data.ipList[ 0 ] || '',
				ip2  = data.ipList[ 1 ] || '',
				ip3  = data.ipList[ 2 ] || '';
				
			

		    return  <tr>
		    			<td>{this.props.index}</td>
		      			<td>{data.userType}</td>
		            	<td>{data.username}</td>
		             	<td>{this.getIpTpl(data.ipList)}</td>
		             	<td className="operate"
		             		data-userType={data.userType}
		             		data-username={data.username}
		             		data-ip1={ip1}
		             		data-ip2={ip2}
		             		data-ip3={ip3}>
		             		<button className="u-btn u-radius" data-operate="update"><i className="iconfont">&#xe66e;</i> 修改</button>
		             	</td>
		            </tr>;
		}
	} );
	module.exports = Table;
} );

