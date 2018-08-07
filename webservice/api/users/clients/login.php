<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../../config/Database.php';
include '../../../models/Users.php';
include '../../../config/request_method_handler.php';
include '../../../config/Jwt.php';

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
$users->username = $post_data->username;
$users->password = md5($post_data->password);
$users->organization_id = $post_data->organization_id;

//try login

if ($users->client_login() == "True") {
  //generate  token
  $enc_data = array();
  $enc_data['user'] = "sdfsdsss";
  $token = JWT::encode($token, $app_key);
  //send token and login success
  echo json_encode(
    array(
      "msg" => "Authenticated",
      "Token" => $token
    )
  );
} else {
  //if not  True
  echo json_encode(
    array(
      "msg" => "Unauthenticated",
      "info" => "Invalid User Credentials"
    )
  );
}