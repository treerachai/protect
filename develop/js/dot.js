define( function( require, exports, module ) {
	//jquery 扩展
	$.fn.extend( {
		dot: function( maxLineNum ) {
			dot( this, maxLineNum);
		}
	} );

	var lineHeight;

	function dot( $dotDoms, maxLineNum ) {
		$dotDoms.each( function() {
			var $this = $( this ),
				$tempDom;

			//添加临时元素
			$tempDom = getTempDom( $this );
			$this.append( $tempDom );
			lineHeight = $tempDom.height();

			setWidth( $this, $tempDom );
			copyText( $this, $tempDom );
			if( isOverflow( $this, $tempDom, maxLineNum) ) {
				$this.addClass( 'ellipsis' );
				$this.append( '<a class="less" href="javascript:void(0)" style="display:none">收起</a>' );
				$this.after( '<a class="more" href="javascript:void(0)">更多</a>' );
			}

			removeTempDom( $tempDom );
		} )

		//绑定事件
		bindEvent();

	}

	function copyText( $src, $des ) {
		$des.text( '' );
		$des.text( $src.text() );
	}

	function setWidth( $src, $des ) {
		$des.css( {
			width: $src.css( 'width' )
		} );
	}

	function isOverflow( $src, $des, maxLineNum ) {
		maxLineNum = maxLineNum || 1.9;
		setWidth( $src, $des );
		copyText( $src, $des );
		if( $des.height() > lineHeight * maxLineNum ) {
			return true;
		}

		return false;
	}

	//添加临时元素
	function getTempDom( $cur ) {
		return $( '<div style="position:absolute;opacity:0;word-wrap:break-word;word-break:break-all">徐云飞</div>' );
	}

	//删除临时元素
	function removeTempDom( $tempDom ) {
		return $tempDom.remove();
	}

	//为更多和收起按钮绑定点击事件
	function bindEvent() {
		$( '.more' ).click( function() {
			var $this = $( this ),
				$par = $this.parent(),
				$dot = $par.find( '.dot' ),
				$less = $this.parent().find( '.less' );

			$dot.removeClass( 'ellipsis' );
			$this.hide();
			$less.show();
		} )

		$( '.less' ).click( function() {
			var $this = $( this ),
				$dot = $this.parent(),
				$more = $dot.parent().find( '.more' );

			$dot.addClass( 'ellipsis' );
			$this.hide();
			$more.show();
		} )
	}

	module.exports = dot;
} );