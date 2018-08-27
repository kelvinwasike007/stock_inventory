<?php
/**
  * Stock Class
  *@author Kelvin Wasike
  *@package Stock Inventory WS
  */
class Stock
{
  //Db Property
  private $dbconnection;

  //Stock Property
  public $organization_id;
  public $stock_group_id;
  public $stock_name;
  public $stock_description;
  public $return_status, $updateColumn, $updateValue;
  function __construct($db)
  {
    //get Connection object
    $this->dbconnection = $db;
  }

  //create stock
  public function createStock()
  {
    $query = "INSERT INTO `app_clients_stock`(`organization_id`, `stock_group_id`, `stock_name`, `stock_description`, `return_status`) VALUES ('$this->organization_id', '$this->stock_group_id', '$this->stock_name', '$this->stock_description', '$this->return_status')";
    $stmt = $this->dbconnection->prepare($query);
    //make sure the post is done
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //read Stock From The Database
  public function readStock()
  {
    //query
    $query = "SELECT * FROM `app_clients_stock` WHERE organization_id='$this->organization_id'";
    $stmt = $this->dbconnection->prepare($query);
    $stmt->execute();
    //return the executed results
    return $stmt;
  }

  //update stock
  public function updateStock()
  {
    $query = "UPDATE `app_clients_stock` SET `$this->updateColumn`='$this->updateValue' WHERE `organization_id`='$this->organization_id' AND `stock_group_id`='$this->stock_group_id'";
    $stmt = $this->dbconnection->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Delete Stock Info
  public function deleteStock()
  {
    //get one id at a time
    $stock_id = $this->stock_group_id;
    foreach($stock_id as $key)
    {
      $query = "DELETE FROM `app_clients_stock` WHERE organization_id='$this->organization_id' AND stock_group_id='$key'";
      $stmt = $this->dbconnection->prepare($query);
      $stmt->execute();
    }
    
    return True;
  }
}

 ?>
