define( function( require, exports, module ) {
	var CONST 	   = require( 'const' ),
		COMMON_FUN = require( 'common' ),
		$handleModal = $('#handleModal'),
		$form = $handleModal.find('form'),
		$note = $form.find('input[name="note"]'),
		$okBtn = $handleModal.find('.ok'),
		$cancelBtn = $handleModal.find('.u-btn_cancel'),
		Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) );


	$form.validate( {
        rules: {
            note: {
            	required: true,
                minlength: 10
            }
        },
        ignore: '.ignore'
    } );

	var Table = React.createClass( {
	  	render: function() {
		  	var lists = [],
		    	colspan = 8,
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
		getInitialState: function() {
			return {
				id: this.props.data.id,
				isHandled: this.props.data.checkFlag,
				isIgnore: this.props.data.ignoreFlag
			}
		},
		componentWillReceiveProps: function(nextProps) {
			this.setState({
				id: nextProps.data.id,
				isHandled: nextProps.data.checkFlag,
				isIgnore: nextProps.data.ignoreFlag
			});
		},
		handleClick: function() {
			var that = this;

			$('body').trigger('beforeHandleAbnormal');
			$cancelBtn.off('click.cancel').one( 'click.cancel', function() {
				$('body').trigger('cancelHandleAbnormal');
			});

			$form.find('label.error').remove();
			$note.val('');
			$handleModal.modal();

			$okBtn.off('click').click(function() {
				if($form.valid()) {
					$.ajax({
						url: 'handleAbnormal?id=' + that.state.id + '&handleNote=' + $note.val(),
						dataType: 'JSON'
					}).then(function(json) {
						if(json.bizNo > 0) {
							that.setState({
								isHandled: 1
							});

							$handleModal.modal('hide');
							pop.success('处理成功!');

							$('body').trigger('handleAbnormalSuccess');
						} else {
							pop.error(json.bizMsg || '处理失败!');
							$('body').trigger('handleAbnormalError');
						}
					}, function() {
						pop.error('处理失败!');
						$('body').trigger('handleAbnormalError');
					});
				}
			})
		},
		ignoreClick: function() {
			var that = this;

			$('body').trigger('beforeHandleIgnore');
			pop.on( '.cancel', 'click.pop-cancel', function() {
				$('body').trigger('cancelHandleIgnore');
			});

			pop.warning('是否屏蔽此类报警?');
			pop.on( '.ok', 'click', function() {
				$.ajax({
					url: 'ignoreAbnormal?id=' + that.state.id,
					dataType: 'JSON'
				}).then(function(json) {
					if(json.bizNo > 0) {
						that.setState({
							isHandled: 1
						});
						pop.hide(function() {
							pop.success('处理成功!');
						});
						$('body').trigger('handleIgnoreSuccess');
					} else {
						pop.hide(function(){
							pop.error(json.bizMsg || '处理失败!');
						})
						$('body').trigger('handleIgnoreError');
					}
				}, function() {
					pop.hide(function(){
						pop.error('处理失败!');
					})
					$('body').trigger('handleIgnoreError');
				});
			});
		},
	  	render: function() {
			var data = this.props.data,
				state = [];

			if(this.state.isHandled === -1) {
				state.push(<button key="0" className="u-btn_warning handle-abnormal" onClick={this.handleClick}>处理</button>);
			} else {
				state.push(<span key="0" className="handle-abnormal z-na">已处理</span>);
			}

			if(this.state.isIgnore=== -1) {
				state.push(<i key="1" className="handle-ignore fa fa-bell-slash" title="屏蔽此类异常" onClick={this.ignoreClick}></i>);
			} else {
				state.push(<i key="1" className="handle-ignore fa fa-bell-slash z-na" title="已屏蔽"></i>);
			}

		    return  <tr>
		              <td>{this.props.index}</td>
		      				<td>{COMMON_FUN.formateDate(data.startTime,'YYYY-MM-DD')}<br/>{COMMON_FUN.formateDate(data.startTime,'hh:mm:ss')}</td>
		            	<td>{data.type}</td>
		             	<td>{data.sourceIp}<br/>{data.sourceMac}</td>
		             	<td>{data.targetIp}<br/>{data.targetMac}</td>
		             	<td>{data.desc.replace(/（）/g,"")}</td>
		             	<td>{data.handleNote}</td>
		             	<td>{state}</td>
		            </tr>;
	  	}
	} );

	module.exports = Table;
} );

