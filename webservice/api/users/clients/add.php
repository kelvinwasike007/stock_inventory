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
$users->username = $post_data->username;
$users->password = md5($post_data->password);
$users->organization_id = $post_data->organization_id;
$users->ac_type = $post_data->ac_type;
//generate User Id
$users->user_id = md5($post_data->username.$post_data->organization_id);

//Auth Data

$user_id_data = $post_data->user_id;
$token = $post_data->Token;

//Verify Token
if (verifyToken($user_id_data, $db, $token) == "Valid") {
  //Add Users
  if ($users->addClientAccount() == "True") {
    echo json_encode(
      array(
        "msg" => "user Was Successfuly Added"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "An Error Occured During this Operation"
      )
    );
  }
} else {
  #error msg
  unAuthMsg();
}
