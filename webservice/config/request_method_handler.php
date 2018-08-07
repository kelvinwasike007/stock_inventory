<?php
//Handler for invalid methods requests

/**
*Method Handler
*@author Kelvin Wasike
*@Package stock Inventory Ws
*/
function post_method()
 {
   if ($_SERVER['REQUEST_METHOD'] != 'POST') {
     echo json_encode(
       array('msg' => 'Error 405 | Method not allowed', )
     );
     http_response_code(405);
     exit();
   }
 }

function get_method()
 {
   if ($_SERVER['REQUEST_METHOD'] != 'GET') {
     echo json_encode(
       array('msg' => 'Error 405 | Method not allowed', )
     );
     http_response_code(405);
     exit();
   }
 }

function put_method()
 {
   if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
     echo json_encode(
       array('msg' => 'Error 405 | Method not allowed', )
     );
     http_response_code(405);
     exit();
   }
 }

function delete_method()
 {
   if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
     echo json_encode(
       array('msg' => 'Error 405 | Method not allowed', )
     );
     http_response_code(405);
     exit();
   }
 }

//Verify Token function

function verifyToken($postToken)
{
  $token = JWT::decode($postToken);
  if ($token['user'] == "") {
    return 'Invalid';
  } else {
    return "Valid";
  }
}
 //App secret
 $app_key = "WesEmpire"
 ?>
