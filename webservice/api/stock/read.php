<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Stock.php';
include '../../config/request_method_handler.php';

//method handler
post_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//Initiate The Stock class
$stock = new Stock($db);

//get post Data
$post_data = json_decode(file_get_contents("php://input"));

//get Main Data
$stock->organization_id = $post_data->organization_id;

//Auth Data

$token = $post_data->Token;
$user_id = $post_data->user_id;

//Check Auth stats

if (verifyToken($user_id, $db, $token) == "Valid") {
  //Proceed
  $stock_data = $stock->readStock();
  //fetch data into array
  $results = array();
  while($result_stock = $stock_data->fetch(PDO::FETCH_ASSOC))
  {
    array_push($results, $result_stock);
  }

  //expose into endpoint

  echo json_encode($results);
} else {
  //Unauth Message
  unAuthMsg();
}
