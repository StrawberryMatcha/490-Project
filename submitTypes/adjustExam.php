<?php
    session_start();
    header("Content-type: application/json; charset=UTF-8");
    // Receive form data from HTML POST
    $data = file_get_contents("php://input");

    // Initiate cURL session
    $ch = curl_init();
    // Set cURL target to middle PHP document
    curl_setopt($ch, CURLOPT_URL, "https://afsaccess4.njit.edu/~dm634/CS490/adjustExam.php");
    
    // Receive server response as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Use POST
    curl_setopt($ch, CURLOPT_POST, true);
    // Set data to be sent
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    
    // Receive response from server
    $cresponse = curl_exec($ch);

    // End cURL session
    curl_close($ch);

    // Return reponse to HTML for processing
    echo $cresponse;
    
?>