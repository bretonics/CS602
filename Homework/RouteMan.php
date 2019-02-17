<?php

// Request headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE");
header("Content-type: application/json");
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 1 Jul 2000 01:00:00 GMT");

// Data from JSON file
$fileName = "route_man_datafile.json";
$data = json_decode(file_get_contents($fileName), true);

// Values (path) in URL
$path = $_SERVER['PATH_INFO'];

// Request method
$method = $_SERVER['REQUEST_METHOD'];

// Parse request
$called = explode('/', trim($path));

switch($method) {
    case "GET":
        // gets all reviews (/review)
        if($path == "/review") {
            echo json_encode($data);
            // echo "These are the reviews we have:<br><br>";
            // $reviews = getValues($data, "review");
            // foreach($reviews as $rev) { echo "$rev<br>"; }
        } else {
            // gets just one review based on route id (/review/[id])
            if(preg_match('/\/review\/(\d+)/', $path, $match)) {
                $id = $match[1];
                $review = getById($data, $id);
                // echo "Review for #$id: ";
                // echo $review['review'];
                if ($review != null) {
                    echo json_encode($review);
                } else {
                    echo "Sorry, no review with ID '$id'.";
                }
            }
        }
        break;

    case "POST":
        // Handle GUI path redirect
        if ($_POST['route_id']) { $path = "/review/" . $_POST['route_id']; }
        // edits an existing review (/review/[id])
        preg_match('/\/review\/(\d+)/', $path, $match);
        if($match) {
            $id = $match[1];
            $data = updateReview($data, $id);
            echo $data;  // JSON
            header("Location: ./RouteMan.php$path");
            // break;
        } else {
            // creates a new review (/review);
            $data = addReview($data);
            echo $data;
        }
        // Write new file and redirect to page with updated review
        file_put_contents($fileName, $data);
        break;

    case "DELETE":
        // delete a review (/review/[id])
        $data = deleteReview($data, $called[2]);
        // Write new review data to file
        file_put_contents($fileName, $data);
        echo $data;
}

// ---------------------------------------------------------------------
// HELPER FUNCTIONS

// Get information by review route_id value
function getById($data, $id) {
    $i = 0;
        foreach($data as $route) {
            if($route['route_id'] == $id) { return $data[$i]; }
        $i++;
    }
}

// Helper function to get information by key value
function getValues($data, $key) {
    $arr = [];
    foreach($data as $route) {
        array_push($arr, $route[$key]);
    }
    return $arr;
}

// Add new review from POST request
function addReview($reviews) {
    $new = array();
    // Recreate array from decode JSON string
    foreach($reviews as $review) {
        $tmp = array( "route_id" => $review["route_id"],
                      "name"      => $review["name"],
                      "location"  => $review["location"],
                      "caption"   => $review["caption"],
                      "review"    => $review["review"],
                    );
        // Append review array to new array
        $new[] = $tmp;
    }
    // Generate new review
    $newReview = array( "route_id" => rand(4,2234),
                        "name"      => $_POST["name"],
                        "location"  => $_POST["location"],
                        "caption"   => $_POST["caption"],
                        "review"    => $_POST["review"],
                        );
    // Add new review and return all reviews
    $new[] = $newReview;
    return json_encode($new, JSON_PRETTY_PRINT);
}

// Update a review
function updateReview($data, $id) {
    $i = 0;
    foreach ($data as $review) {
        if ($review["route_id"] == $id) {
            $review["name"]      = $_POST["name"];
            $review["location"]  = $_POST["location"];
            $review["caption"]   = $_POST["caption"];
            $review["review"]    = $_POST["review"];
            $data[$i] = $review;
        }
        $i++;
    }
    return json_encode($data, JSON_PRETTY_PRINT);
}

// Delete review by ID passed
function deleteReview($data, $id) {
    // Search for review matching id and remove from data
    array_splice($data, array_search(getById($data, $id), $data), 1);
    print_r($data);
    return json_encode($data, JSON_PRETTY_PRINT);
}

?>
