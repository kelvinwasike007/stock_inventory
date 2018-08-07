<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Clients.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//create a client object
$client = new Clients($db);

//get user Data

$post_data = json_decode(file_get_contents("php://input"));

$client->organization = $post_data->organization;
$client->organization_id = md5($post_data->organization);
$client->email = $post_data->email;
$client->contact = $post_data->contact;

//check if the request was processed
if ($client->register() == 'Pass') {
  echo json_encode(
    array(
      'msg' => 'Your Organization Was Successfuly Registered...Please Login And Wait For Admins To Activate Your Package'
    )
  );
} else {
  echo json_encode(
    array(
      'msg' => 'An Error Occured During Organization Registration Process'
    )
  );
}

//return status Code
http_response_code(200);
