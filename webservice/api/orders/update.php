<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Orders.php';
include '../../config/request_method_handler.php';

//method handler
put_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$orders = new Orders($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$orders->updateColumn = $post_data->updateColumn;
$orders->updateValue = $post_data->updateValue;
$orders->order_id = $post_data->order_id;
$orders->organization_id = $post_data->organization_id;
//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($orders->updateManifest() == "True") {
    echo json_encode(
      array(
        "msg" => "Approval Status Was Successfully Updated"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Approval status was Unsucessful "
      )
    );
  }
} else {
  unAuthMsg();
}
