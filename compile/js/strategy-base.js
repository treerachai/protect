define( function( require, exports, module ) {
	var CONST = require( 'const' );

	var baseObj = ( function() {
		var hasInit = false,
			$par = $( '.J-base' ),
			$cancelBtn = $par.find( '.J-cancel' ),
			$okBtn = $par.find( '.J-ok' ),
			$editBtn = $par.find( '.J-edit' ),
			$select = $par.find( 'select' ),
			selectVal = {},
			isEditing = false, //是否处于编辑状态
			ret;

		//保存初始报警设置
		function saveSlectVal() {
			$select.each( function() {
				var $this = $( this ),
					name = $this.attr( 'name' ),
					val = $this.val();

				selectVal[ name ] = val;
			} )
		}

		//重置select值
		function resetSlect() {
			$select.each( function() {
				var $this = $( this ),
					name = $this.attr( 'name' );

				$this.val( selectVal[ name ] );
			} )
		}

		//enable select的值
		function enableSelect() {
			$select.removeAttr( 'disabled' );
		}

		//disabled select的值
		function disableSelect() {
			$select.attr( 'disabled', 'disabled' );
		}

		//更新报警基础策略
		function updateStrategy( successCb ) {
			$okBtn.attr( 'disabled', 'disabled' );

			$.ajax( {
				url: CONST.admin + '/updateStrategy?' + serialize( selectVal ),
				dataType: 'JSON'
			} ).done( function( json ) {
				if( json.bizNo > 0 ) {
					successCb && successCb();
				}
			} ).always( function() {
				$okBtn.removeAttr( 'disabled' );
			} )
		}

		//序列化select
		function serialize( selectVal ) {
			var val = '';

			for( var key in selectVal ) {
				if( val === '' ) {
					val = key + '=' + selectVal[ key ];
				} else {
					val = val + '&' + key + '=' + selectVal[ key ];
				}
			}

			return val;
		}

		//绑定按钮的点击事件
		function bindClick() {
			$cancelBtn.click( function() {
				//处于编辑状态
				if( isEditing ) {
					isEditing = false;

					resetSlect();
					disableSelect();

					$cancelBtn.hide();
					$okBtn.hide();
					$editBtn.show();
				}
			} )

			$editBtn.click( function() {
				//处于编辑状态
				if( !isEditing ) {
					isEditing = true;
					
					enableSelect();

					$cancelBtn.show();
					$okBtn.show();
					$editBtn.hide();
				}
			} )

			$okBtn.click( function() {
				//处于编辑状态
				if( isEditing ) {
					updateStrategy( function() {
						isEditing = false;
					
						saveSlectVal();
						disableSelect();

						$cancelBtn.hide();
						$okBtn.hide();
						$editBtn.show();
					} );
				}
			} )
		}

		ret = {
			init: function() {
				if( !hasInit ) {
					hasInit = true;

					saveSlectVal();
					bindClick();
				}
			}
		};

		return ret;
	} )();




	module.exports = baseObj;

} )