<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: DELETE");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Manifest.php';
include '../../config/request_method_handler.php';

//method handler
delete_method();

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
$manifest->date_of_shipment = $post_data->date_of_shipment;

//Auth Data
$token = $post_data->Token;
$user_id = $post_data->user_id;

//Verification

if (verifyToken($user_id, $db, $token) == "Valid") {
  //run Code
  if ($manifest->deleteManifest() == "True") {
    echo json_encode(
      array(
        "msg" => "Manifest Was Succesfully Deleted"
      )
    );
  } else {
    echo json_encode(
      array(
        "msg" => "Manifest Was Unsuccesfully Deleted"
      )
    );
  }
} else {
  unAuthMsg();
}
