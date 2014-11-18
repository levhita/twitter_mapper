var map;
var markers=[];

function initialize() {
	
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(20.61, -103.30)
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
					icon: 'images/FF4D00-0.8.png'
				});
				markers.push(marker);
			}
		});
	});
});