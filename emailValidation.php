<?php include "includes/db_connect.php";
	  include "includes/functions.php";
	 ob_start();
   session_start();
 ?>



<?php


$emailaddress = $_SESSION['email1'];
$hashValue = $_SESSION['ha'] ;

$msg = "Welcome to Pinstories.com. \n Please copy the code below and paste to the to Confirm Email button
to active your account.        \n".$_SESSION['ha'] ;

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

mail($emailaddress,"Email confirmatio from Pinstories.com",$msg);
/*if($mail){
  echo "Thank you for using our mail form";
}else{
  echo "Mail sending failed."; 
}
*/
//echo !user_active($emailaddress);
if(isset($_POST['confirm'])){
	$hasht = mysqli_real_escape_string($connection,$_POST['emailcode']);
if(!user_active($emailaddress)){
	if($hasht == $hashValue && strlen($hasht) == 32){
$sql = "UPDATE user SET active = 1 WHERE email = '$emailaddress' AND hash = '$hashValue'";
$retval = mysqli_query($connection,$sql);
 					 if(! $retval )
                    {
                    echo '<script language="javascript">';
                    echo 'alert("open data error ")';
                    echo '</script>';
                    die('Could not get data: ' . mysqli_error());
                      }
                      mysqli_close($connection);
                      $_SESSION['valid'] = true;
echo '<script language="javascript">';
echo 'alert("Active Success, Logging ... ")';
echo '</script>';
echo '<script language="javascript">';
echo 'window.location = "http://pinstories.com/mainApp.php"';
echo '</script>';
}

/*else{
	echo '<script language="javascript">';
      echo 'alert("wrong active code ")';
      echo '</script>'	
}
*/
}
else{
	echo '<script language="javascript">';
      echo 'alert("email is already activated! please log in ")';
      echo '</script>';
      echo '<script language="javascript">';
       echo 'window.location = "http://pinstories.com/index.php"';
       echo '</script>';
}
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>
<body>
<div class="container">
    
    <div class="col-sm-6">
    <div class="row">
            
              <h4>Don't close this window when validating email.</h4>
            </div>
        <form action="emailValidation.php" method="post">
            <div class="form-group">
            <label for="emailcode">Please check your mailbox and paste active code below</label>
            <input type="text" name="emailcode" class="form-control">
            </div>
            <button type="submit" class="btn btn-success" id="confirm" name="confirm">Confirm Email</button>
            
        </form>
    </div>





</div>
</body>
</html>