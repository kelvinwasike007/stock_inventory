<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Products.php';
include '../../config/request_method_handler.php';

//method handler
put_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$products = new Products($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$products->organization_id = $post_data->organization_id;
$products->stock_group_id = $post_data->stock_group_id;
$products->product_serial = $post_data->product_serial;
$products->new_product_serial = $post_data->new_product_serial;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($products->updateProduct() == "True") {
    echo json_encode(
      array(
        "msg" => "Product Was Succesfully Updated"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Product Was Unsuccesfully Updated"
      )
    );
  }
} else {
  unAuthMsg();
}
