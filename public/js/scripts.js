console.log("connected?");

$(document).ready(function() {
	var map = '';
	$.get('/api/map', function(data) {
		map = data;
		$('#googleMaps').attr('src', map);
	})

	// $('.row form').submit(function(event) {
	// event.preventDefault();
	// var data = $(this).serialize();
	// $.post('api/searchMap', function(data) {
	// 	console.log(data);
	// }).done(function(res) {
	// 	console.log(res);
	// 	console.log(data.street);
	// 	$('#googleMaps').attr('src', res + data);
	// })
	// })
});


function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 36.2102595, lng: -95.712891},
	  zoom: 4,
	  mapTypeId: 'roadmap'
	});

	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
	  searchBox.setBounds(map.getBounds());
	});

	var markers = [];
	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
	  var places = searchBox.getPlaces();
	  var placesArr = places[0].formatted_address.split(", ");
	  var searchStreet = placesArr[0];
	  var searchCity = placesArr[1];
	  var streetField = document.getElementById("street");
	  streetField.value = searchStreet;
	  var cityField = document.getElementById("city");
	  cityField.value = searchCity;

	  

	  if (places.length == 0) {
	    return;
	  }

	  // Clear out the old markers.
	  markers.forEach(function(marker) {
	    marker.setMap(null);
	  });
	  markers = [];

	  // For each place, get the icon, name and location.
	  var bounds = new google.maps.LatLngBounds();
	  places.forEach(function(place) {
	    if (!place.geometry) {
	      console.log("Returned place contains no geometry");
	      return;
	    }
	    var icon = {
	      url: place.icon,
	      size: new google.maps.Size(71, 71),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(17, 34),
	      scaledSize: new google.maps.Size(25, 25)
	    };

	    // Create a marker for each place.
	    markers.push(new google.maps.Marker({
	      map: map,
	      icon: icon,
	      title: place.name,
	      position: place.geometry.location
	    }));

	    if (place.geometry.viewport) {
	      // Only geocodes have viewport.
	      bounds.union(place.geometry.viewport);
	    } else {
	      bounds.extend(place.geometry.location);
	    }
	  });
	  map.fitBounds(bounds);
	});
}
