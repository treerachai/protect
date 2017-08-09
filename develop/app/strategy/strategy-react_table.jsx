define( function( require, exports, module ) {
	var Deliver    = require( 'subscribe' ),
		COMMON_FUN = require( 'common' );

	var Table = React.createClass( {
		getInitialState: function() {
			return {
				data: [
						{
							vulName          : 'asdg', 
							scriptUploadTime : 21564645445, 
							alertType        : '一级'
						}
					],
				startIndex: 1
			};
		},
		componentDidMount: function() {
			//注册函数
			var updateState = function( data ) {
				this.setState( {
					data: data.terminalList,
					startIndex: ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage
				} );
			};
			Deliver.subscribe( updateState.bind( this ), this.props.pub );
		},
	  	render: function() {
		  	var lists = [],
		    	colspan = 6,
		    	startIndex = this.state.startIndex;

		  	lists = this.state.data.map( function( list, index ) {
		  		return <TableCell key={index+1} index={startIndex+index+1} data={list}/>;
		  	} );

		    if( lists.length === 0 ) {
		      lists = [ <tr key="0"><td colSpan={colspan}><div className="no-data"><i className="fa fa-exclamation-circle"></i><span className="content">暂无数据</span></div></td></tr> ];
		    }

			return  <table className='table table-bordered'>
			          	<thead>
			            	<tr>
				                <th>序号</th>
                                <th>漏洞名</th>
                                <th>脚本上传时间</th>
                                <th>报警设置</th>
			            	</tr>
			          	</thead>
				        <tbody>
				            {lists}
				        </tbody>
			        </table>;
	  	}
	} );

	var TableCell = React.createClass( {
		getOption: function( value ) {
			return <select defaultValue={value} disabled>
					<option defaultValue="关闭">关闭</option>
					<option defaultValue="一级">一级</option>
					<option defaultValue="二级">二级</option>
					<option defaultValue="三级">三级</option>
				   </select>;
		},
	  	render: function() {
			var data = this.props.data;

		    return  <tr>
		    			<td>{this.props.index}</td>
		            	<td>{data.vulName}</td>
		      			<td>
		      				{COMMON_FUN.formateDate(data.scriptUploadTime,'YYYY-MM-DD hh:mm:ss')}
		      				<input className="float-left hidden" type="file" name={data.vulName} />
		      			</td>
		             	<td>{this.getOption(data.alertType)}</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );

