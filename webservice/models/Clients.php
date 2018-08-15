<?php
/**
 * Clients Class
 *@author Kelvin Wasike
 *@package Stock Inventory WS
 */
class Clients
{
  //Db values
  private $dbconnection;
  private $table = 'app_clients';

  //Clients Info

  public $organization;
  public $organization_id;
  public $email;
  public $contact;
  public $active;

  public function __construct($db)
  {
    //get database connection
    $this->dbconnection = $db;
  }

  //Get All Organization Details

  public function read()
  {
    $query = "SELECT * FROM ".$this->table;
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();

    return $stmt;
  }

  //check for Existing Organization
   public function checkOrganization()
   {
     $query = "SELECT * FROM app_clients WHERE organization='$this->organization'";
     $stmt = $this->dbconnection->prepare($query);
     $stmt->execute();

     $results = $stmt->rowCount();
     if($results > 0)
     {
       return "False";
     } else {
       return "True";
     }
   }

  public function register()
  {
    $new_organization_id = md5($this->organization);
    $user_id = md5("admin".$new_organization_id);
    $query = "INSERT INTO app_clients(`organization`, `organization_id`, `contact`, `email`, `active`)VALUES ('$this->organization', '$new_organization_id', '$this->contact', '$this->email', 'No')";
    $stmt = $this->dbconnection->prepare($query);
    if ($stmt->execute()) {
      //set up Admin User if pass
      $query = "INSERT INTO `app_clients_users`(`username`, `password`, `profile_pic`, `user_id`, `organization_id`, `ac_type`) VALUES ('admin','21232f297a57a5a743894a0e4a801fc3', 'default.png', '$user_id', '$new_organization_id', 'admin')";
      $stmt = $this->dbconnection->prepare($query);
      if ($stmt->execute()) {
        return 'Pass';
      } else {
        return 'Fail';
      }
    } else {
      return 'Fail';
    }
  }
}

 ?>
