X.tplDevice = template.compile( 
		'<% for( var i = 0; i < data.length; i++ ){ %>' +
			'<div class="each-device">' +
				'<div class="ip-wrap">' +
					'<p class="ip"><%= data[i].ip %></p>' +
					'<div class="os"><i class="fa fa-plus"></i></div>' +
					'<div class="net"><i class="fa fa-plus"></i></div>' +
				'</div>' +
				'<div class="clearfix"></div>' +
				'<div class="device-info">' +
					'<span class="style"><%= data[i].deviceType %></span>' +
					'<span class="brand float-right"><%= data[i].brand %></span>' +
				'</div>' +
				'<div class="port">' +
					'<ul class="port-info">' +
						'<% for( var j = 0; j < data[ i ].portInfoList.length; j++ ){ %>' +
							'<li >' +
								'<ul class="list-inline">' +
									'<li><%= data[ i ].portInfoList[ j ].port %></li>' +
									'<li><%= data[ i ].portInfoList[ j ].service %></li>' +
									'<li><%= data[ i ].portInfoList[ j ].deviceType %></li>' +
									'<li><%= data[ i ].portInfoList[ j ].product %>' +
									'<%if(data[ i ].portInfoList[ j ].version){%>' +
										'(<%= data[ i ].portInfoList[ j ].version %>)</li>' +
									'<% } %>' +
								'</ul>' +
								'<ul class="vul-list">' +
									'<% for( var k = 0; k < data[ i ].portInfoList[ j ].vulTypesList.length; k++ ){ %>' +
										'<li><%= data[ i ].portInfoList[ j ].vulTypesList[ k ] %></li>' +
									'<% } %>' +
								'</ul>' +
							'</li>' +
						'<% } %>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'<% } %>' );