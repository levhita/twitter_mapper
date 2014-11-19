var map;
var tweets_collection=[];
var tweets_locations={};

function initialize() {
	var mapOptions = {
		zoom: initial_zoom,
		center: new google.maps.LatLng(initial_lat, initial_long),
		mapTypeControl: true,
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

var icon = '/images/broad.png';
if($.urlParam('icon')!==null){
	icon = $.urlParam('icon');
}

$(document).ready(function(){
	initialize();
	$.getJSON( query_url, function( tweets ) {
		$.each(tweets, function(key, tweet) {
			
			var myLatlng = new google.maps.LatLng(tweet.latitude, tweet.longitude)
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: "@"+tweet.screen_name+":"+tweet.text,
				icon: icon
			});
				
			tweets_collection.push({'tweet':tweet, 'marker':marker});
		});
	});
});