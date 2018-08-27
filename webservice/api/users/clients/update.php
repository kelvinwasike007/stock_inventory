<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../../config/Database.php';
include '../../../models/Users.php';
include '../../../config/request_method_handler.php';


//method handler
put_method();

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
$users->password = md5($post_data->username);
$users->organization_id = $post_data->organization_id;
$users->user_id = $post_data->_user_id;
$postToken = $post_data->Token;
$user_id = $post_data->user_id;

//perform the password change

if (verifyToken($user_id, $db, $postToken) == "Valid") {
  if ($users->adminAccountUpdate()) {
    echo json_encode(
      array(
        "msg" => "Account Was Successfully Updated"
      )
    );
  } else {
    //Something Went wrong
    echo json_encode(
      array(
        "msg" => "An Error Occured During Account Update.. Check if Your Password Was Correct"
      )
    );
  }
} else {
  //wrong Token Message
  echo json_encode(
    array(
      "msg" => "Error 401 | Unauthorized Access "
    )
  );
        http_response_code(401);
}
