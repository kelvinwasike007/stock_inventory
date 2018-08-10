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

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  $results = $products->getProductsByGroup();

  //check if rows
  if ($results->rowCount() < 1) {
    echo json_encode(
      array(
        "msg" => "No Records Available...Please Add New Stock and Products From Dashboard"
      )
    );
  }else {
    //return data
    $records = array();
    while ($data = $results->fetch(PDO::FETCH_ASSOC)) {
      array_push($records, $data);
    }

    echo json_encode($records);
  }
} else {
  unAuthMsg();
}
