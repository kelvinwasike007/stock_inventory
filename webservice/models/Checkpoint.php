<?php
/**
 * Clients Class
 *@author Kelvin Wasike
 *@package Stock Inventory WS
 */
class Checkpoint
{
  //Db values
  private $dbconnection;
  private $table = 'app_clients';

  //Clients Info

  public $organization_id;

  public function __construct($db)
  {
    //get database connection
    $this->dbconnection = $db;
  }

  //Get All Organization Details

  //get all available stock
  public function getAllStock()
  {
      $query = "SELECT * FROM app_clients_stock WHERE organization_id='$this->organization_id'";
      $stmt = $this->dbconnection->prepare($query);
      $stmt->execute();
      return $stmt->rowCount();
  }

  public function getAllProducts()
  {
      $query = "SELECT * FROM app_clients_stock_remaining WHERE organization_id = '$this->organization_id'";
      $stmt = $this->dbconnection->prepare($query);
      $stmt->execute();
      return $stmt->rowCount();
  }

  public function getStockRequest()
  {
    $query = "SELECT * FROM app_clients_stock_oders WHERE organization_id = '$this->organization_id' AND approval_status='pending'";
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();
    return $stmt->rowCount();
  }

  public function getPendingReturns()
  {
    $query = "SELECT * FROM app_clients_return_list WHERE organization_id = '$this->organization_id'";
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();
    return $stmt->rowCount();
  }

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
