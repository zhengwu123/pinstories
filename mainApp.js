var map = null;
var chicago = new google.maps.LatLng(41.85, -87.65);
var siberia = new google.maps.LatLng(60, 105);
var initialLocation;
var browserSupportFlag = new Boolean();
var markers = [];
var GPSlocation;
var storyTitle;
var storyContent;
var lanTo;
var lngTo;
var pinObj = {};

var html = '<div class="container">' + 
    '<form action="mainApp.php" data-toggle="validator" role="form" id="pin-story" method="post">'+'<div class="container vertical">' +'<!-- Story Title--><div class="row top-buffer">' +'<div class="form-group has-feedback">' + '<input type="text" class="form-control" id="story-title" name="story-title" placeholder="Title" required>' +'<span class="glyphicon form-control-feedback" aria-hidden="true"></span>'+'<div class="help-block with-errors"></div>'+'</div>'+'</div>'+'<!-- End of Title --><!-- Story --><div class="row top-buffer">'+'<div class="form-group has-feedback">' + '<input type="text" class="form-control" id="story-content" name="story-content" placeholder="Say something..." required>' +'<span class="glyphicon form-control-feedback" aria-hidden="true"></span>'+'<div class="help-block with-errors"></div>'+'</div>'+'</div>'+'<!-- End of Story --><!-- Sumbit Button --><div class="row top-buffer">' + '<button type="submit" class="btn btn-success btn-lg" id="PIN" name="PIN" onclick="ajax_post()"">PIN</button>'+'<p id="res"></p>'+'</div>' + '</div>' + '</form>' + '</div>';
  
      
      
        

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
  draggableCursor: 'pointer',     
  styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}],
  mapTypeId: google.maps.MapTypeId.ROADMAP
 };// End of setting map options
    
    
 // Insert map to the page
 map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
 // Try W3C Geolocation (Preferred)
 if (navigator.geolocation) {
  browserSupportFlag = true;
  navigator.geolocation.getCurrentPosition(function(position) {
       initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);   
       var marker = new google.maps.Marker({
                map: map,
                position: initialLocation,
                icon: geoImg,
                shape: shape,
            });
       map.setZoom(13);      
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
    
 // Create the DIV to hold the CENTER control and call the CenterControl()
 // constructor passing in this DIV.
 var centerControlDiv = document.createElement('div');
 var centerControl = new CenterControl(centerControlDiv, map);

 centerControlDiv.index = 1;
 // Append the center control on google map
 map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);
 
 // Create div to hold PIN Control
 var pinControlDiv = document.createElement('div');
 var pinControl = new PinControl(pinControlDiv, map);

 pinControlDiv.index = 1;
 // Append the pin control on google map
 map.controls[google.maps.ControlPosition.LEFT_TOP].push(pinControlDiv);
 
 // Create div to hold SELECT Control
 var selectControlDiv = document.createElement('div');
 var selectControl = new SelectControl(selectControlDiv, map);

 selectControlDiv.index = 1;
 // Append the select control on google map
 map.controls[google.maps.ControlPosition.LEFT_TOP].push(selectControlDiv);
    
// // Add event action when user click on map    
 google.maps.event.addListener(map, 'click', function(){
     infoWindow.close();
 });
    
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
    
    
 $('#pin-story').submit(function(evt) {
      evt.preventDefault();
      var url = $(this).attr("action");
      $.ajax({
                type: "post",
                data: {"data": JSON.stringify(pinObj)},
                url: url,
                success: function(data) {
                    console.log(data);
                    $('res').html("success");
                }

            });

    }); // end submit    
} // End of function initialize

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
 controlUI.style.backgroundColor = 'transparent';
 controlUI.style.border = '2px solid transparent';
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
  map.setZoom(15);     
 });
}// End of Geo Control


// Create pin button
function PinControl(controlDiv, map) {
 // Set CSS for the control border.
 var controlUI = document.createElement('div');
 controlUI.style.backgroundColor = 'transparent';
 controlUI.style.border = '2px solid transparent';
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
    
 // Setup the click event listeners: let user put pin on map
 controlUI.addEventListener('click', function() {
    console.log("clicked add marker");
//    var cursorArea = document.getElementById('map');
//    cursorArea.style.cursor = 'crosshair';
     map.set('draggableCursor', 'crosshair');
     google.maps.event.addListenerOnce(map, 'click', function(event) {
        placeMarker(event.latLng);
        map.set('draggableCursor', 'pointer');
     });
 });
} // End of Pin Control

function placeMarker(location) {
    //save loaction here
    GPSlocation = location;
    var marker = new google.maps.Marker({
            position: location, 
            //later might only enable owner of pin to drag 
            draggable: true,
            map: map
        });
    map.panTo(location);

    var infowindow = new google.maps.InfoWindow({
     content: html
    });
    infowindow.open(map, marker);
    // Add action to marker
    google.maps.event.addListener(marker, 'click', function(event) {
         infowindow.open(map, marker);
     });
    // Close infoWindows when user click on map
    google.maps.event.addListener(map, 'click', function(event) {
         infowindow.close();
     });
    // Add action to pin button
    document.getElementById('PIN').addEventListener("click", function(){
        storyTitle = $('#story-title').val();
        storyContent = $('#story-content').val();
        lanTo = location.lat();
        lngTo = location.lng();
        //check if it's valid data input to send to server
        if (storyContent.length != 0 && storyTitle.length != 0){
            //construct the pin object
            pinObj.storyTitle = storyTitle;
            pinObj.storyContent = storyContent;
            pinObj.lanTo = lanTo;
            pinObj.lngTo = lngTo;
        }
    });
}


// Create select button
function SelectControl(controlDiv, map) {
 // Set CSS for the control border.
 var controlUI = document.createElement('div');
 controlUI.style.backgroundColor = 'transparent';
 controlUI.style.border = '2px solid transparent';
 controlUI.style.borderRadius = '3px';   
 controlUI.style.marginTop = '10px';
 controlUI.style.marginLeft = '10px';
 controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
 controlUI.style.cursor = 'pointer';
 controlUI.style.textAlign = 'center';
 controlUI.title = 'Click to select item';
 controlDiv.appendChild(controlUI);

 // Set CSS for the control interior.
 var controlIcon = document.createElement('div');
 controlIcon.style.backgroundImage = "url('images/" + "rsz_hand_cursor.png')";   
 controlIcon.style.height = '36px';
 controlIcon.style.width = '36px';
 controlUI.appendChild(controlIcon);
    
 // Setup the click event listeners: let user put pin on map
 controlUI.addEventListener('click', function() {
    console.log("clicked select");
    map.set('draggableCursor', 'pointer');
    
 });
}

function ajax_post(){
    // Create our XMLHttpRequest object
    var hr = new XMLHttpRequest();
    // Create some variables we need to send to our PHP file
    var url = "parse_pin.php";
    var title = document.getElementById("story-title").value;
    var content = document.getElementById("story-content").value;
    var lat = GPSlocation.lat();
    var long = GPSlocation.lng();
    var vars = "title="+title+"&content="+content + "&latitude="+lat+"&longitude="+ long;
    hr.open("POST", url, true);
    // Set content type header information for sending url encoded variables in the request
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // Access the onreadystatechange event for the XMLHttpRequest object
    hr.onreadystatechange = function() {
      if(hr.readyState == 4 && hr.status == 200) {
        var return_data = hr.responseText;
      window.alert(return_data);
      
      }
    }
    // Send the data to PHP now... and wait for response to update the status div
    hr.send(vars); // Actually execute the request
     
}

google.maps.event.addDomListener(window, 'load', initialize);