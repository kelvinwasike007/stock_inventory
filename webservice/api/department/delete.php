<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: DELETE");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Departments.php';
include '../../config/request_method_handler.php';

//method handler
delete_method();

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

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($departments->deleteDepartments() == "True") {
    echo json_encode(
      array(
        "msg" => "Department Was Succesfully Deleted"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Department Was Unsuccesfully Deleted"
      )
    );
  }
} else {
  unAuthMsg();
}
