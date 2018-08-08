<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Stock.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$stock = new Stock($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//assign fields to values
$stock->organization_id = $post_data->organization_id;
$stock->stock_name = $post_data->stock_name;
$stock->stock_description = $post_data->stock_description;
$stock->return_status = $post_data->return_status;
//auto gen infomation
if ($post_data->stock_group_id == "auto_gen") {
  $stock->stock_group_id = md5($post_data->stock_group_id.date_timestamp_get($date));
} else {
  $stock->stock_group_id = $post_data->stock_group_id;
}
//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Auth check
if (verifyToken($user_id, $db, $token) == "Valid") {
  //Proced To add The stock
  if ($stock->createStock() == "True") {
    echo json_encode(
      array(
        "msg" => "Stock Detail Was Successfully Added"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Encountered a problem durning Stock add process.. Please Try Again"
      )
    );
  }
} else {
  unAuthMsg();
}
