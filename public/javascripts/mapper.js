var map;
var markers=[];
var dragging = false;
var rect;
var pos1, pos2;
var currentLatLng, latLng1, latLng2;

function initialize() {
	
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(20.61, -103.30),
		mapTypeControl: true,
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	rect = new google.maps.Rectangle({map: map});


	/*google.maps.event.addDomListener(document.getElementById('map-canvas'), "mousedown", function (e) {
		if (e.which == 1) {
			map.setOptions({ draggable: false });
			dragging = true;
			latLng1 = currentLatLng;
		} 
	});*/

	google.maps.event.addListener(map, 'mousemove', function(mEvent) {
		currentLatLng = mEvent.latLng;
		if (dragging) {
			latLng2 = mEvent.latLng;
			showRect();
		}
	});

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

// Add a marker to the map and push to the array.
function addMarker(location) {
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}

$(document).ready(function(){
	initialize();
	var iconBase = 'http://maps.google.com/mapfiles/kml/shapes';
	$.getJSON( "twitts", function( twitts ) {
		$.each( twitts, function(key, twitt) {
			if(twitt.coordinates!==null) {
				var myLatlng = new google.maps.LatLng(twitt.latitude, twitt.longitude)
				marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: "@"+twitt.screen_name+":"+twitt.text,
					icon: twitt.picture//'images/FF4D00-0.8.png'
				});
				markers.push(marker);
			}
		});
	});
});