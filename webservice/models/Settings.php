<?php
/**
* Manifest class
* @author Kelvin Wasike
*@package Stock Inventory WS
 */
class Settings
{
  //db
  private $db;

  //Consumers Properties
  public $organization, $contact, $email, $organization_id, $user_id;

  //constructor
  function __construct($db)
  {
    $this->db = $db;
  }

  //create Consumers
  public function getWorkSpace()
  {
    $query = "SELECT * FROM app_clients_users WHERE organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }


  //read Consumer List
  /*public function readOrders()
  {
    $query = "SELECT * FROM `app_clients_stock_oders` WHERE organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //update Consumer info
  public function updateManifest()
  {
    $query = "UPDATE `app_clients_stock_oders` SET `$this->updateColumn`='$this->updateValue' WHERE `organization_id`='$this->organization_id'  AND order_id='$this->order_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Delete Consumer
  public function deleteManifest()
  {
    $query = "DELETE FROM `app_clients_shipping_manifest` WHERE date_of_shipment='$this->date_of_shipment' AND organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }*/
}