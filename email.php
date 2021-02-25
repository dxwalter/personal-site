<?php


file_get_contents("php://input");

$emailAddress = $_POST['email'];
$subject = $_POST['subject'];
$body = $_POST['body'];


    // multiple recipients
$to  = 'walter@danielwalter.me' . ', ' . ', '.'realdanielwalter@gmail.com'; // note the comma
$to .= 'theceoforlife@gmail.com';

// subject
if (!$subject) {
    $subject = 'No subject was specified';
}

// message
$message = '
<html>
<head>
  <title>Message from '.$emailAddress.'</title>
</head>
<body>
  <p>'.$body.'</p>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'To: Daniel <walter@danielwalter.me>, Daniel <realdanielwalter@gmail.com>, Walter <theceoforlife@gmail.com>' . "\r\n";
$headers .= 'From: <'.$emailAddress.'>' . "\r\n";
$headers .= 'Cc: realdanielwalter@gmail.com' . "\r\n";
$headers .= 'Bcc: realdanielwalter@gmail.com' . "\r\n";

// Mail it
    @$retrival =  mail($to, $subject, $message, $headers);

    if($retrival == true) {
        echo "true";
    }else {
       echo "false";
    }
?>
