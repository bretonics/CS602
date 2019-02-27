<?php

    // Request method
    $method = $_SERVER['REQUEST_METHOD'];

    // Query string
    if ($method == "GET") {
        $age = $_GET['age'];
        $lastName = $_GET['lastName'];
        
        echo "Querystring age: ", $age, "\n";
        echo "Querystring lastName: ", $lastName, "\n";
    }
    
    // HTML Form
    if ($method == "POST") {
        $age = $_POST['age'];
        $lastName = $_POST['lastName'];
        echo "HTML form age: ", $age, "\n";
        echo "HTML form lastName: ", $lastName, "\n";
    }

?>