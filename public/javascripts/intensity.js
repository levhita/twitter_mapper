$(document).ready(function(){
	initialize();
	
	var icon = '/images/broad.png';
	if($.urlParam('icon')!==null){
		icon = $.urlParam('icon');
	}
	
	$.getJSON( "/"+query_url, function( tweets ) {
		var heatmapData = [];
		for(var x=0; x < tweets.length; x++) {
			for(var y=0; y < tweets[x].length;y++) {
				heatmapData.push(new google.maps.LatLng(tweets[x][y].latitude, tweets[x][y].longitude));
			}
		}
		
		heatmap = new google.maps.visualization.HeatmapLayer({
  			data: heatmapData,
  			radius:10,
  			opacity: .6,
  			dissipating: true,
  			maxIntensity:10
		});
		
		heatmap.setMap(map);
	});
});