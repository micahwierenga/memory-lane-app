console.log("connected?");

$(document).ready(function() {
	//display initial map
	var map = '';
	$.get('/api/map', function(data) {
		map = data;
		$('#mapScript').attr('src', map);
	});
	//collect the values from the form when submitted
	$('#storyModal form').submit(function(event) {
		event.preventDefault();
		var $street = $('#street').val();
		var $city = $('#city').val();
		var $monthStart = $('#monthStart').val();
		var $yearStart = $('#yearStart').val();
		var $monthEnd = $('#monthEnd').val();
		var $yearEnd = $('#yearEnd').val();
		var $storyBody = $('#storyBody').val();

		//send values to post route in order to create a new story in the db
		$.post('/api/story', {street: $street, city: $city, monthStart: $monthStart, yearStart: $yearStart, monthEnd: $monthEnd, yearEnd: $yearEnd, storyBody: $storyBody}, function(data) {
			displayStory(data);
		})
	})
});

function displayStory(data) {

	//take collected info from form, create a div, and prepend it to form
	var displayStory = $('<div></div>').attr('id', 'displayStory', 'class', 'row');
	var header = $('<div></div>').html('<span id="glyphicon-pencil" class="glyphicon glyphicon-pencil"></span><span id="glyphicon-remove" class="glyphicon glyphicon-remove"></span>');
	header.attr('id', 'header');

	var street = $('<div></div>').html('<strong>Street:</strong> ' + data.street);
	var date = $('<div></div>').html('<strong>From:</strong> ' + data.monthStart + ' ' + data.yearStart + ' to ' + data.monthEnd + ' ' + data.yearEnd);
	var story = $('<div></div>').html('<strong>Story:</strong> ' + data.storyBody);
	$(displayStory).append(header, street, date, story);
	$('#storyModal').prepend(displayStory);

	//allow user to delete a story
	$('#glyphicon-remove').click(function(event) {
		event.preventDefault();
		$.ajax({
			type: 'DELETE',
			url: '/api/story/' + data._id
		});
		$(displayStory).remove();
	})

	//allow user to edit a story
	$('#glyphicon-pencil').click(function(event) {
		event.preventDefault();
		var updateStory = 
		    "<form id='updateStoryForm' method='post' action='/story' name='updateStoryBody'>" +
		      "<div class='form-group row'>" +
		        "<input class='form-control' type='text' placeholder='Street' value='" + data.street + "' name='updateStreet' id='street'>" +
		        "<input class='form-control' type='text' placeholder='City' value='" + data.city + "' name='updateCity' id='city'>" +
		      "</div>" +
		      "<div class='form-group row'>" +
		        "<label  class=''>From</label>" +
		        "<input class='form-control' type='text' placeholder='Month' value='" + data.monthStart + "' name='monthStart' id='monthStart'>" +
		        "<input class='form-control' type='text' placeholder='Year' value='" + data.yearStart + "' name='yearStart' id='yearStart'>" +
		      "</div>" +
		      "<div class='form-group row'>" +
		        "<label class=''>To</label>" +
		        "<input class='form-control' type='text' placeholder='Month' value='" + data.monthEnd + "' name='monthEnd' id='monthEnd'>" +
		        "<input class='form-control' type='text' placeholder='Year' value='" + data.yearEnd + "' name='yearEnd' id='yearEnd'>" +
		      "</div>" +
		      "<div class='form-group row'>" +
		        "<textarea class='form-control' name='storyBody' value='Your Story' id='storyBody'>" + data.storyBody + "</textarea>" +
		      "</div>" +
		      "<div class='form-group'>" +
		        "<input class='btn btn-default' value='Update' type='submit'>" +
		      "</div>" +
		    "</form>";
		$(displayStory).html("");
		$(displayStory).prepend(updateStory);
		$('#storyModal form').trigger('reset');
		$('#updateStoryForm').submit(function(event) {
			event.preventDefault();
			var $streetUpdate = $('#street').val();
			var $cityUpdate = $('#city').val();
			var $monthStartUpdate = $('#monthStart').val();
			var $yearStartUpdate = $('#yearStart').val();
			var $monthEndUpdate = $('#monthEnd').val();
			var $yearEndUpdate = $('#yearEnd').val();
			var $storyBodyUpdate = $('#storyBody').val();
			$.ajax({
				type: 'PUT',
				url: '/api/story/' + data._id,
				data: {street: $streetUpdate, city: $cityUpdate, monthStart: $monthStartUpdate, yearStart: $yearStartUpdate, monthEnd: $monthEndUpdate, yearEnd: $yearEndUpdate, storyBody: $storyBodyUpdate},
				success: function(data) {
					$(displayStory).html("");
					var header = $('<div></div>').html('<span id="glyphicon-pencil" class="glyphicon glyphicon-pencil"></span><span id="glyphicon-remove" class="glyphicon glyphicon-remove"></span>');
					header.attr('id', 'header');
					var street = $('<div></div>').html('<strong>Street:</strong> ' + data.street);
					var date = $('<div></div>').html('<strong>From:</strong> ' + data.monthStart + ' ' + data.yearStart + ' to ' + data.monthEnd + ' ' + data.yearEnd);
					var story = $('<div></div>').html('<strong>Story:</strong> ' + data.storyBody);
					$(displayStory).append(header, street, date, story);
				}
			});
		})
	})
}

function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 39.4653, lng: -95.7364},
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

		//When a choice is made from Google's dropdown suggestions, 
		//fill the form's street and city fields with the search parameters
		var places = searchBox.getPlaces();
		var placesArr = places[0].formatted_address.split(", ");
		var searchStreet = placesArr[0];
		var searchCity = placesArr[1];
		var streetField = document.getElementById("street");
		streetField.value = searchStreet;
		var cityField = document.getElementById("city");
		cityField.value = searchCity;
		$.get('/api/story', function(stories) {
			stories.forEach(function(stories) {
				if (stories.street == searchStreet) {
					displayStory(stories);
				}
			})
		});

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
