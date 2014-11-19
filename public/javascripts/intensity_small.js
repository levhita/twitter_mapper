var map;

function initialize() {
	
	var mapOptions = {
		zoom: initial_zoom,
		center: new google.maps.LatLng(initial_lat, initial_long),
		mapTypeControl: true,
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	rect = new google.maps.Rectangle({map: map});
}

var icon = '/images/broad_small.png';
if($.urlParam('icon')!==null){
	icon = $.urlParam('icon');
}

$(document).ready(function(){
	initialize();
	var iconBase = 'http://maps.google.com/mapfiles/kml/shapes';
	
	$.getJSON( query_url, function( tweets ) {
		$.each(tweets, function(key, tweet) {
			var myLatlng = new google.maps.LatLng(tweet.latitude, tweet.longitude)
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: "",
				icon: icon,
				id_str: tweet.id_str
			});
		});
	});
});