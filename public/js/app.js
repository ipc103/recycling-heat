$(function(){
	$("h1").hide();
	$("p#info").hide();
	$("#map-canvas").hide();
	$("h1").fadeIn('slow').delay(1000).fadeOut('slow');
	setTimeout(infoText, 2800);
	setTimeout(getBinData, 9000);
});

var infoText = function(){
	$("p#info").fadeIn('slow').delay(1000).fadeOut('slow');
}

var getBinData = function(){
	// creates a new map
	var myLatlng = new google.maps.LatLng(40.75, -73.95);
	var map = new google.maps.Map(document.getElementById('map-canvas'), {
  	center: myLatlng,
  	zoom: 11,
  	mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	// retrieves data from NYC open data
	var url = "https://data.cityofnewyork.us/resource/sxx4-xhzg.json"
	var binData = []
	$.getJSON(url, function(data){
		$("#total").text("Total Number of Bins: " + data.length.toString()); // adds total length of the returned bins to the map

		$.each(data, function(index, value){
			if ( !isNaN(parseInt(value.latitude)) ) {
				binData.push(new google.maps.LatLng(value.latitude, value.longitude)); // adds lat and long data if the value is an integer
			};
		})
	var heatmap = new google.maps.visualization.HeatmapLayer({
  	data: binData
	});
	heatmap.setMap(map); // adds heatmap
	})
}