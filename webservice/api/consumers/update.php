<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Consumers.php';
include '../../config/request_method_handler.php';

//method handler
put_method();

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
$consumers->consumer_id = $post_data->consumer_id;
$consumers->new_consumer_name = $post_data->new_consumer_name;
$consumers->new_consumer_id = $post_data->new_consumer_id;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($consumers->updateConsumer() == "True") {
    echo json_encode(
      array(
        "msg" => "Consumer Was Succesfully Updated"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Consumer Was Unsuccesfully Updated"
      )
    );
  }
} else {
  unAuthMsg();
}
