<?php
    // Get session and cookie values
    session_start();
    $username = $_COOKIE['username'];
    $password = $_COOKIE['password'];

    // User
    echo "Welcome ", $username;
    echo "Your password is ", $password;
?>