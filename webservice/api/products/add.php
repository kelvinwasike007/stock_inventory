<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Products.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

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

//auto gen infomation
if ($post_data->product_serial == "auto_gen") {
  $products->product_serial = md5($post_data->stock_group_id.date_timestamp_get($date));
} else {
  $products->product_serial = $post_data->product_serial;
}
//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($products->addProduct() == "True") {
    echo json_encode(
      array(
        "msg" => "Product Was Succesfully Added"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Product Was Unsuccesfully Added"
      )
    );
  }
} else {
  unAuthMsg();
}
