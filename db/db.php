<?php

class Connection{

public static function  connect() {
		$databasehost = "localhost";
		$databasename = "gcwdb";
		$databaseuser = "root";
		$databasepass = "";

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
		if ($mysqli->connect_errno) {
			echo "Problema con la conexion a la base de datos";
		}
		return $mysqli;
	}

public static function disconnect($mysqli) {
		mysqli_close($mysqli);
	}




}

?>