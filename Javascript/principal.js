$(document).ready(inicio);

var elemSelec = [];
var arch;
var actual;
var anterior = [];
var selecTodos = false;

function inicio(){
	$("#subir").click(function(){
		$("#exploraSubir").click();
	});
	$("#exploraSubir").change(subirArchivos);
	obtenerListaArchivos();
	$("#volver").click(function(){
		if(anterior[0]!=undefined){
			var indice = anterior.length -1;
			mostrarArchivos(anterior[indice]);
			anterior.pop();
		}
	});
	$("#selecTodos").click(seleccionarTodos);
}

function subirArchivos(e){
	var files = e.target.files;
	var lector = new FileReader();
	//lector.readAsText(files[0], "iso-8859-1");
	lector.readAsDataURL(files[0]);
	lector.addEventListener("load", mostrarArchivoComoTexto, false);

	function mostrarArchivoComoTexto(e){
		alert(e.target.result);
	}
}

function seleccionarTodos(){
	elemSelec = [];
	if(selecTodos){
		$("#selecTodos").html("Seleccionar todos");
		selecTodos = false;
		$(".selec").each(function(){
			$(this).data("estaSelec", false);
		 	$(this).attr("src","imgs/noselec.png");
		});
	}else{
		$("#selecTodos").html("Deseleccionar todos");
		selecTodos = true;
		$(".selec").each(function(){
			$(this).data("estaSelec", true);
			$(this).attr("src","imgs/selec.png");
			var idPadre = $(this).parent().attr("id");
			elemSelec.push(actual[idPadre].nombre);
		});
	}
	infoSelec(elemSelec);
}

function seleccionar(e){
	e.stopPropagation();
	var selec = $(this).data("estaSelec");
	var idPadre = $(this).parent().attr("id");
	if(selec==true){
		$(this).data("estaSelec", false);
		$(this).attr("src","imgs/noselec.png");
		elemSelec.splice(elemSelec.indexOf(actual[idPadre].nombre), 1);
	}else{
		$(this).data("estaSelec", true);
		$(this).attr("src","imgs/selec.png");
		elemSelec.push(actual[idPadre].nombre);
	}
	infoSelec(elemSelec);
}

function infoSelec(elmsec){
	if(elmsec == undefined){
		$("#infoSeleccionados").html("");
		$(".opcArch").css("opacity", 0.3);
		return;
	}
	if(elmsec.length > 1){
		$("#infoSeleccionados").html(elmsec.length + " elementos seleccionados");
		$(".opcArch").css("opacity", 1.0);
		$("#renombrar").css("opacity", 0.3);
	}else if(elmsec.length == 1){
		$("#infoSeleccionados").html("1 elemento seleccionado");
		$(".opcArch").css("opacity", 1.0);
	}else{
		$("#infoSeleccionados").html("");
		$(".opcArch").css("opacity", 0.3);
	}
}

function itemVisor(esArchivo, nombre, direccion, hijos = false){
	this.esArchivo=esArchivo;
	this.nombre=nombre;
	this.direccion=direccion;
	this.hijos=hijos;
}

function obtenerListaArchivos(){

	var hijos2 = [
		new itemVisor(true, "SUN.mp3", "nada"),
		new itemVisor(true, "waves.mp3", "nada")
	];
	var hijos = [
		new itemVisor(true, "SUN.mp3", "nada"),
		new itemVisor(true, "waves.mp3", "nada"),
		new itemVisor(false, "Sonidos", "nada", hijos2)
	];
	arch = [
		new itemVisor(false, "Musica", "nada", hijos),
		new itemVisor(false, "Videos", "nada"),
		new itemVisor(true, "audio.mp3", "nada"),
		new itemVisor(true, "Archivo ejemplo.mp3", "nada")
	];
	mostrarArchivos(arch);
}

function mostrarArchivos(archivos){
	actual = archivos;
	elemSelec = [];
	infoSelec();
	var icono;
	var strHtml = "";
	for (var i = 0; archivos.length > i; i++) {
		if(archivos[i].esArchivo == true){
			icono = "<img src='imgs/archivo.png'>";
		}else{
			icono = "<img src='imgs/carpeta.png'>";
		}
		var nom = "<p>" + archivos[i].nombre + "</p>";
		strHtml += "<div id='" + i +"'>" +
		 	"<img class='selec' src='imgs/noselec.png'>" + icono + nom +
		 	"<div class='limpiador'></div>" +  
		 "</div>";
	}
	$("#visorArchivos").html(strHtml);
	$(".selec").click(seleccionar);
	$("#visorArchivos div").click(function(){
		var id = $(this).attr("id");
		if(archivos[id].esArchivo == false){
			anterior.push(archivos);
			if(archivos[id].hijos == 0){
				$("#visorArchivos").html("<p>Carpeta vacía</p>");
			}else{
				mostrarArchivos(archivos[id].hijos);
			}
		}
	});
}
//'