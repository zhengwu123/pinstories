$(document).ready(function(){
     $('#email2').bind("cut copy paste",function(e) {
          e.preventDefault();
      });
});
function validateForm(){
    var firstName = $("#firstname").val(),
        lastName = $("#lastname").val(),
        email1 = $("#email1").val(),
        email2 = $("#email2").val(),
        newPassword = $("#new-password").val(),
        month = $("#birth-month").val(),
        day = $("#birth-day").val(),
        year = $("#birth-year").val(),
        female = $("#female").val(),
        male = $("#male").val();
}

