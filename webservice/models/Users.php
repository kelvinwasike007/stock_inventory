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
  public $password_update;
  public $ac_type;
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

     if ($stmt->rowCount() < 1 ) {
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

  //update password
  public function updateClientAccount()
  {
    //Check if  infomation is valid
    //enc password
    $current_password = $this->password;
    $new_password = md5($this->password_update);
    //get the corresponding password from $username
    $query = "SELECT * FROM `".$this->users_client_table."` WHERE user_id = '$this->user_id' AND organization_id = '$this->organization_id'";
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();

    //Just Incase the user doesnt  exist
    if ($stmt->rowCount() < 0) {
      return "False";
    }
    //get data
    while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $db_password = $data['password'];
    }

    //Confirm old password
    if ($db_password == $current_password) {
      //perform the password change
      $query = "UPDATE `app_clients_users` SET `password` = '$new_password', username = '$this->username' WHERE user_id = '$this->user_id' AND organization_id = '$this->organization_id'";
      $stmt = $this->dbconnection->prepare($query);
      //make sure its changed
      if ($stmt->execute()) {
        return "True";
      } else {
        return "False";
      }
    } else {
      //if  it aint the same
      return "False";
    }
  }

  //Get User Id Of A User
  public function getUserId()
  {
    $query = "SELECT * FROM `app_clients_users` WHERE username='$this->username'";
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();
    while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $user_id_val = $data["user_id"];
    }
    return $user_id_val;
  }

  public function getUserAcType()
  {
    $query = "SELECT * FROM `app_clients_users` WHERE username='$this->username'";
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();
    while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $user_id_val = $data["ac_type"];
    }
    return $user_id_val;
  }

  //Get User Id Of A User
  public function getOrganizationId()
  {
    $query = "SELECT * FROM `app_clients_users` WHERE username='$this->username'";
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();
    while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $user_id_val = $data["organization_id"];
    }
    return $user_id_val;
  }

  //add clients account

  public function addClientAccount()
  {
    $query =  "INSERT INTO `app_clients_users`(`username`, `password`, `user_id`, `organization_id`, `ac_type`) VALUES ('$this->username', '$this->password', '$this->user_id', '$this->organization_id', '$this->ac_type')";
    $stmt = $this->dbconnection->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Delete Client account

  public function deleteClientAccount()
  {
    $query = "DELETE FROM `app_clients_users` WHERE user_id = '$this->user_id'";
    $stmt = $this->dbconnection->prepare($query);
    if($stmt->execute())
    {
      return "True";
    } else {
      return "False";
    }
  }
}

 ?>
