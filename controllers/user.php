<?php
$action = $_POST['action'];


//header('Access-Control-Allow-Origin: *');
require_once("../db/db.php");
require_once("../models/user.php");

if($action == "addUser") {
    addUser();
}
else if($action == "getUserByEmail") {
    getUserByEmail();
}


function addUser() {
    $userName = $_POST["userName"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $mysqli = Connection::connect();

    $result = $mysqli->query("INSERT INTO users(userName, email, userPassword) values('".$userName."','".$email."','".$password."')");

    if (!$result) {
        echo "Problema al hacer un query: " . $mysqli->error;								
    } else {
        getUserByEmail($email);
    }
}

function getUserByEmail() {
    $email = $_POST["email"];

    $mysqli = Connection::connect();

    $result = $mysqli->query("SELECT * FROM users WHERE email = '".$email."'");

    if($result) {
        // Recorremos los resultados devueltos
        $users = array();
        while( $user = $result->fetch_assoc()) {
            echo json_encode($user);
        }
    }else {
        echo json_encode("No existen usuarios en la BBDD.");
        return null;
    }
}

?>