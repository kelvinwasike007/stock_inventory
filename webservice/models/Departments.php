<?php
/**
* Departments class
* @author Kelvin Wasike
*@package Stock Inventory WS
 */
class Departments
{
  //db
  private $db;

  //Consumers Properties
  public $department_id, $department_name, $organization_id, $new_department_name, $new_department_id;

  //constructor
  function __construct($db)
  {
    $this->db = $db;
  }

  //create Consumers
  public function addDepartments()
  {
    $query = "INSERT INTO `app_clients_departments`(`department_id`, `department_name`, `organization_id`) VALUES ('$this->department_id', '$this->department_name', '$this->organization_id')";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }


  //read Consumer List
  public function readDepartments()
  {
    $query = "SELECT * FROM `app_clients_departments` WHERE organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //update Consumer info
  public function updateDepartments()
  {
    $query = "UPDATE `app_clients_departments` SET `department_name`='$this->new_department_name',`department_id`= '$this->new_department_id' WHERE `organization_id`='$this->organization_id' AND `department_id`='$this->department_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Delete Consumer
  public function deleteDepartments()
  {
    $query = "DELETE FROM `app_clients_departments` WHERE department_id='$this->department_id' AND organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }
}

 ?>
