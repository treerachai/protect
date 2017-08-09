define( function( require, exports, module ) {
    //设置页面中每个表格和图的高度
    var $par = $( '.page-content' ),
        $wrap = $( '.content-wrap' ),
        $win = $( window ),
        winMinHeight = 734,
        minWrapHeight = 417,
        hasInit = false,
        heightChangeDebounce = debounce( function(){
            computeHeight();
            cb();
        }, 250 ),
        cb, resize;

    resize = {
        init: function( callback ) {
            if( !hasInit ) {
                hasInit = true;
                cb = callback || function() {};

                computeHeight();

                $win.on( 'resize', function() {
                    heightChangeDebounce();
                } )
            }
        }
    }

    function computeHeight() {
        var winHeight = $win.height();

        if( winHeight < winMinHeight ) {
            $wrap.height( minWrapHeight );
        } else {
            $wrap.height( winHeight - ( winMinHeight - minWrapHeight ) );
        }
    }

    function debounce( func, wait, immediate ) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = +new Date() - timestamp;

            if ( last < wait && last >= 0 ) {
                timeout = setTimeout( later, wait - last );
            } else {
                timeout = null;
                if ( !immediate ) {
                    result = func.apply( context, args );
                    if ( !timeout ){
                        context = args = null;
                    }
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = +new Date();//++每次调用此函数，都会刷新timestamp，所以才出现later中的if判断1，可类比线段
            var callNow = immediate && !timeout;
            if (!timeout){
                timeout = setTimeout( later, wait );
            }
            if (callNow) {
                result = func.apply( context, args );
                context = args = null;
            }

            return result;
        };
    };

    module.exports = resize;
} );