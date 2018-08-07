<?php
/**
 * Database Class
 *@author Kelvin Wasike
 *@package Stock Inventory WS
 */
class Database
{
  //Db credentials
  private $dbhost = 'localhost';
  private $dbusername = 'root';
  private $dbpassword = '';
  private $dbname = 'stock_inventory';

  //our connection varible
  private $dbconn;

  //Connect To db using PDO
  public function connect()
  {
    $this->dbconn = null;
    try {
      $this->dbconn = new PDO("mysql:host=" . $this->dbhost . ";dbname=" . $this->dbname, $this->dbusername , $this->dbpassword);
      $this->dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $exception) {
      //Dump errors in json Format
      $message = $exception->getMessage();
      echo json_encode(
        array(
          'status' => 'System Error',
          'msg' => $message
         )
      );
    }
    return $this->dbconn;

  }
}

 ?>
