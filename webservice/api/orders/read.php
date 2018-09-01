<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Orders.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$orders = new Orders($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$orders->organization_id = $post_data->organization_id;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  $results = $orders->readOrders();

  //check if rows
  
    //return data
    $records = array();
    while ($data = $results->fetch(PDO::FETCH_ASSOC)) {
      array_push($records, $data);
    }

    echo json_encode($records);
} else {
  unAuthMsg();
}
