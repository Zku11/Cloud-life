<?php
	if(isset($_POST["usuario"]) & isset($_POST["contrasena"])){
		$usuario = $_POST["usuario"];
		$contrasena = $_POST["contrasena"];
		if($usuario == "lucas" && $contrasena == "1234"){
			echo "exito";
		}else{
			echo "fracaso";
		}
	}
?>