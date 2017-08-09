define(function(require, exports, module) {
	var COMMON_FUN = require('common'),
		INDEX_CONST = require('index-const');
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

	var Cards = React.createClass({displayName: "Cards",
	  	render: function() {
	  		var lists = [React.createElement(Card, {key: 1, data: this.props.data[0]})];

	  		if( lists.length === 0 ) {
		      lists = [React.createElement("div", {key: "-1", className: "no-data"}, React.createElement("i", {className: "fa fa-exclamation-circle"}), React.createElement("span", {className: "content"}, "暂无异常"))];
		    }

		    return React.createElement("ul", {className: "m-cards"}, lists);
	  	}
	});

	var Card = React.createClass({displayName: "Card",
		getInitialState: function() {
			return {
				id: this.props.data.id,
				isHandled: this.props.data.state
			}
		},
		componentWillReceiveProps: function(nextProps) {
			this.setState({
				id: nextProps.data.id,
				isHandled: nextProps.data.state
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
						}
					}, function() {
						pop.error('处理失败!');
					});
				}
			})
		},
	  	render: function() {
	  		var data = this.props.data,
	  			btn = this.state.isHandled === 1
					? React.createElement("button", {className: "u-btn", disabled: "disabled"}, "已处理")
					: React.createElement("button", {className: "u-btn_error", onClick: this.handleClick}, "未处理");

	  		return 	React.createElement("li", {className: "m-card-wrap " + INDEX_CONST.type[data.type]}, 
	  					React.createElement("div", {className: "m-card-head"}, 
	  						React.createElement("div", {className: "m-card-title"}, data.type), 
	  						btn
	  					), 
	  					React.createElement("div", {className: "m-card-content"}, 
	  						React.createElement("p", {className: "m-card-name"}, data.name), 
	  						React.createElement("p", {className: "m-card-time"}, COMMON_FUN.formateDate(data.time, 'YYYY-MM-DD hh:mm:ss')), 
	  						React.createElement("p", {className: "m-card-des"}, data.des)
	  					)
	  				)
	  	}
	});

	module.exports = Cards;
});

