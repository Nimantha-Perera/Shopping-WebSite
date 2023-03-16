<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vegitable";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$repass = $_POST['repass'];

// Insert data into database
$sql = "INSERT INTO reg (name, email, password, re_password)
        VALUES ('$name', '$email', '$password', '$repass')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);

?>

