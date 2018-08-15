<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: GET");

//Ship the dependancies

include '../../config/Database.php';
include '../../models/Clients.php';
include '../../config/request_method_handler.php';

//method handler
get_method();

//instatiate Db of an object
$database = new Database();

//Get the  Database Connection
$db = $database->connect();

//create a client object
$client = new Clients($db);

//get our clients
$clients = $client->read();

//store our data in an array
$all_clients = array();
while ($data = $clients->fetch(PDO::FETCH_ASSOC)) {
  $organization["name"] = $data["organization"];
  $organization["id"] = $data["organization_id"];
  array_push($all_clients, $organization);
}

//Get the total number  of  results from the Db

$count_client = $clients->rowCount();

//Condition for endpoint expose

if ($count_client > 0) {
  echo json_encode($all_clients);
} else {
  echo json_encode(array("msg" => "No Clients Available"));
}

http_response_code(200);

 ?>
