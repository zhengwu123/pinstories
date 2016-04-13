<!DOCTYPE html>
//zheng add php file here
<?php 

if(isset($_POST['submit'])) {
    
    
    $minimun = 5;
    $maximun = 30;

$username = $_POST['username'];
$password = $_POST['password'];
    
  if(strlen($username) < $minimun ) {
  
      echo "Username has to be longer than five";
  
  }  
    
    if(strlen($username) > $maximun  ) {
  
      echo "Username cannot be longer than 30 ";
  
  }  
    


}



?>
<html>
<head>
	<title>PHP Starter Application</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="style.css" />
</head>
<body>
<div class="wrapper">
	<div class="container">
		<h1>Welcome</h1>
		
	
		<form action="index.php" method="post">
    
<input type="text" name="username" placeholder="Enter Username">
<input type="password"  name="password" placeholder="Enter Password"><br>
<input type="submit" name="submit">
    
    
</form>
	</div>
	
	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>

</script>
</body>
</html>
