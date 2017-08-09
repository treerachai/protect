$(function() {
	//显示时间组件
	var Time = React.createClass( {displayName: "Time",
		getInitialState: function() {
			return {
				time: null
			}
		},
		getTime: function( date ) {
			date = date || new Date;
			return formateDate( date, 'YYYY:MM:DD  hh:mm:ss' );
		},
		componentWillMount: function() {
			this.setState( { 'time': this.getTime( new Date() ) } );
		},
		componentDidMount: function() {
			var _this = this;
			setTimeout( function updateTime() {
				_this.setState( { 'time': _this.getTime( new Date() ) } );

				setTimeout( updateTime, 1000 );
			}, 1000 );
		},
		render: function() {
			return React.createElement("span", {className: "local-time"}, 
						this.state.time
				   )
		}
	} );

	var TimeState = React.createClass( {displayName: "TimeState",
		getInitialState: function() {
			return {
				state: 'success',
				content: '正常运行'
			}
		},
		componentWillMount: function() {
			//注册函数
		},
		render: function() {
			return React.createElement("span", null, 
						React.createElement("span", null, 
							React.createElement("span", {className: "dot " + this.state.state}), 
							React.createElement("span", {className: "content"}, this.state.content)
						), 
						React.createElement(Time, null)
				   )
		}
	} )
	ReactDOM.render( React.createElement(TimeState, null), document.getElementById( 'time' ) );
})
