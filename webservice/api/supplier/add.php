<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Supplier.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

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
$suppliers->supplier_name = $post_data->supplier_name;
$suppliers->contact = $post_data->contact;

//auto gen infomation
if ($post_data->supplier_id == "auto_gen") {
  $suppliers->supplier_id = md5($post_data->supplier_name.date_timestamp_get($date));
} else {
  $suppliers->supplier_id = $post_data->supplier_id;
}
//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($suppliers->addSupplier() == "True") {
    echo json_encode(
      array(
        "msg" => "Supplier Was Succesfully Added"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Supplier Was Unsuccesfully Added"
      )
    );
  }
} else {
  unAuthMsg();
}
