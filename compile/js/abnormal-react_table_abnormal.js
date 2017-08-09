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

	var Table = React.createClass( {displayName: "Table",
	  	render: function() {
		  	var lists = [],
		    	colspan = 8,
				data = this.props.data,
		    	startIndex = ( data.pagenation.currentPage - 1 ) * data.pagenation.perPage + 1;
				
		  	lists = data.abnormalList.map( function( list, index ) {
		  		return React.createElement(TableCell, {key: index+1, index: startIndex+index, data: list});
		  	} );

		    if( lists.length === 0 ) {
		      lists = [ React.createElement("tr", {key: "0"}, React.createElement("td", {colSpan: colspan}, React.createElement("div", {className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无数据")))) ];
		    } else if( lists.length < CONST.TABLE_MIN_ROW ) {
		    	for( i = CONST.TABLE_MIN_ROW - lists.length; i-- ; ) {
		    		lists.push( React.createElement(COMMON_FUN.EmptyTr, {key: CONST.TABLE_MIN_ROW+i, tdNum: colspan}) );
		    	}
		    }

			return  React.createElement("table", {className: "table table-bordered"}, 
			          React.createElement("thead", null, 
			            React.createElement("tr", null, 
				            React.createElement("th", null, "序号"), 
										React.createElement("th", null, "时间"), 
										React.createElement("th", null, "类型"), 
										React.createElement("th", null, "源"), 
										React.createElement("th", null, "目的"), 
										React.createElement("th", null, "描述"), 
										React.createElement("th", null, "备注"), 
										React.createElement("th", null, "操作")
			            )
			          ), 
				        React.createElement("tbody", null, 
				            lists
				        )
			        );
	  	}
	} );

	var TableCell = React.createClass( {displayName: "TableCell",
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
				state.push(React.createElement("button", {key: "0", className: "u-btn_warning handle-abnormal", onClick: this.handleClick}, "处理"));
			} else {
				state.push(React.createElement("span", {key: "0", className: "handle-abnormal z-na"}, "已处理"));
			}

			if(this.state.isIgnore=== -1) {
				state.push(React.createElement("i", {key: "1", className: "handle-ignore fa fa-bell-slash", title: "屏蔽此类异常", onClick: this.ignoreClick}));
			} else {
				state.push(React.createElement("i", {key: "1", className: "handle-ignore fa fa-bell-slash z-na", title: "已屏蔽"}));
			}

		    return  React.createElement("tr", null, 
		              React.createElement("td", null, this.props.index), 
		      				React.createElement("td", null, COMMON_FUN.formateDate(data.startTime,'YYYY-MM-DD'), React.createElement("br", null), COMMON_FUN.formateDate(data.startTime,'hh:mm:ss')), 
		            	React.createElement("td", null, data.type), 
		             	React.createElement("td", null, data.sourceIp, React.createElement("br", null), data.sourceMac), 
		             	React.createElement("td", null, data.targetIp, React.createElement("br", null), data.targetMac), 
		             	React.createElement("td", null, data.desc.replace(/（）/g,"")), 
		             	React.createElement("td", null, data.handleNote), 
		             	React.createElement("td", null, state)
		            );
	  	}
	} );

	module.exports = Table;
} );

