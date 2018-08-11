<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: DELETE");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Supplier.php';
include '../../config/request_method_handler.php';

//method handler
delete_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$suppliers = new Supplier($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$suppliers->organization_id = $post_data->organization_id;
$suppliers->supplier_id = $post_data->supplier_id;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($suppliers->deleteSuppliers() == "True") {
    echo json_encode(
      array(
        "msg" => "Supplier Was Succesfully Deleted"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Supplier Was Unsuccesfully Deleted"
      )
    );
  }
} else {
  unAuthMsg();
}
