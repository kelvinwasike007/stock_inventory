<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Checkpoint.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$checkpoint = new Checkpoint($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$checkpoint->organization_id = $post_data->organization_id;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  $available_stock= $checkpoint->getAllStock();
  $available_products = $checkpoint->getAllProducts();
  $pending_requests = $checkpoint->getStockRequest();
  $pending_returns = $checkpoint->getPendingReturns();

  echo json_encode(
      array(
          "Stock" => $available_stock,
          "Product" => $available_products,
          "returns" => $pending_returns,
          "request" => $pending_requests
      )
      );

} else {
  unAuthMsg();
}
