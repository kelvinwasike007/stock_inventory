<?php
/**
 * Products class
 * @author Kelvin Wasike
 *@package Stock Inventory WS
 */
class Products
{
  //db values
  private $db;

  //Required fields
  public $organization_id;
  public $stock_group_id;
  public $stock_name;
  public $product_serial;
  public $new_product_serial;

  //constuctor
  function __construct($db)
  {
    $this->db = $db;
  }

  //get List of products
  public function getAllProducts()
  {
    $query = "SELECT `app_clients_stock`.`stock_name`, `app_clients_stock_remaining`.`organization_id`, `app_clients_stock_remaining`.`stock_group_id`, `app_clients_stock_remaining`.`product_serial`
FROM `app_clients_stock`
    LEFT JOIN `app_clients_stock_remaining` ON `app_clients_stock_remaining`.`stock_group_id` = `app_clients_stock`.`stock_group_id`
WHERE app_clients_stock_remaining.organization_id = '$this->organization_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //get List of Products For Certain Stock Group
  public function getProductsByGroup()
  {
    $query = "SELECT `app_clients_stock`.`stock_name`, `app_clients_stock_remaining`.`organization_id`, `app_clients_stock_remaining`.`stock_group_id`, `app_clients_stock_remaining`.`product_serial`
FROM `app_clients_stock`
    LEFT JOIN `app_clients_stock_remaining` ON `app_clients_stock_remaining`.`stock_group_id` = `app_clients_stock`.`stock_group_id` WHERE app_clients_stock_remaining.organization_id = '$this->organization_id' AND app_clients_stock_remaining.stock_group_id = '$this->stock_group_id'";
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  //add Products
  public function addProduct()
  {
    $query = "INSERT INTO `app_clients_stock_remaining`(`organization_id`, `stock_group_id`, `product_serial`) VALUES ('$this->organization_id', '$this->stock_group_id', '$this->product_serial')";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Update Product Info
  public function updateProduct()
  {
    $query = "UPDATE `app_clients_stock_remaining` SET stock_group_id='$this->stock_group_id',`product_serial`= '$this->new_product_serial' WHERE product_serial='$this->product_serial'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }

  //Delete products
  public function deleteProduct()
  {
    $query = "DELETE FROM `app_clients_stock_remaining` WHERE product_serial='$this->product_serial'";
    $stmt = $this->db->prepare($query);
    if ($stmt->execute()) {
      return "True";
    } else {
      return "False";
    }
  }
}

 ?>
