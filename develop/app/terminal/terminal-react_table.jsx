define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 9,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1,
		    	i;

		    //由于这个表格的数据涉及到了修改操作，所以key值为随机数，让react重新创建dom元素
		    //防止jquery缓存data数据
		  	lists = data.guardTerminalList.map( function( list, index ) {
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
										<th>ID</th>
										<th>IP</th>
										<th>用户名</th>
										<th>连接状态</th>
										<th>运行状态</th>
										<th>当前流量<br/>(Mb/s)</th>
										<th>当前包量<br/>(Kp/s)</th>
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
			var data  = this.props.data,
				stateClass = '',
				levelHigh = 0.8,			//cpu等使用率过高报警界限
				levelMiddle = 0.6,			//cpu等使用率较高报警界限
				runningStatusHtmlArr, 	//运行状态组合成的dom数组
				key;

			switch( data.connStatus ) {
				case '已连接':
					stateClass = 'u-success';
					break;
				case '未发现终端':
					stateClass = 'u-warning';
					break;
				case '认证信息错误':
					stateClass = 'u-error';
					break;
				case '连接已断开':
					stateClass = 'u-error';
					break;
				default:
					break;
			}

			//得到比例对应的状态
			function getStatusClass( rate ) {
				if( rate > levelHigh ) {
					return 'pu-error';
				} else if( rate > levelMiddle ) {
					return 'pu-warning';
				} else {
					return 'pu-success';
				}
			}

			runningStatusHtmlArr = [
				<em key={0} className={"config-item "+getStatusClass(data.cpuUsage)}>
					CPU: {parseInt(data.cpuUsage*100)}%
				</em>,
				<em key={1} className={"config-item "+getStatusClass(data.memUsage)}>
					内存: {parseInt(data.memUsage*100)}%
				</em>
			];

			runningStatus = data.runningStatus;
			for( key in runningStatus ) {
				if( runningStatus.hasOwnProperty( key ) ) {
					runningStatusHtmlArr.push(  );
				}
			}

		    return  <tr>
		    			<td>{this.props.index}</td>
		      			<td>
		      				<div className="pm-id">
		    					<span className="pm-title">{data.termId}</span>
		    					<div className="pm-content">{data.configDes}</div>
		    				</div>
		      			</td>
		            	<td>{data.ip}</td>
		            	<td>{data.username}</td>
		             	<td className={stateClass}>{data.connStatus}</td>
		             	<td>{runningStatusHtmlArr}</td>
		             	<td>{COMMON_FUN.convertUnit( data.curMonitorFlowRate, 'M', 1 )}</td>
		             	<td>{COMMON_FUN.convertUnit( data.curMonitorPacketRate, 'K', 1 )}</td>
		             	<td className="operate" data-id={data.termId} data-ip={data.ip} data-username={data.username}>
		             		<div className="button-wrapper">
			             		<button className="u-btn u-radius" data-operate="update"><i className="iconfont">&#xe66e;</i> 修改</button>
			             		<button className="u-btn_warning u-radius" data-operate="delete"><i className="iconfont">&#xe61b;</i> 删除</button>
		             		</div>
		             	</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );

