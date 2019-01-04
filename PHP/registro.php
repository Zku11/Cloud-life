<?php
	if(isset($_POST["nuevoUsuario"]) & isset($_POST["nuevaContrasena"])
	 & isset($_POST["correo"])){
		echo "exito";
	}else{
		echo "fracaso";
	}
?>