<?php
/**
* Exchange class
* @author Kelvin Wasike
*@package Stock Inventory WS
*/
class Exchange
{
  //db
  public $db;

  //Exchange Properties
  public $organization_id, $consumer_id, $product_serial, $return_status;

  function __construct($db)
  {
    $this->db = $db;
  }

  public function checkOut()
  {
    //set property to taken in db
    $query = "SELECT * FROM `app_clients_stock_remaining` WHERE organization_id='$this->organization_id' AND product_serial='$this->product_serial'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    while ($objects = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $status = $objects['status'];
    }
    if ($status == "taken") {
      return "taken";
    } else {
      $query = "UPDATE `app_clients_stock_remaining` SET `status`='taken' WHERE `organization_id`='$this->organization_id' AND `product_serial`='$this->product_serial'";
      $stmt = $this->db->prepare($query);
      if ($stmt->execute()) {
        //then send it to list
        $query = "INSERT INTO `app_clients_return_list`(`organization_id`, `product_serial`, `consumer_id`, `return_status`) VALUES ('$this->organization_id','$this->product_serial', '$this->consumer_id', 'No')";
        $stmt = $this->db->prepare($query);
        if ($stmt->execute()) {
          return "True";
        } else {
          return "False";
        }
      } else {
        return "False";
      }
    }

  }

  //return List
  public function getPendingReturns()
  {
    $query = "SELECT * FROM `app_clients_return_list` WHERE organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //Delete Return List
  public function checkIn()
  {
    $query = "DELETE FROM `app_clients_return_list` WHERE product_serial='$this->product_serial'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      $query = "UPDATE `app_clients_stock_remaining` SET `status`='not taken' WHERE `organization_id`='$this->organization_id' AND `product_serial`='$this->product_serial'";
      $stmt = $this->db->prepare($query);
      if ($stmt->execute()) {
        return "True";
      } else {
        return "False";
      }
    } else {
      return "False";
    }
  }
}

 ?>
