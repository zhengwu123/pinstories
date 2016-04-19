<?php include "db_connect.php";?>

<?php

function user_active($email){
$email = mysqli_real_escape_string($email);
$sql = "SELECT active, email FROM user WHERE email = '$email' AND active = 1";
$retval = mysqli_query($connection,$sql);
if(mysqli_num_rows($retval) > 0 ){
	return true;
else{

	return false;
}
mysqli_close($connection);
}
?>