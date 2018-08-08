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
//Generate and save Token

function generateToken($username, $db, $user_id)
{
  //generate Token
  $date = date_create();

  $new_token = md5($username.date_timestamp_get($date));
  //check if token exist
  $query = "SELECT * FROM `app_token-store` WHERE user_id = '$user_id'";
  $stmt = $db->prepare($query);
  $stmt->execute();
  if ($stmt->rowCount() > 0) {
    //Delete  token
    $query = "DELETE FROM `app_token-store` WHERE user_id = '$user_id'";
    $stmt = $db->prepare($query);
    $stmt->execute();
    //save new token
    $query = "INSERT INTO `app_token-store`(`user_id`, `token`) VALUES ('$user_id', '$new_token')";
    $stmt = $db->prepare($query);
    $stmt->execute();
    //return the  new  token
    return $new_token;
  } else {
    //if no token in store
    //save Token
    $query = "INSERT INTO `app_token-store`(`user_id`, `token`) VALUES ('$user_id', '$new_token')";
    $stmt = $db->prepare($query);
    $stmt->execute();
    //return the  new  token
    return $new_token;
  }

}
//Verify Token function

function verifyToken($user_id, $db, $token)
{
  //get Token
  $query = "SELECT * FROM `app_token-store` WHERE user_id='$user_id'";
  $stmt = $db->prepare($query);
  $stmt->execute();
  //if no results
  if ($stmt->rowCount() < 1) {
    return "Invalid";
  } else {
    while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $db_token = $data["token"];
    }
    if ($db_token == $token) {
      return "Valid";
    } else {
      return "Invalid";
    }
  }
}

//Unauthorized Message
function unAuthMsg()
{
  echo json_encode(
    array(
      "msg" => "Error 401 | Unauthorized Access"
    )
  );

  //status code
  http_response_code(401);
}

$date = date_create();
 //App secret
 $app_key = "WesEmpire"
 ?>
