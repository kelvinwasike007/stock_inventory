<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: PUT");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Manifest.php';
include '../../config/request_method_handler.php';

//method handler
put_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$manifest = new Manifest($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get VALUES

$manifest->organization_id = $post_data->organization_id;
$manifest->stock_group_id = $post_data->stock_group_id;
$manifest->new_stock_group_id = $post_data->new_stock_group_id;
$manifest->new_Amount = $post_data->new_Amount;
$manifest->new_Cost = $post_data->new_Cost;
$manifest->new_Units = $post_data->new_Units;
$manifest->date_of_shipment = $post_data->date_of_shipment;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($manifest->updateManifest() == "True") {
    echo json_encode(
      array(
        "msg" => "Manifest Was Succesfully Updated"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Manifest Was Unsuccesfully Updated"
      )
    );
  }
} else {
  unAuthMsg();
}
