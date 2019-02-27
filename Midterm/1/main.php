<?php

// Request headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE");

$target = $_GET['target'];

if ($target == 'a') {
    header("Location: ./target_a.php");
} 

if ($target == 'b') {
    header("Location: ./target_b.php");
} else {
    echo "Sorry target unknown";
}

?>