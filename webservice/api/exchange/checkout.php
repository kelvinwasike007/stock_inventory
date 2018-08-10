<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Exchange.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$exchange = new Exchange($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$exchange->organization_id = $post_data->organization_id;
$exchange->consumer_id = $post_data->consumer_id;
$exchange->product_serial = $post_data->product_serial;
//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($exchange->checkOut() == "True") {
    echo json_encode(
      array(
        "msg" => "Check Out Item  Transaction Was a Succes"
      )
    );
  }  elseif ($exchange->checkOut() == "taken") {
    echo json_encode(
      array(
        "msg" => "Check Out Item  Is Already Taken"
      )
    );
  }else {
    echo json_encode(
      array(
        "msg" => "Check Out Item  Transaction Was not Succes"
      )
    );
  }
} else {
  unAuthMsg();
}
