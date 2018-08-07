<?php
/**
  * Users Class
  *@author Kelvin Wasike
  *@package Stock Inventory WS
  */

class Users
{
  private $dbconnection;
  private $admin_users_table = 'app_admin';
  private $users_client_table = 'app_clients_users';

  //properties
  public $username;
  public $password;
  public $organization_id;
  public $user_id;
  public $profile_pic;

  function __construct($db)
  {
    $this->dbconnection = $db;
  }

  //clients login

  public function client_login()
  {
    $password = $this->password;
        //get the associate $password
    $query = "SELECT * FROM `".$this->users_client_table."` WHERE username = '$this->username' AND organization_id = '$this->organization_id'";
    //prepare the query
    $stmt = $this->dbconnection->prepare($query);
    //execute it
    $stmt->execute();
     //check if there  is no results

     if ($stmt->rowCount() < 0) {
       return "False";
     }
    //fetch the data
    while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $db_password = $data['password'];
    }
    //check if its a match

    if ($password == $db_password) {
      return "True";
    } else {
      return "False";
    }
  }
}

 ?>
