<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Manifest.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

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
$manifest->Amount = $post_data->Amount;
$manifest->Cost = $post_data->Cost;
$manifest->Units = $post_data->Units;
$manifest->date_of_shipment = date("m/d/y G.i:s<br>", time());

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($manifest->addManifest() == "True") {
    echo json_encode(
      array(
        "msg" => "Manifest Was Succesfully Added"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Manifest Was Unsuccesfully Added"
      )
    );
  }
} else {
  unAuthMsg();
}
