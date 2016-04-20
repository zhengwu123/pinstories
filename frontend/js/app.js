var map = null;
var infoWindow;
var chicago = new google.maps.LatLng(41.85, -87.65);
var siberia = new google.maps.LatLng(60, 105);
var initialLocation;
var browserSupportFlag = new Boolean();
var markers = [];

//customize icons of geomarker
var geoImg = {
    url: './images/47112-200.png',
    size: new google.maps.Size(200, 200),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
    scaledSize: new google.maps.Size(32, 32)
};

// Shapes define the clickable region of the icon. The type defines an HTML
// <area> element 'poly' which traces out a polygon as a series of X,Y points.
// The final coordinate closes the poly by connecting to the first coordinate.
var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
};

function initialize() {
 var myWrapper = $("#wrapper");
 $("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  myWrapper.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
   // code to execute after transition ends
   google.maps.event.trigger(map, 'resize');
  });
 });
 //add attr to map
 var mapOptions = {
  center: chicago,
  zoom: 13,
  disableDefaultUI: true,
  mapTypeControl: true,
  mapTypeControlOptions: {
   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
  },
  zoomControl: true,
  zoomControlOptions: {
   position: google.maps.ControlPosition.RIGHT_CENTER
  },
  navigationControl: true,
  navigationControlOptions:
  {
    style: google.maps.NavigationControlStyle.ZOOM_PAN
  },
  scaleControl: true,
  mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 // Insert map to the page
 map = new google.maps.Map(document.getElementById('map'), mapOptions);
 //GeoMarker = new GeolocationMarker(map);
 
 // Create the DIV to hold the center control and call the CenterControl()
 // constructor passing in this DIV.
 var centerControlDiv = document.createElement('div');
 var centerControl = new CenterControl(centerControlDiv, map);

 centerControlDiv.index = 1;
 // Append the center control on google map
 map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);
 
 // Create div to hold pinControl
 var pinControlDiv = document.createElement('div');
 var pinControl = new PinControl(pinControlDiv, map);

 pinControlDiv.index = 1;
 // Append the pin control on google map
 map.controls[google.maps.ControlPosition.LEFT_TOP].push(pinControlDiv);
     
    
 // Add event action when user click on map    
 //google.maps.event.addListener(map, 'click', placeMarker);

 // Try W3C Geolocation (Preferred)
 if (navigator.geolocation) {
  browserSupportFlag = true;
  navigator.geolocation.getCurrentPosition(function(position) {
   initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   var marker = new google.maps.Marker({
            map: map,
            position: initialLocation,
            icon: geoImg,
            shape: shape
        });
   map.setZoom(17);      
   map.setCenter(initialLocation);
  }, function() {
   handleNoGeolocation(browserSupportFlag);
  });
 }
 // Browser doesn't support Geolocation
 else {
  browserSupportFlag = false;
  handleNoGeolocation(browserSupportFlag);
 }
// End of geo location
    
 //Auto complete search bar    
 var acOptions = {
  types: ['establishment']
 };
 var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), acOptions);
 autocomplete.bindTo('bounds', map);
 infoWindow = new google.maps.InfoWindow();
 var marker = new google.maps.Marker({
  map: map
 });
 // Event handling when usr typing in search input field    
 google.maps.event.addListener(autocomplete, 'place_changed', function() {
  infoWindow.close();
  var place = autocomplete.getPlace();
  if (place.geometry.viewport) {
   map.fitBounds(place.geometry.viewport);
  } else {
   map.setCenter(place.geometry.location);
   map.setZoom(17);
  }
  marker.setPosition(place.geometry.location);
  infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
  infoWindow.open(map, marker);
  google.maps.event.addListener(marker, 'click', function(e) {

   infoWindow.open(map, marker);
  });
 });// End of auto complete
} // End of function initialize

// Place marker on map when user click on map
//function placeMarker(event) {
//    var marker = new google.maps.Marker({
//        position: event.latLng, 
//        map: map,
//        draggable: true
//    });
//    markers.push(marker);
//    google.maps.event.addListener(marker, 'click', function() {
//        marker.setMap(null);
//        for (var i = 0, len = markers.length; i < len && markers[i] != marker; ++i);
//        markers.splice(i, 1);
//    });
//    google.maps.event.addListener(marker, 'dragend', function() {
// 
//    });
//}

 // Handling geo location Err
 function handleNoGeolocation(errorFlag) {
  if (errorFlag == true) {
   alert("Geolocation service failed.");
   initialLocation = chicago;
  } else {
   alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
   initialLocation = siberia;
  }
  map.setCenter(initialLocation);
 }

//Add GeoLocation Control on map
function CenterControl(controlDiv, map) {

 // Set CSS for the control border.
 var controlUI = document.createElement('div');
 controlUI.style.backgroundColor = '#fff';
 controlUI.style.border = '2px solid #fff';
 controlUI.style.borderRadius = '3px';
 controlUI.style.marginTop = '10px';
 controlUI.style.marginRight = '10px';
 controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
 controlUI.style.cursor = 'pointer';
 controlUI.style.textAlign = 'center';
 controlUI.title = 'Click to recenter the map';
 controlDiv.appendChild(controlUI);

 // Set CSS for the control interior.
 var controlIcon = document.createElement('div');
 controlIcon.style.backgroundImage = "url('images/" + "rsz_ic_my_location_black_48dp.png')";   
 controlIcon.style.height = '36px';
 controlIcon.style.width = '36px';
 controlUI.appendChild(controlIcon);

 // Setup the click event listeners: simply set the map to user initialLocation.
 controlUI.addEventListener('click', function() {
  map.setCenter(initialLocation);
 });
}


// Create pin button
function PinControl(controlDiv, map) {
 // Set CSS for the control border.
 var controlUI = document.createElement('div');
 controlUI.style.backgroundColor = '#fff';
 controlUI.style.border = '2px solid #fff';
 controlUI.style.borderRadius = '3px';
 controlUI.style.marginTop = '10px';
 controlUI.style.marginLeft = '10px';
 controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
 controlUI.style.cursor = 'pointer';
 controlUI.style.textAlign = 'center';
 controlUI.title = 'Click to add marker';
 controlDiv.appendChild(controlUI);

 // Set CSS for the control interior.
 var controlIcon = document.createElement('div');
 controlIcon.style.backgroundImage = "url('images/" + "rsz_299087.png')";   
 controlIcon.style.height = '36px';
 controlIcon.style.width = '36px';
 controlUI.appendChild(controlIcon);
}

google.maps.event.addDomListener(window, 'load', initialize);