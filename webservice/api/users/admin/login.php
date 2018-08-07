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

$
