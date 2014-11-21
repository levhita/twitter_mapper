$(document).ready(function(){
	initialize();
	
	var icon = '/images/broad.png';
	if($.urlParam('icon')!==null){
		icon = $.urlParam('icon');
	}
	
	$.getJSON( query_url, function( tweets ) {
		$.each(tweets, function(key, tweet) {
			var myLatlng = new google.maps.LatLng(tweet.latitude, tweet.longitude)
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: "@"+tweet.screen_name+":"+tweet.text,
				icon: icon,
				id_str: tweet.id_str
			});
		});
	});
});