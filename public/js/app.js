$(function(){
	getBinData();
});

var getBinData = function(){
	var myLatlng = new google.maps.LatLng(40.7127, -74.0059);
	var map = new google.maps.Map(document.getElementById('map-canvas'), {
  	center: myLatlng,
  	zoom: 11,
  	mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	var url = "https://data.cityofnewyork.us/resource/sxx4-xhzg.json"
	var binData = []
	$.getJSON(url, function(data){
		$.each(data, function(index, value){
			if ( !isNaN(parseInt(value.latitude)) ) {
				binData.push(new google.maps.LatLng(value.latitude, value.longitude));
			};
			
		})
	var heatmap = new google.maps.visualization.HeatmapLayer({
  	data: binData
	});
	heatmap.setMap(map);
	})
}