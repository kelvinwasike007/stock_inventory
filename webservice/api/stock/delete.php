<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: DELETE");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Stock.php';
include '../../config/request_method_handler.php';

//method handler
delete_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$stock = new Stock($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

$stock->organization_id = $post_data->organization_id;
$stock->stock_group_id = $post_data->stock_ids;
//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

if (verifyToken($user_id, $db, $token) == "Valid") {
  if ($stock->deleteStock()) {
    echo json_encode(
      array(
        "msg" => "Stock Was Successfully Deleted"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Stock Was Unsuccessfully Deleted"
      )
    );
  }
} else {
  //return The Unauth Message
  unAuthMsg();
}
