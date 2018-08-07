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

  public function register()
  {
    $query = "INSERT INTO " . $this->table . "(`organization`, `organization_id`, `contact`, `email`, `active`)VALUES ('$this->organization', '$this->organization_id', '$this->contact', '$this->email', 'No')";
    $stmt = $this->dbconnection->prepare($query);
    if ($stmt->execute()) {
      return 'Pass';
    } else {
      return 'Fail';
    }
  }
}

 ?>
