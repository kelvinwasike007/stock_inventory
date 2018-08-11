<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Departments.php';
include '../../config/request_method_handler.php';

//method handler
put_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$departments = new Departments($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$departments->organization_id = $post_data->organization_id;
$departments->department_id = $post_data->department_id;
$departments->new_department_id = $post_data->new_department_id;
$departments->new_department_name = $post_data->new_department_name;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($departments->updateDepartments() == "True") {
    echo json_encode(
      array(
        "msg" => "Departments Was Succesfully Updated"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Departments Was Unsuccesfully Updated"
      )
    );
  }
} else {
  unAuthMsg();
}
