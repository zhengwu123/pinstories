var map = null;
var infoWindow;
var chicago = {lat: 41.85, lng: -87.65};
var userLocation;
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
    
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);
    
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
        //update user location
        userLocation = pos;
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
}//end of function initialize


// Try HTML5 geolocation.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 infoWindow.setPosition(pos);
 infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
}

function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.marginTop ='10px';
  controlUI.style.marginRight = '10px';   
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  //controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlIcon = document.createElement('div');
  //controlIcon.style.backgroundImage = url('images/black_icon.png');
  controlIcon.style.backgroundImage = "url('images/" + "mylocation-sprite-cookieless-v2-2x.png')"
  //controlIcon.style.backgroundColor = 'rgb(25,25,25)';
  controlIcon.style.height = '36px';
  controlIcon.style.width = '36px';   
  controlUI.appendChild(controlIcon);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(userLocation);
  });
}



google.maps.event.addDomListener(window, 'load', initialize);