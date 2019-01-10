<?php
	if(isset($_POST["archivos"])){
		$nombre = $_POST["archivos"];
		echo "Archivo subido: " . $nombre;
	}else{
		echo "Archivo no subido";
	}
?>