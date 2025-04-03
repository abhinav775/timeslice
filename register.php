<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "timeslice";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT); 
    $fullname = $_POST['fullname'];
    $dob = $_POST['dob'];

    $sql = "INSERT INTO users (username, password, fullname, dob) VALUES ('$user', '$pass', '$fullname', '$dob')";
    
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Registration successful!'); window.location.href='login.html';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>