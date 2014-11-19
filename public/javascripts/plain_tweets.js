var map;
var tweets_collection=[];

function initialize() {
	
	var mapOptions = {
		zoom: initial_zoom,
		center: new google.maps.LatLng(initial_lat, initial_long),
		mapTypeControl: true,
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

$(document).ready(function(){
	initialize();
	var sizeScaled = new google.maps.Size(24,24);
	var sizeNormal = new google.maps.Size(24,24);
	
	$.getJSON( query_url, function( tweets ) {
		$.each( tweets, function(key, tweet) {

			var pinIcon = new google.maps.MarkerImage(tweet.picture, sizeNormal, null, null, sizeScaled);
			
			var myLatlng = new google.maps.LatLng(tweet.latitude, tweet.longitude)
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: "@"+tweet.screen_name+":"+tweet.text,
				icon: pinIcon,
				id_str: tweet.id_str
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				window.open('https://twitter.com/a/status/'+marker.id_str);
				console.log(marker.id_str);
			});
			tweets_collection.push({'tweet':tweet, 'marker':marker});

		});
	});
});