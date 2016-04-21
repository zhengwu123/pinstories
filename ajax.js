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
