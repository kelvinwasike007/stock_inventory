<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Supplier.php';
include '../../config/request_method_handler.php';

//method handler
put_method();

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
$suppliers->new_supplier_id = $post_data->new_supplier_id;
$suppliers->new_supplier_name = $post_data->new_supplier_name;
$suppliers->new_contact = $post_data->new_contact;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($suppliers->updateSuppliers() == "True") {
    echo json_encode(
      array(
        "msg" => "Supplier Was Succesfully Updated"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Supplier Was Unsuccesfully Updated"
      )
    );
  }
} else {
  unAuthMsg();
}
