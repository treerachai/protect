define( function( require, exports, module ) {

	//处理剩余空间条数的显示
	var Space = React.createClass( {displayName: "Space",
		render: function(){
			var spaceObj = this.props.data,
				leftSpace = 0,
				levelError = 0.2,	//剩余空间严重不足
				levelWarning = 0.5,
				className = '';
			
			spaceObj = this.props.data;

			if( spaceObj.sumSpace !== 0 ) {
				leftSpace = ( spaceObj.leftSpace / spaceObj.sumSpace );

				if( leftSpace < levelError ) {
					className = 'u-error';
				} else if( leftSpace < levelWarning ) {
					className = 'u-warning';
				} else {
					className = 'u-normal';
				}
			}

			//将小数转为百分数
			leftSpace = ( leftSpace * 100 ).toFixed( 1 );

			//将4998923转为4,998,923
			var newNum,num = spaceObj.leftSpace + '';
			if( num.length > 3 ) {
				newNum = [];
				for( var i = num.length - 1; i > -1; i-- ) {
				  if( (num.length - i)%3 === 0 ) {
				    newNum.unshift("," + num[i]);
				  }else {
				    newNum.unshift(num[i]);
				  }
				}
				num = newNum.join("");
			}
					
			return 	React.createElement("span", null, 
						React.createElement("em", {className: className}, leftSpace, "%"), 
						"( ", 
						React.createElement("em", {className: className}, num), 
						" 条)"
					)
		}
	} );
	
	module.exports = Space;
} );
