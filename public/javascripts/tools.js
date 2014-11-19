$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}
	else{
		return results[1] || 0;
	}
}

var query_url = "/tweets";



if($.urlParam('limit')!==null){
	query_url += "?limit="+$.urlParam('limit');
} else {
	query_url += "?limit=1000";
}
if($.urlParam('younger_than')!==null){
	query_url += "&younger_than="+$.urlParam('younger_than');
}
if($.urlParam('older_than')!==null){
	query_url += "&older_than="+$.urlParam('older_than');
}

if($.urlParam('user_id')!==null){
	query_url += "&user_id="+$.urlParam('user_id');
}

if($.urlParam('screen_name')!==null){
	query_url += "&screen_name="+$.urlParam('screen_name');
}

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