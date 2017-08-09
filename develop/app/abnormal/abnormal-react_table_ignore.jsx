define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' ),
		Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) );

	var Table = React.createClass( {
  	render: function() {
	  	var lists = [],
	    	colspan = 6,
			data = this.props.data,
	    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;
			
	  	lists = data.ignoreAbnormalList.map( function( list, index ) {
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
		                <th className="ignore-th-index">序号</th>
										<th className="ignore-th-type">类型</th>
										<th className="ignore-th-source">源</th>
										<th className="ignore-th-target">目的</th>
										<th className="ignore-th-desc">描述</th>
										<th className="ignore-th-btn">操作</th>
	            	</tr>
	          	</thead>
			        <tbody>
			            {lists}
			        </tbody>
		        </table>;
	  	}
	} );

	var TableCell = React.createClass( {
		handleClick: function() {
			var that = this;

			$('body').trigger('beforeHandleAbnormal');
			pop.on( '.cancel', 'click.pop-cancel', function() {
				$('body').trigger('cancelHandleAbnormal');
			});

			pop.warning('移除后将继续监控该类异常, 是否移除?');
			pop.on( '.ok', 'click', function() {
				$.ajax({
					url: 'deleteIgnoreAbnormal?id=' + that.props.data.id + '&sameAbnormalFlag=' + that.props.data.sameAbnormalFlag,
					dataType: 'JSON'
				}).then(function(json) {
					if(json.bizNo > 0) {
						that.setState({
							isHandled: 1
						});
						pop.hide(function() {
							pop.success('移除成功!');
						});
						$('body').trigger('handleIgnoreSuccess');
					} else {
						pop.hide(function(){
							pop.error(json.bizMsg || '移除失败!');
						})
					}
				}, function() {
					pop.hide(function(){
						pop.error('移除失败!');
					})
				});
			});
		},
	  	render: function() {
			var data = this.props.data; 
		    return  <tr>
		              <td>{this.props.index}</td>
		            	<td>{data.type}</td>
		             	<td>{data.sourceIp}<br/>{data.sourceMac}</td>
		             	<td>{data.targetIp}<br/>{data.targetMac}</td>
		             	<td className="ignore-td-desc">{data.desc}</td>
		             	<td><button className="u-btn" onClick={this.handleClick}>移除</button></td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );

