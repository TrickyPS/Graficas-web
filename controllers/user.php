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
else if($action == "updateTotalPoints") {
    updateTotalPoints();
}
else if($action == "updateUserLocalStorage") {
    getUserById();
}
else if($action == "getScores") {
    getScores();
}


function addUser() {
    
    $userName = $_POST["userName"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $mysqli = Connection::connect();

    $result = $mysqli->query("INSERT INTO users(userName, email, userPassword) values('".$userName."','".$email."','".$password."')");

    if (!$result) {
        echo json_encode( "Problema al hacer un query: " . $mysqli->error);								
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

function getUserById() {
    $id = $_POST["id"];

    $mysqli = Connection::connect();

    $result = $mysqli->query("SELECT * FROM users WHERE id = ".$id.";");

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

function updateTotalPoints() {
    $id = $_POST["id"];
    $points = $_POST["points"];

    $mysqli = Connection::connect();

    $result = $mysqli->query("UPDATE `users` SET `totalPoints`= ".$points." WHERE id = ".$id.";");

    if (!$result) {
        echo json_encode( "Problema al hacer un query: " . $mysqli->error);								
    } else {
        echo json_encode("Puntos actualizados");
    }
}

function getScores() {
    $mysqli = Connection::connect();

    $result = $mysqli->query("CALL `proc_get_scores`();");

    if($result) {
        // Recorremos los resultados devueltos
        $users = array();
        while( $user = $result->fetch_assoc()) {
            $users[] = $user;
        }
        echo json_encode($users);
    }else {
        echo json_encode("No existen usuarios en la BBDD.");
        return null;
    }
}


?>