<!DOCTYPE html>
<html>
<head>
	<title>Pinstories</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link href="bootstrap.css" rel="stylesheet">
<link href="bootstrap-switch.css" rel="stylesheet">
<script src="jquery.js"></script>
<script src="bootstrap-switch.js"></script>
</head>
<body>
<nav class = "nav navbar-inverse">
<!-- logo -->
<div class ="navbar-header">
<a href = "http://pinstories.mybluemix.net" class = "navbar-brand">PinStories</a>
</div>
<ul class = "nav navbar-nav navbar-right">
<li><a href ="http://pinstories.mybluemix.net"><input class="btn btn-success" type="submit" name="login" value="Login"></a></li>
</ul>
</nav>
	<div class = "container-fluid">
	<div class = "col-xs-6">
	
		<form action="login.php" method="post">
            <div class="form-group">
            <label for="firstname">First Name</label>
            <input type="text" name="firstname" class="form-control">
            </div>

            <div class="form-group">
            <label for="lastname">Last Name</label>
            <input type="text" name="lastname" class="form-control">
            </div>

            <div class="form-group">
            <label for="email">Email</label>
            <input type="text" name="email" class="form-control">
            </div>
            
             <div class="form-group">
                <label                                                                  for="password">Password</label>
            <input type="password" name="password" class="form-control">
            </div>
            <div class="form-group">
                <label                                                                  for="my-checkbox">Gender</label>
            <input type="checkbox" name="my-checkbox" class="form-control">
            </div>
            
            <input class="btn btn-success" type="submit" name="submit" value="Submit">
            
        </form>
	
	</div>

</body>
</html>
