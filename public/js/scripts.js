console.log("connected?");

$(document).ready(function() {
	// var map = '';
	// $.get('/api/map', function(data) {
	// 	map = data;
	// 	$('#googleMaps').attr('src', map);
	// })

	$('#storyModal form').submit(function(event) {
		event.preventDefault();
		var $street = $('#street').val();
		var $city = $('#city').val();
		var $monthStart = $('#monthStart').val();
		var $yearStart = $('#yearStart').val();
		var $monthEnd = $('#monthEnd').val();
		var $yearEnd = $('#yearEnd').val();
		var $storyBody = $('#storyBody').val();
		$.post('/api/story', {street: $street, city: $city, monthStart: $monthStart, yearStart: $yearStart, monthEnd: $monthEnd, yearEnd: $yearEnd, storyBody: $storyBody}, function(data) {
			displayStory(data);
		})	
	})
});

function displayStory(data) {
	var displayStory = $('<div></div>').attr('id', 'displayStory');
	var street = $('<div></div>').text('<strong>Street:</strong> ' + data.street);
	var date = $('<div></div>').text('<strong>From:</strong> ' + data.monthStart + ' ' + data.yearStart + ' to ' + data.monthEnd + ' ' + data.yearEnd);
	var story = $('<div></div>').text('<strong>Story:</strong> ' + data.storyBody);
	$(displayStory).append(street, date, story);
	$('#storyModal').prepend(displayStory);
}


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
