<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Consumers.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$consumers = new Consumers($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$consumers->organization_id = $post_data->organization_id;
$consumers->consumer_name = $post_data->consumer_name;

//auto gen infomation
if ($post_data->consumer_id == "auto_gen") {
  $consumers->consumer_id = md5($post_data->consumer_name.date_timestamp_get($date));
} else {
  $consumers->consumer_id = $post_data->consumer_id;
}
//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($consumers->addConsumer() == "True") {
    echo json_encode(
      array(
        "msg" => "Consumer Was Succesfully Added"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Consumer Was Unsuccesfully Added"
      )
    );
  }
} else {
  unAuthMsg();
}
