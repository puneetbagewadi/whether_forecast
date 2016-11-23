(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}

		// Call Weather API and get the response in JSON

		// Callback functions

		// Success callback
		var updatePage = function( response ) {
			console.log("API response");
		  	console.log(response);
		  	var prevDate = '';
		  	var uniqdate = '';
		  	$.each( response.list, function(index, value) {
		  		
   				if(new Date(value.dt_txt).getDate() === prevDate){
   					uniqdate = value.dt_txt;
   					$( "#hourlyTemplate" ).tmpl( value ).appendTo( ".dayforecast" + uniqdate.slice(0, 10) );
   				}else{
   					prevDate = new Date(value.dt_txt).getDate();
   					value.city_name = response.city.name;
   					value.dt_readable = new Date(value.dt_txt).toString().slice(0, 15);
   					$( "#weatherTemplate" ).tmpl( value ).appendTo( "#forecast-tab" );
   				}
			});
		};

		// Error callback
		var displayError = function( req, status, err ) {
		  console.log( 'something went wrong', status, err );
		};

		var weatherOptions = {
		  url: 'http://api.openweathermap.org/data/2.5/forecast?id=1277333&APPID=f32739e98977f8602979fb6fa944da7f',
		  dataType: 'json',
		  success: updatePage,
		  error: displayError
		};

		// Initiate the request!
		$.ajax(weatherOptions);
	});

})(jQuery, document, window);