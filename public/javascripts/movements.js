var tweets_collection=[];
var tweets_locations={};

if($.urlParam('direction')!==null){
	query_url += "&direction="+$.urlParam('direction');
}
query_url = "/movement_" + query_url;

$(document).ready(function(){
	initialize();
	
	$.getJSON( query_url, function( lines ) {
		var sizeScaled = new google.maps.Size(24,24);
		var sizeNormal = new google.maps.Size(24,24);
		var centerImage = new google.maps.Point(12,12);
		var lineSymbol = {
			path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
			strokeColor: 'purple',
			strokeOpacity: 0.2,
		};
		$.each(lines, function(key, line) {
			var points = [
				new google.maps.LatLng(line.start.latitude,line.start.longitude),
				new google.maps.LatLng(line.end.latitude,line.end.longitude)
			];
					
			var polyline = new google.maps.Polyline({
				map: map,
				path:points,
				strokeColor:"blue",
				text:line.end.timestamp_ms,
				strokeWeight:3,
				strokeOpacity:0.2,
					icons: [{
						icon: lineSymbol,
						offset: '100%'
				}]
			});
			google.maps.event.addListener(polyline, 'mouseover', function(latlng) {
				polyline.setOptions({strokeOpacity:1});
			});

			google.maps.event.addListener(polyline, 'mouseout', function(latlng) {
				polyline.setOptions({strokeOpacity:0.2});
			});
		});
	});
});

//var pinIcon = new google.maps.MarkerImage(tweet.picture, sizeNormal, null, centerImage, sizeScaled);

					/*var myLatlng = new google.maps.LatLng(tweet.latitude, tweet.longitude)
					var marker = new google.maps.Marker({
						position: myLatlng,
						map: map,
						title: "@"+tweet.screen_name+":"+tweet.text,
						icon: pinIcon
					});
				
tweets_collection.push({'tweet':tweet, 'marker':marker});

if(tweets_locations[tweet.user_id].length==2){
	var myLatlng = new google.maps.LatLng(last_location.latitude, last_location.longitude)
						var marker = new google.maps.Marker({
							position: myLatlng,
							map: map,
							title: "@"+tweet.screen_name+":"+last_location.text,
							icon: pinIcon
						});
					}
tweets_collection.push({'tweet':tweet, 'marker':marker});*/