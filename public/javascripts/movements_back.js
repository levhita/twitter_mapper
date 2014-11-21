var map;
var tweets_collection=[];

var dragging = false;
var rect;
var pos1, pos2;
var currentLatLng;
var latLng1, latLng2;

function initialize() {
	
	var mapOptions = {
		zoom: initial_zoom,
		center: new google.maps.LatLng(initial_lat, initial_long),
		mapTypeControl: true,
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	rect = new google.maps.Rectangle({map: map});


	google.maps.event.addDomListener(document.getElementById('map-canvas'), "mousedown", function (e) {
		if (e.which == 3) {
			console.log('asfasd');
			map.setOptions({ draggable: false });
			dragging = true;
			latLng1 = currentLatLng;
		} 
	});

	google.maps.event.addMapListener(document.getElementById('map-canvas'), "mouseover", function (e) {
		console.log(e);
		currentLatLng={};
	});

	/** **/

	/*google.maps.event.addDomListener(document.getElementById('map-canvas'), "mouseup", function (e) {
		if (e.which == 1) {
			map.setOptions({ draggable: true });
			dragging = false;

			var lat1 = latLng1.lat();
			var lat2 = latLng2.lat();
			var minLat = lat1<lat2?lat1:lat2;
			var maxLat = lat1<lat2?lat2:lat1;
			var lng1 = latLng1.lng();
			var lng2 = latLng2.lng();
			var minLng = lng1<lng2?lng1:lng2;
			var maxLng = lng1<lng2?lng2:lng1;

			alert('Datbase query for the following bounds:\n\nlat: '
				+ minLat + ' to ' + maxLat+ '\n\nlng: ' + minLng
				+ ' to ' + maxLng);
		}
	});*/
}

$(document).ready(function(){
	initialize();
	var iconBase = 'http://maps.google.com/mapfiles/kml/shapes';
	
	$.getJSON( query_url, function( tweets ) {
		$.each(tweets, function(key, tweet) {
			
			if(tweet.coordinates!==null) {
				var myLatlng = new google.maps.LatLng(tweet.latitude, tweet.longitude)
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: "@"+tweet.screen_name+":"+tweet.text,
					icon: '/images/broad.png',
					id_str: tweet.id_str
				});
				
				google.maps.event.addListener(marker, 'click', function() {
					window.open('https://twitter.com/a/status/'+marker.id_str);
					console.log(marker.id_str);
				});

				tweets_collection.push({'tweet':tweet, 'marker':marker});
			}
		});
	});
});

function showRect() {
	if(dragging){
		if (rect === undefined) {
			rect = new google.maps.Rectangle({
				map: map
			});
		}
		var latLngBounds = new google.maps.LatLngBounds(latLng1, latLng2);
		rect.setBounds(latLngBounds);
	}
}