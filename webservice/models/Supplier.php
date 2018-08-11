<?php
/**
* Supplier class
* @author Kelvin Wasike
*@package Stock Inventory WS
 */
class Supplier
{
  //db
  private $db;

  //Consumers Properties
  public 	$supplier_id, 	$organization_id, 	$contact, 	$supplier_name, 	$new_supplier_id, 	$new_contact, 	$new_supplier_name ;

  //constructor
  function __construct($db)
  {
    $this->db = $db;
  }

  //create Consumers
  public function addSupplier()
  {
    $query = "INSERT INTO `app_clients_supplier_contact`(`supplier_id`, `organization_id`, `contact`, `supplier_name`) VALUES ('$this->supplier_id', '$this->organization_id', '$this->contact', '$this->supplier_name')";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }


  //read Consumer List
  public function readSuppliers()
  {
    $query = "SELECT * FROM `app_clients_supplier_contact` WHERE organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //update Consumer info
  public function updateSuppliers()
  {
    $query = "UPDATE `app_clients_supplier_contact`  SET `supplier_id`='$this->new_supplier_id',`contact`= '$this->new_contact', supplier_name='$this->new_supplier_name' WHERE `organization_id`='$this->organization_id' AND `supplier_id`='$this->supplier_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Delete Consumer
  public function deleteSuppliers()
  {
    $query = "DELETE FROM `app_clients_supplier_contact` WHERE supplier_id='$this->supplier_id' AND organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }
}

 ?>
