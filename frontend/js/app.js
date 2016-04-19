var map = null;
var infoWindow;
var chicago = {lat: 41.85, lng: -87.65};
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
     zoom: 12,
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
     mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
    
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
       });
    } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, map.getCenter());
    }
    var acOptions = {
        types: ['establishment']
    };
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), acOptions);
    autocomplete.bindTo('bounds', map);
    infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
     map: map
    });
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
});
    
    //disable autocomplete input field
    
    
}


// Try HTML5 geolocation.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 infoWindow.setPosition(pos);
 infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
}


google.maps.event.addDomListener(window, 'load', initialize);