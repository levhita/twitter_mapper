var tweets_collection=[];

$(document).ready(function(){
	initialize();
	var sizeScaled = new google.maps.Size(24,24);
	var sizeNormal = new google.maps.Size(24,24);
	var centerImage = new google.maps.Point(12,12);
	$.getJSON( query_url, function( tweets ) {
		$.each( tweets, function(key, tweet) {

			var pinIcon = new google.maps.MarkerImage(tweet.picture, sizeNormal, null, centerImage, sizeScaled);
			
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