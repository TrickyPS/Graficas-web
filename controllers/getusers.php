<?php
//header('Access-Control-Allow-Origin: *');
require_once("../db/db.php");
require_once("../models/user.php");

$user = new User();
$resp = $user->getUsers();

echo json_encode($resp);

//require_once("../views/index.html")



?>