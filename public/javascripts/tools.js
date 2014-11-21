var map;

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}
	else{
		return results[1] || 0;
	}
}

var query_url = "tweets";

if($.urlParam('limit')!==null){
	query_url += "?limit="+$.urlParam('limit');
} else {
	query_url += "?limit=1000";
}
if($.urlParam('older_than')!==null){
	query_url += "&older_than="+$.urlParam('older_than');
}
if($.urlParam('younger_than')!==null){
	query_url += "&younger_than="+$.urlParam('younger_than');
}
if($.urlParam('user_id')!==null){
	query_url += "&user_id="+$.urlParam('user_id');
}
if($.urlParam('screen_name')!==null){
	query_url += "&screen_name="+$.urlParam('screen_name');
}
if($.urlParam('as_text')!==null && $.urlParam('as_text')=="true"){
	query_url += "&as_text=true"
}
if($.urlParam('search')!==null){
	query_url += "&search="+$.urlParam('search');
}

/** Process view windows **/
var initial_zoom = 11;
var initial_lat = 20.66;
var initial_long = -103.30;
if($.urlParam('zoom')!==null){
	initial_zoom = parseInt($.urlParam('zoom'));
}
if($.urlParam('latitude')!==null){
	initial_lat = $.urlParam('latitude');
}
if($.urlParam('longitude')!==null){
	initial_long = $.urlParam('longitude');
}

/** Process regions to search from**/
if($.urlParam('region_lat1')!==null && $.urlParam('region_lng1')!==null &&$.urlParam('region_lat2')!==null && $.urlParam('region_lng2')!==null) {
	query_url += "&region_lat1="+$.urlParam('region_lat1');
	query_url += "&region_lng1="+$.urlParam('region_lng1');
	query_url += "&region_lat2="+$.urlParam('region_lat2');
	query_url += "&region_lng2="+$.urlParam('region_lng2');
}

/** Variables for region selection **/
var currentLatLng;
var point1LatLng={latitude:0,longitude:0};
var point2LatLng={latitude:0,longitude:0};
function initialize() {
	
	var mapOptions = {
		zoom: initial_zoom,
		center: new google.maps.LatLng(initial_lat, initial_long),
		mapTypeControl: true,
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	rect = new google.maps.Rectangle({map: map});
	
	google.maps.event.addDomListener(document.getElementById('map-canvas'), "mousedown", function (e) {
		if (e.which == 1) {
			point1LatLng={latitude:currentLatLng.lat(),longitude:currentLatLng.lng()};
		} else if (e.which == 3) {
			point2LatLng={latitude:currentLatLng.lat(),longitude:currentLatLng.lng()};
		}
		$("#region").val(
			"&region_lat1=" + point1LatLng.latitude
			+ "&region_lng1=" + point1LatLng.longitude
			+ "&region_lat2=" + point2LatLng.latitude
			+ "&region_lng2=" + point2LatLng.longitude
			);
	});
	
	google.maps.event.addListener(map, 'mousemove', function(mEvent) {
		currentLatLng = mEvent.latLng;
	});

	google.maps.event.addListener(map, "center_changed", function() {
        $("#view").val(
        	"&latitude="  + map.getCenter().lat() +
        	"&longitude=" + map.getCenter().lng() +
        	"&zoom=" + map.getZoom()
        );
    });
}
$("document").ready(function(){

});
