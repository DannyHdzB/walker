// JavaScript Document
	var map,
        currentPosition,
        directionsDisplay, 
        directionsService,
		marcador;
	var coordenadas = {
			Lat: 0,
			Lng: 0
		};
		
	var path = [];
	
  function initialize() {
	  
    var latlng = new google.maps.LatLng(-34.397, 150.644);
	
    var myOptions = {
      zoom: 18,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    };
	
    map = new google.maps.Map(document.getElementById("map-canvas"),
        myOptions);
    marcador = new google.maps.Marker( {
		position: latlng,
		map:map	
	})
	
	var polyOptions = {
		path: path,
	  	strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3
	};
	
	poly = new google.maps.Polyline(polyOptions);
  	poly.setMap(map);
	/*
	google.maps.event.addListener(map, 'click', function(e) {
    placeMarker(e.latLng, map);
    });
	*/
	
	google.maps.event.addListener(map, 'click', addLatLng);
	
	navigator.geolocation.getCurrentPosition( lecturaGPS , errorGPS , {enableHighAccuracy:true} );

  }

  function mostrarUbicacion(){
		navigator.geolocation.getCurrentPosition( lecturaGPS , errorGPS , {enableHighAccuracy:true} )  
  }

  function getpuntos(){
  		navigator.geolocation.watchPosition( rutaGPS , errorGPS , {enableHighAccuracy:true, 
  																	   timeout : Infinity,
																	   maximumAge : 0,
																	} ); 
  }

  function lecturaGPS(ubicacion){
	  var miubicacion = new google.maps.LatLng(ubicacion.coords.latitude, ubicacion.coords.longitude);
	  
	  map.setCenter(miubicacion)
	  marcador.setPosition(miubicacion)
  }
  
  function rutaGPS(ubicacion){
	  var miubicacion = new google.maps.LatLng(ubicacion.coords.latitude, ubicacion.coords.longitude);
	  
	  var path = poly.getPath();
	  path.push(new google.maps.LatLng(ubicacion.coords.latitude, ubicacion.coords.longitude));
	  
	  map.setCenter(miubicacion)
	  marcador.setPosition(miubicacion)
  }
  
  function borraGPS(){
	  	poly.setMap(null);
	  }

  function errorGPS(){
	  alerta(" no puedo encontrarte :(")
  }
  
  function placeMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  map.panTo(position);
  }
  
  function addLatLng(event) {

  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + path.getLength(),
    map: map
  });
}

      google.maps.event.addDomListener(window, 'load', initialize);

	  

