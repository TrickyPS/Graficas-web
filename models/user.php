<?php

class User{

private $db;
private $user;

public function __construct(){
$this->db=Connection::connect();
$this->user=array();
}

public function getUsers(){

$consulta=$this->db->query("select * from user;");
while($filas=$consulta->fetch_assoc()){
	$this->user[]=$filas;
        }
Connection::disconnect($this->db);
return $this->user;
}
}


//funciones de consultas

?>