define( function( require, exports, module ) {
	var CONST	   = require( 'const' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 11,
		    	data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;

		  	lists = data.deviceList.map( function( list, index ) {
		  		//注意key是随机的，因为这个表格有修改的需求
		  		return <TableCell key={Math.random()} index={startIndex+index} data={list}/>;
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
				                <th rowSpan="2">序号</th>
								<th rowSpan="2">Mac</th>
								<th rowSpan="2">IP</th>
								<th rowSpan="2">设备<br/>类型</th>
								<th rowSpan="2">品牌<br/>型号</th>
								<th rowSpan="2">描述</th>
								<th rowSpan="2">在线<br/>状态</th>
								<th colSpan="2">流量(Kb/s)</th>
								<th rowSpan="2">近30日<br/>异常数</th>
								<th rowSpan="2">操作</th>
			            	</tr>
			            	<tr>
			            		<td>发送</td>
			            		<td>接收</td>
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
				stateName = '',
				deviceStateObj = COMMON_FUN.userSetFlag( data.deviceSetState ),
				brandStateObj = COMMON_FUN.userSetFlag( data.brandSetState ),
				deviceClass = 'iconfont ' + deviceStateObj.stateClass,
				brandClass  = 'iconfont ' + brandStateObj.stateClass;
		
			switch( data.linkState ) {
				case 1:
				    stateName = '在线';
					stateClass = 'u-success';
					break;
				case -1:
				    stateName = '离线';
					stateClass = 'u-error';
					break;
				default:
					break;
			}
			var sendFlowRate = COMMON_FUN.convertUnit(data.sendFlowRate, 'K', 1),
					recvFlowRate = COMMON_FUN.convertUnit(data.recvFlowRate, 'K', 1);
		    return  <tr>
		    			<td>{this.props.index}</td>
		      			<td>{data.mac}</td>
		            	<td>{data.ip}</td>
		             	<td className="relative">{data.deviceStyle}<i className={deviceClass}>&#xe6e0;</i></td>
		             	<td className="relative"><span className="ellipsis-span" title={data.brand !== "未识别" ? data.brand : ""}>{data.brand}</span> <i className={brandClass}>&#xe6e0;</i></td>
		             	<td className="relative"><span className="ellipsis-span" title={data.describe}>{data.describe}</span></td>
		             	<td className={stateClass}>{stateName}</td>
		             	<td className="relative"><span className="ellipsis-span" title={sendFlowRate}>{sendFlowRate}</span></td>
		             	<td className="relative"><span className="ellipsis-span" title={recvFlowRate}>{recvFlowRate}</span></td>
		             	<td>{data.abnormalNum === 0
		             			? 0
		             			: <a href={"./abnormal?mac=" + data.mac} className="pu-error" target="_blank">{data.abnormalNum}</a>}</td>
		             	<td className="operate" data-ip={data.ip} data-mac={data.mac} data-deviceStyle={data.deviceStyle} data-brand={data.brand} data-legalState={data.legalState}>
		             		<div className="button-wrapper">
			             		<button title="编辑" className="pu-btn J-update"><i className="iconfont">&#xe66e;</i></button>
			             		<button title="查看" className="pu-btn_success J-link"><i className="iconfont">&#xe609;</i></button>
			             		<button title="删除" className="pu-btn_warning J-delete"><i className="iconfont">&#xe61b;</i></button>
		             		</div>
		             	</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );