console.log("connected?");

$(document).ready(function() {
	var map = '';
	$.get('/api/map', function(data) {
		map = data;
		$('#googleMaps').attr('src', map);
	})

	$('.row form').submit(function(event) {
	event.preventDefault();
	var data = $(this).serialize();
	$.post('api/searchMap', function(data) {
		console.log(data);
	}).done(function(res) {
		console.log(res);
		console.log(data.street);
		$('#googleMaps').attr('src', res + data);
	})
	})
});








// var mapDisplay = $.ajax({
// 	method: "GET",
// 	url: "https://restcountries.eu/rest/v1/all"
// }).done(function(countries) {
// 	// var countriesArr = jQuery.parseJSON(allCountries.responseText);
// 	// for (var i = 0; i < countriesArr.length; i++) {
// 	// 	var countriesList = document.getElementById("countriesList");
// 	// 	var countriesItem = document.createElement('li');
// 	// 	countriesItem.innerHTML = countries[i].name;
// 	// 	countriesList.appendChild(countriesItem);
// 	// 	}
// 	})

// $("#searchCountriesForm").submit(function(event) {
// 	event.preventDefault();
// 	var $countryVal = $("#searchCountriesInput").val();
// 	var $selectedCountry = $countryVal.toLowerCase();
// 	var countrySearch = $.ajax({
// 		type: "GET",
// 		url: "https://restcountries.eu/rest/v1/name/" + $selectedCountry,
// 		data: JSON.stringify({}),
// 		dataType: "json"
// 	}).done(function(country) {
// 	var selectedCountryDisplay = jQuery.parseJSON(countrySearch.responseText);
// 	for (var i = 0; i < selectedCountryDisplay.length; i++) {
// 		var googleMaps = document.getElementById('googleMaps').src = "https://www.google.com/maps/embed/v1/place?q=" + selectedCountryDisplay[i].name + "&key=";
// 		var countriesList = document.getElementById("countriesList");
// 		countriesList.innerHTML = "";
// 		var countriesItemName = document.createElement('li');
// 		countriesItemName.innerHTML = selectedCountryDisplay[i].name;
// 		countriesList.appendChild(countriesItemName);
// 		var countriesItemCapital = document.createElement('li');
// 		countriesItemCapital.innerHTML = selectedCountryDisplay[i].capital;
// 		countriesList.appendChild(countriesItemCapital);
// 		}
// 	});
// });