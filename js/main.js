$(document).ready(function(){
    //disable user copy and paste when entering input in email again 
    $('#email2').bind("cut copy paste",function(e) {
          e.preventDefault();
      });
    
//    //after user hits login btn
//    $('#login').submit(function(event){
//        // Stop form from submitting normally
//        event.preventDefault();
//        
//        //get user inputs
//        var login = getAccountAndPass();
//        //send inputs to server
//        $.post("index.php", {data: login}, function(results){
//            console.log(results);
//        });
//    });
    
     $('#signUp').click(function(e){
         // Stop form from submitting normally
//         event.preventDefault();
//         checkFormFilledOutOrNot();
     });
});

function checkBirth(){
    var month = $("#birth-month").val(),
    day = $("#birth-day").val(),
    year = $("#birth-year").val();
    console.log(month);
    console.log(day);
    if(month != 0 && day != 0 && year != 0){
        $('#signUp').removeAttr('disabled');
    }
    else{
        $('#signUp').attr('disabled', 'disabled');
    }
}


function getAccountAndPass(){
    //get user inputs
    var login ={
        accout: $('#login-account').val(),
        pass: $('#login-password').val()
    };
    return login;
}

function checkFormFilledOutOrNot(){
    $('form > input').keyup(function() {
        var empty = false;
        $('form > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });
        $('form > select').each(function() {
            if ($(this).val() == 0) {
                console.log("in birth");
                empty = true;
            }                        
        });

        if (empty) {
            $('#signUp').attr('disabled', 'disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
            return false;
        } else {
            $('#signUp').removeAttr('disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
            return true;
        }
    });
}

function getVals(){
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
        console.log("Print year: " + year);
}