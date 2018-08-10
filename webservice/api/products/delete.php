<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: DELETE");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Products.php';
include '../../config/request_method_handler.php';

//method handler
delete_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$products = new Products($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$products->product_serial = $post_data->product_serial;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($products->deleteProduct() == "True") {
    echo json_encode(
      array(
        "msg" => "Product Was Succesfully deleted"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Product Was Unsuccesfully deleted"
      )
    );
  }
} else {
  unAuthMsg();
}
