<?php
/**
* Manifest class
* @author Kelvin Wasike
*@package Stock Inventory WS
 */
class Manifest
{
  //db
  private $db;

  //Consumers Properties
  public $organization_id ,	$stock_group_id, 	$Amount, 	$Units, 	$Cost, 	$new_stock_group_id, 	$new_Amount, 	$new_Units, 	$new_Cost, $date_of_shipment;

  //constructor
  function __construct($db)
  {
    $this->db = $db;
  }

  //create Consumers
  public function addManifest()
  {
    $query = "INSERT INTO `app_clients_shipping_manifest`(`organization_id`, `stock_group_id`, `Amount`, `Units`, `Cost`, `date_of_shipment`) VALUES ('$this->organization_id', '$this->stock_group_id', '$this->Amount', '$this->Units', '$this->Cost', '$this->date_of_shipment')";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }


  //read Consumer List
  public function readOrders()
  {
    $query = "SELECT * FROM `app_clients_stock_oders` WHERE organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //update Consumer info
  public function updateManifest()
  {
    $query = "UPDATE `app_clients_shipping_manifest` SET `stock_group_id`='$this->new_stock_group_id',`Amount`= '$this->new_Amount',`Units`= '$this->new_Units',`Cost`= '$this->new_Cost' WHERE `organization_id`='$this->organization_id'  AND date_of_shipment='$this->date_of_shipment'";
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
  }
}

 ?>
