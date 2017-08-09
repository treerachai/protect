define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' ),
		Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 7,
				data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;
				
		  	lists = data.abnormalList.map( function( list, index ) {
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
								<th>类型</th>
								<th>源</th>
								<th>目的</th>
								<th>描述</th>
								<th>状态</th>
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
				id: this.props.data.id,
				isHandled: this.props.data.checkFlag
			}
		},
		componentWillReceiveProps: function(nextProps) {
			this.setState({
				id: nextProps.data.id,
				isHandled: nextProps.data.checkFlag
			});
		},
		handleClick: function() {
			var that = this;

			$('body').trigger('beforeHandleAbnormal');
			pop.on( '.cancel', 'click.pop-cancel', function() {
				$('body').trigger('cancelHandleAbnormal');
			});

			pop.warning('是否将此异常报警状态置为已处理?');
			pop.on( '.ok', 'click', function() {
				$.ajax({
					url: 'handleAbnormal?id=' + that.state.id,
					dataType: 'JSON'
				}).then(function(json) {
					if(json.bizNo > 0) {
						that.setState({
							isHandled: 1
						});
						pop.hide(function() {
							pop.success('处理成功!');
						});
						$('body').trigger('handleAbnormalSuccess');
					} else {
						pop.hide(function(){
							pop.error('处理失败!');
						})
					}
				}, function() {
					pop.hide(function(){
						pop.error('处理失败!');
					})
				});
			});
		},
	  	render: function() {
			var data = this.props.data; 
		    return  <tr>
		                <td>{this.props.index}</td>
		      			<td>{COMMON_FUN.formateDate(data.startTime,'YYYY-MM-DD hh:mm:ss')}</td>
		            	<td>{data.type}</td>
		             	<td>{data.sourceIp}</td>
		             	<td>{data.targetIp}</td>
		             	<td>{data.desc}</td>
		             	<td>{this.state.isHandled === -1
		             			? <button className="u-btn" onClick={this.handleClick}>未处理</button>
		             			: '已处理'}</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );

