define(function(require, exports, module) {
	var Pop = require( 'pop' );
	var pop = new Pop( $( '#popModal' ) );
	var timeLogout = require('timeLogout');


	timeLogout.init();

	//恢复出厂设置
	$('.reset').click(function() {
		pop.warning('是否恢复出厂设置, 系统会自动重启?');
		pop.on('.ok', 'click', function() {
			$.ajax({
				url: 'reset',
				dataType: 'JSON'
			}).then(function(json) {
				if(json.bizNo > 0) {
					pop.hide(function() {
						pop.success('重置成功, 稍后请刷新浏览器!');
					})
				} else {
					pop.hide(function() {
						pop.error(json.bizMsg || '重置失败!');
					})
				}
			}, function() {
				pop.hide(function() {
					pop.error('重置失败!');
				})
			})
		})
	})

	//恢复出厂设置
	$('.reboot').click(function() {
		pop.warning('是否重启电脑?');
		pop.on('.ok', 'click', function() {
			$.ajax({
				url: 'reboot',
				dataType: 'JSON'
			}).then(function(json) {
				if(json.bizNo > 0) {
					pop.hide(function() {
						pop.success('重启成功, 请稍后刷新!');
					})
				} else {
					pop.hide(function() {
						pop.error(json.bizMsg || '重启失败!');
					})
				}
			}, function() {
				pop.hide(function() {
					pop.error('重启失败!');
				})
			})
		})
	})
});