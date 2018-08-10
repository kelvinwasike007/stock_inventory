<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../../config/Database.php';
include '../../../models/Users.php';
include '../../../config/request_method_handler.php';


//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//create a users object
$users = new Users($db);

//Get User Data

$post_data = json_decode(file_get_contents("php://input"));

//set fields to coresponding data
$users->user_id = $post_data->post_user_id;


//Auth Data

$user_id_data = $post_data->user_id;
$token = $post_data->Token;

if (verifyToken($user_id_data, $db, $token) == "Valid") {
  if ($users->deleteClientAccount() == "True") {
    echo json_encode(
      array(
        "msg" => "User Was Successfuly Deleted"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "User Was Unsuccessfuly Deleted"
      )
    );
  }
}
