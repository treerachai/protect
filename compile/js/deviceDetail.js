define( function( require, exports, module ) {
	var	timeLogout = require('timeLogout'),
		COMMON_FUN = require('common'),
		Pop = require( 'pop' ),
		pop = new Pop( $( '#popModal' ) );

	timeLogout.init();

	/************************将unix时间戳格式化为标准日期**************************/
	$('.J-time').each(function() {
		var $this = $(this),
			time = $this.data('time');

		$this.text(COMMON_FUN.formateDate(time,'YYYY-MM-DD hh:mm:ss'));
	})

	/************************处理异常报警**************************/
	$('.page-list table').delegate('button', 'click', function() {
		var $this = $(this),
			id = $this.data('id');

		pop.warning('是否将此异常报警状态置为已处理?');
		pop.on( '.ok', 'click', function() {
			$.ajax({
				url: 'handleAbnormal?id=' + id,
				dataType: 'JSON'
			}).then(function(json) {
				if(json.bizNo > 0) {
					pop.hide(function() {
						pop.success('处理成功!');
					});
					$this.replaceWith('已处理');
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
	})
} );