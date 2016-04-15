
<?php
include_once 'dbConfig.php';
include_once 'db_connect.php';
if(isset($_POST['signUp'])){

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email1 = $_POST['email1'];
$email2 = $_POST['email2'];
$password = $_POST['new-password'];
$birthday = $_POST['picker1'];
$gender = $_POST['optradio'];
if(! $mysqli ) {
      die('Could not connect: ' . mysql_error());
   }
   
   $sql = 'INSERT INTO user '.
      '(first name,last_name, email, password, gender, birthday) '.
      'VALUES ( "$firstname", "lastname", "$email1", "$new-password","$gender","$birthday")';
      
   mysql_select_db('pinstories');
   $retval = mysql_query( $sql, $mysqli );
   
   if(! $retval ) {
      die('Could not enter data: ' . mysql_error());
   }
   
   echo "Entered data successfully\n";
   
   mysql_close($conn);

}
?>

<!doctype html>
<html class="no-js" lang="en-us">
    <head>
        <!-- Fonts -->
        <link href='https://fonts.googleapis.com/css?family=Fjalla+One' rel='stylesheet' type='text/css'>
        
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Pinstories</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Place favicon.ico in the root directory -->

        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
        
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="css/bootstrap.css">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
        
        <!-- my CSS -->
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        
        
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        
        <!-- front end by maoxia -->
        
         <main>
         <nav class="navbar navbar-inverse navbar-custom">
          <div class="container navbar-top-container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand navbar-brand-custom" href="http://www.pinstories.com">PinStories</a>
            </div><!-- End of navbar header -->
            
            <div id="navbar" class="collapse navbar-collapse">
              <!-- Login -->
                <div class="container">
                    <form class="navbar-form navbar-right">
                    <div class="form-group">
                      <input type="email" placeholder="Email" class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="password" placeholder="Password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-success" id = "login">Log in</button>
                  </form>
                </div><!-- End of login -->
            </div><!--/.nav-collapse -->
          </div><!-- End of Container -->
        </nav><!-- End of Nav -->
         

        <!-- Sign Up -->
        <div class="container">
          <div class="row">
             <!-- Image Holder -->
              <div class="col-md-6 myimg">
                  <img src="images/animate-map.png" alt="image" width="100%" height="100%">
              </div>
              <!-- Sign Up place -->
              <div class="col-md-6">
                 <div class="row">
                     <h1>Sign Up</h1>
                     <p>Get Some Awesome Stuff Today!</p>
                 </div><!-- End of row -->
                 
                 <div class="row">
                     <form action="index.php" class="form-inline" method = "post">
                         <div class="form-group">
                             <input type="text" class="form-control" id="firstname" placeholder="First Name">
                         </div>
                         <div class="form-group">
                             <input type="text" class="form-control" id="lastname" placeholder="Last Name">
                         </div>
                     </form>
                 </div><!-- End of row -->
                 
                 <div class="containerfluid vertical">
                     <div class="row top-buffer">
                         <form class="form" role="form">
                              <div class="form-group">
                                <input type="email" class="form-control" id="email1" placeholder="Email">
                              </div>
                        </form>
                     </div><!-- End of row -->
                     <div class="row top-buffer">
                         <form class="form" role="form">

                              <div class="form-group">
                                <input type="email" class="form-control" id="email2" placeholder="Re-enter Email">
                              </div>
                        </form>
                     </div><!-- End of row -->
                     <div class="row top-buffer">
                             <form class="form" role="form">
                                  <div class="form-group">
                                    <input type="password" class="form-control" id="new-password" placeholder="New Password">
                                  </div>
                            </form>
                     </div><!-- End of row -->
                     <div class="row top-buffer">
                             <form class="form" role="form">
                                  <div class="form-group">
                                   <label for="birthday">Birthday</label>
                                    <div class="picker" id="picker1"></div>
                                  </div>
                            </form>
                     </div><!-- End of row -->
                     <div class="row top-buffer">
                             <div class="btn-group" data-toggle="buttons">
                                <label>
                                    <input type="radio" id="female" name="optradio" value="0" /> Female
                                </label> 
                                <label>
                                    <input type="radio" id="male" name="optradio" value="1"  /> Male
                                </label> 
                            </div>
                     </div><!-- End of row -->
                     <div class="row top-buffer">
                            <hr>
                             <button type="button" class="btn btn-success btn-lg" id = "signUp">Sign Up</button>  
                     </div><!-- End of row -->
                 </div><!-- End of vertical inputs -->
              </div><!-- End of Signup -->
          </div><!-- End of row -->
        </div><!-- End of Sign Up -->
        
        <!-- Footer -->
        <div class="container text-center" id="copyright">
            <span>&copy; Copyright @ 2016</span>
        </div>
        
        </main>



        <script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/jquery-ui.min.js"></script>
        <script type="text/javascript" src="js/bday-picker.js"></script>
        <script type="text/javascript">
          $(document).ready(function(){
            $("#picker1").birthdaypicker({});
          });
        </script>

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
    </body>
</html>
