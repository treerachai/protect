define( function( require, exports, module ) {
	var Deliver = require( 'subscribe' ),
		CONST = require( 'const' ),
		Table = require( 'index-react_table' ),
		intrusionPub = new Deliver();

	/*************************************************************************/
	//实时入侵信息
	var intrusion = ( function() {
		var hasInit = false,
			ret;

		function requestData( successCb, cb ) {
			$.ajax( {
				url: CONST.ADMIN + '/intrusion',
				dataType: 'JSON'
			} ).then( function( json ) {
				if( json.bizNo > 0 ) {
					successCb && successCb( json.intrusionList );
				}
			} ).always( function() {
				cb && cb();
			} );
		}

		ret = {
			init: function( id ) {
				if( !hasInit ) {
					hasInit = true;

					// 渲染入侵检测列表
					ReactDOM.render( 
						React.createElement(Table, {pub: intrusionPub}),
						document.getElementById( id )
					);

					requestData( function( intrusionList ) {
						//更新实时入侵信息信息
						intrusionPub.deliver( intrusionList );
					} );
				}
			},
			setTimeUpdate: function() {
				setTimeout( function request() {
					requestData( function( intrusionList ) {
						//更新实时入侵信息信息
						intrusionPub.deliver( intrusionList );
						setTimeout( request, timeSpace );
					} );
				}, timeSpace );
			}
		};

		return ret;
	} )();

	module.exports = intrusion;

} );


