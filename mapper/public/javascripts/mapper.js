var map;
var markers;

function initialize() {
	
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(20.61, -103.30)
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}

$(document).ready(function(){
	initialize();
	$.getJSON( "twitts", function( twitts ) {
		$.each( twitts, function(key, twitt) {
			console.log(twitt);
			if(twitt.coordinates!==null) {
				var myLatlng = new google.maps.LatLng(twitt.coordinates.coordinates[1], twitt.coordinates.coordinates[0])
				marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: "@"+twitt.user.screen_name+":"+twitt.text
				});
			}
		});

		
	});
});