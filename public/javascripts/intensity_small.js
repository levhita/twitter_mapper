var map;

function initialize() {
	
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(20.61, -103.30),
		mapTypeControl: true,
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	rect = new google.maps.Rectangle({map: map});
}

$(document).ready(function(){
	initialize();
	var iconBase = 'http://maps.google.com/mapfiles/kml/shapes';
	
	$.getJSON( "/tweets", function( tweets ) {
		$.each(tweets, function(key, tweet) {
			
			if(tweet.coordinates!==null) {
				var myLatlng = new google.maps.LatLng(tweet.latitude, tweet.longitude)
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: "",
					icon: '/images/broad_small.png',
					id_str: tweet.id_str
				});
			}
		});
	});
});