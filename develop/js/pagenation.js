define( function( require, exports, module ) {
  var pagenation = function() {
    var ret = {},
      pageCache = {},
      option = {},
      $mask, $loadGif;

    function throwError( content ) {
      throw new Error( content );
    }

    //请求数据成功的回调函数
    function success( pageInfo ) {
      if( option.isCache === true && pageCache[ pageInfo.pagenation.currentPage ] == null ) {
        pageCache[ pageInfo.pagenation.currentPage ] = deepCopy( pageInfo );
      }
      option.successCb( pageInfo );
      hideLoading();
    }

    //请求数据失败的回调函数
    function error() {
      hideLoading();
    }

    function showLoading() {
      $mask.show();
      $loadGif.show();
    }

    function hideLoading() {
      $mask.hide();
      $loadGif.hide();
    }
    
    function deepCopy (source) {
      var ret, key, i;
      
      if( $.type( source ) === 'object' ) {
        ret = {};
        for ( key in source) {
          ret[ key ] = deepCopy( source[ key ] );
          }
      } else if( $.type( source ) === 'array' ) {
        ret = [];
        for( i = 0; i < source.length; i++ ) {
          ret[ i ] = deepCopy( source[ i ] );
        }
      } else {
        ret = source;
      }
      
      return ret;
    }

    ret = {
      init: function( originOption ) {
        if( !originOption.url ) {
          throwError( '请传入有效的数据请求URL' );
        }
        option.url       = originOption.url;
        option.method    = originOption.method || 'GET';
        option.$par      = originOption.$par;
        option.perPage   = originOption.perPage || 15;
        option.isCache   = !!originOption.isCache != null ?  !!originOption.isCache : false;
        option.successCb = originOption.successCb || function() {};

        $mask = option.$par.find( '.page-mask' );
        $loadGif = option.$par.find( '.loading' );
      },
      //设置参数，控制是否缓存，过滤时修改url
      setOption: function( attr, value ) {
        if( arguments.length !== 2 ) {
          return false;
        }
        option[ attr ] = value;
      },
      requestPage: function( page, data, perPage ) {//在page-list.js中的selectPerpageNum中有传递perPage
        if(perPage !== undefined) {
          option.perPage = perPage;
          pageCache = {};
        }
        var url,
          sign = '?';
            
        if( option.url.indexOf('?') > -1 ) {
          sign = '&';
        }
        url = option.url + sign + 'page=' + page + '&perPage=' + option.perPage + '&_=' + Math.random();
        
        showLoading();

        if( option.isCache === false ) {
          pageCache = {};
        }
        
        if( pageCache[ page ] != null ) {
          success( pageCache[ page ] );
          hideLoading();
        } else {
          $.ajax( {
            type: option.method,
            url: url,
            data: data,
            dataType: 'JSON'
          } ).then( function( pageInfo ) {
            success( pageInfo );
          }, function() {
            error();
          } );
        }
      }
    };
    return ret;
  }

  module.exports = pagenation;

} );