<?php
/**
* Consumers class
* @author Kelvin Wasike
*@package Stock Inventory WS
 */
class Consumers
{
  //db
  private $db;

  //Consumers Properties
  public $consumer_name, $consumer_id, $organization_id, $new_consumer_name, $new_consumer_id;

  //constructor
  function __construct($db)
  {
    $this->db = $db;
  }

  //create Consumers
  public function addConsumer()
  {
    $query = "INSERT INTO `app_clients_consumers`(`consumer_name`, `consumer_id`, `organization_id`) VALUES ('$this->consumer_name', '$this->consumer_id', '$this->organization_id')";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }


  //read Consumer List
  public function readConsumer()
  {
    $query = "SELECT * FROM `app_clients_consumers` WHERE organization_id='$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //update Consumer info
  public function updateConsumer()
  {
    $query = "UPDATE `app_clients_consumers` SET `consumer_name`='$this->new_consumer_name',`consumer_id`= '$this->new_consumer_id' WHERE `organization_id`='$this->organization_id' AND `consumer_id`='$this->consumer_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Delete Consumer
  public function deleteConsumer()
  {
    $query = "DELETE FROM `app_clients_consumers` WHERE consumer_id='$this->consumer_id' AND consumer_id='$this->consumer_id'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }
}

 ?>
