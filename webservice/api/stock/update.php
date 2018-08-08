<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Stock.php';
include '../../config/request_method_handler.php';

//method handler
put_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$stock = new Stock($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

$stock->organization_id = $post_data->organization_id;
$stock->stock_name = $post_data->stock_name;
$stock->stock_description = $post_data->stock_description;
$stock->return_status = $post_data->return_status;
$stock->stock_group_id = $post_data->stock_group_id;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Auth Check up
if (verifyToken($user_id, $db, $token) == "Valid") {
  # Proceed
  if ($stock->updateStock() == "True") {
    echo json_encode(
      array(
        "msg" => "Stock Was Updated Successfully"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Stock Was Not Successfully Updated"
      )
    );
  }
} else {
  //Print Status
  unAuthMsg();
}
