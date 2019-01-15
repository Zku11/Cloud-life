$(document).ready(inicio);

var rojoInvalido = "#faa";
var verdeValido = "#afa";
var msjErrReg; 

function inicio(){
	$("#ingresar").click(ingresar);
	$("#usuario, #contrasena").focus(function(){
		$(this).css("background-color", "#eee");
	});
	$("#registrar").click(registrar);
	$("#nuevoUsuario").on("focus keyup", nuevoUsuario);
	$("#nuevaContrasena").on("focus keyup", nuevaContrasena);
	$("#repetirContrasena").on("focus keyup", repetirContrasena);
	$("#correo").on("focus keyup", correoElectronico);
	msjErrReg = $("#msjErrReg");
	$("#fRegistro div input").blur(function(){
		msjErrReg.html("")
	});
}

function ingresar(e){
	e.preventDefault();
	var usuario = $("#usuario");
	var contrasena = $("#contrasena");
	if(usuario.val().length == 0 || contrasena.val().length == 0){
		if(usuario.val().length == 0){
			usuario.css("background-color", rojoInvalido);
		}
		if(contrasena.val().length == 0){
			contrasena.css("background-color", rojoInvalido);
		}
	}else{
		$.post("PHP/iniciosesion.php",
		 {usuario: usuario.val(), contrasena: contrasena.val()},
		 function(data, status){
		 	if(status == "success" && data == "exito"){
		 		window.location.href="Principal.html";
		 	}
		});
	}
}

function registrar(e){
	e.preventDefault();
	if(nuevoUsuario() & nuevaContrasena() &
	repetirContrasena() & correoElectronico()){
		$.post("PHP/registro.php",
			{nuevoUsuario: $("#nuevoUsuario").val(),
			nuevaContrasena: $("#nuevaContrasena").val(),
	    	correo: $("#correo").val()},
	    	function(data, status){
	    		if(status=="success"){
	    			alert(data + " " + status);
	    		}
	    	}
		);
	}else{
		msjErrReg.html("Revise los campos en rojo");
	}
}

function nuevoUsuario(){
	var campo = $("#nuevoUsuario");
	var largo = campo.val().length;
	if(largo < 5){
		campo.css("background-color", rojoInvalido);
		msjErrReg.html("El nombre de usuario debe ser de más de 5 caracteres");
		return false;
	}else if(largo > 15){
		campo.css("background-color", rojoInvalido);
		msjErrReg.html("El nombre de usuario debe ser de hasta 15 caracteres");
		return false;
	}else{
		campo.css("background-color", verdeValido);
		msjErrReg.html("");
		return true;
	}
}

function nuevaContrasena(){
	var campoRep = $("#repetirContrasena");
	var campo = $("#nuevaContrasena");
	var largo = campo.val().length;
	if(largo < 8){
		campo.css("background-color", rojoInvalido);
		msjErrReg.html("La contraseña debe ser de 8 caracteres o más");
		return false;
	}else if(largo > 30){
		campo.css("background-color", rojoInvalido);
		msjErrReg.html("La contraseña debe ser de hasta 30 caracteres");
		return false;
	}else if(campoRep.val().length > 7 && campoRep.val().length < 31){
		repetirContrasena();
		campo.css("background-color", verdeValido);
		return true;
	}else{
		campo.css("background-color", verdeValido);
		msjErrReg.html("");
		return true;
	}
}

function repetirContrasena(){
	var campo = $("#repetirContrasena");
	var largo = campo.val().length;
	if(largo < 8){
		campo.css("background-color", rojoInvalido);
		msjErrReg.html("La contraseña debe ser de 8 caracteres o más");
		return false;
	}else if(largo > 30){
		campo.css("background-color", rojoInvalido);
		msjErrReg.html("La contraseña debe ser de hasta 30 caracteres");
		return false;
	}else if(campo.val()!=$("#nuevaContrasena").val()){
		campo.css("background-color", rojoInvalido);
		msjErrReg.html("La contraseña no coincide con la anterior");
		return false;
	}else{
		campo.css("background-color", verdeValido);
		msjErrReg.html("");
		return true;
	}
}

function correoElectronico(){
	var campo = $("#correo");
	var valor = campo.val();
	var largo = valor.length;
	var hayArroba = false;
	campo.css("background-color", rojoInvalido);
	msjErrReg.html("Introduzca una dirección de correo electrónico válida");
	for (var i = 0; largo > i; i++){
		if(valor.charAt(i) == "@" && i > 0 && !hayArroba){
			hayArroba = true;
			i++;
			continue;
		}
		if(valor.charAt(i) == "." && hayArroba && largo > i + 1){
			campo.css("background-color", verdeValido);
			msjErrReg.html("");
			return true;
		}
	}
	return false;
}