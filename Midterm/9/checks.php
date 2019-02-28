<?php
    session_start();

    // Get values
    $username = $_POST['username'];
    $password = $_POST['password'];

    echo $username, strlen($username);
    echo $password;

    if (5>strlen($username)) {
        header("Location: ./credentials.php");
    } else
    if (strlen($username)>20) {
        header("Location: ./credentials.php");
    } else
    if (5>strlen($password)) {
        header("Location: ./credentials.php");
    } else
    if (strlen($password)>20) {
        header("Location: ./credentials.php");
    } else { 
        // Set cookies and redirect
        setcookie("username", $username);
        setcookie("password", $password);
        header("Location: ./welcome.php");
    }
?>