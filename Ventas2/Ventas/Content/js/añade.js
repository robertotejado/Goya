var aProductos;
var productos;

$(document).ready(function(){/*inicio script*/


	cargar_productos();/*car de productos en aProductos*/
	var categorias=dameCategorias();/*recupero las categorías*/
	
	for(var z=0;z<categorias.length;z++){/*creación de los li con botones dinámicamente*/

		var valorboton = "bt"+z;/*para añadir un value único a cada botón utilizando el indice z*/
		var $fila = $("<li class='let'>");
		var $boton = $("<button class='cc bot' type='button' value=" + categorias[z].id + ">");
		$boton.corner("4px");
		var $nombreBoton = $("<span class='colorspan'>"+categorias[z].nombre+"</span>");

		$($boton).append($nombreBoton);
		$($fila).append($boton);
		
		$("#list ul").append($fila);
		
	}

	$('.bot').on('click', function(ev){/*inicio funcion click*/

       var evento = ev || window.event;
       var botonPulsado = $(this).val();/*tenemos el valor del botón pulsado controlarempos la carga mediante un swich*/
	  

		/*.slideUp(100); /*vacio y efecto de subida*/
		
   
	
			/*creacion de objetos y array contenedor -- esto lo pasaremos */
	productos= (dameProductos(botonPulsado));	
	/*recorremos el array y creamos los objetos html*/

	printProductos(productos.getProductos(10));


});

function dameCategorias(){
	var categoria0 = new Object();
	categoria0.id = 0;
	categoria0.nombre = "Caja trufas";

	var categoria1 = new Object();
	categoria1.id = 1;
	categoria1.nombre = "Caja Especialidades";

	var categoria2 = new Object();
	categoria2.id = 2;
	categoria2.nombre = "Caja Especialidades";

	var categoria3 = new Object();
	categoria3.id = 3;
	categoria3.nombre = "Latas Trufa";

	var categoria4 = new Object();
	categoria4.id = 4;
	categoria4.nombre = "Surtido Granel";

	var categoria5 = new Object();
	categoria5.id = 5;
	categoria5.nombre = "Postres";

	var categoria6 = new Object();
	categoria6.id = 6;
	categoria6.nombre = "Mousse";

	var categoria7 = new Object();
	categoria7.id = 7;
	categoria7.nombre = "Pastas";

	var categoria8 = new Object();
	categoria8.id = 8;
	categoria8.nombre = "Pasteles - Franchipanes";

	var categoria9 = new Object();
	categoria9.id = 9;
	categoria9.nombre = "Bollería";

	var categoria10 = new Object();
	categoria10.id = 10;
	categoria10.nombre = "Pastelitos - Chuchitos";

	var categoria11 = new Object();
	categoria11.id = 11;
	categoria11.nombre = "Galletas";

	var categoria12 = new Object();
	categoria12.id = 12;
	categoria12.nombre = "Mermeladas";

	var categoria13 = new Object();
	categoria13.id = 13;
	categoria13.nombre = "Turrón";

	var categoria14 = new Object();
	categoria14.id = 14;
	categoria14.nombre = "Varios";					
				
	var categorias = new Array();
	categorias[0]=categoria0;
	categorias[1]=categoria1;
	categorias[2]=categoria2;
	categorias[3]=categoria3;
	categorias[4]=categoria4;			
	categorias[5]=categoria5;
	categorias[6]=categoria6;
	categorias[7]=categoria7;
	categorias[8]=categoria8;
	categorias[9]=categoria9;
	categorias[10]=categoria10;
	categorias[11]=categoria11;
	categorias[12]=categoria12;
	categorias[13]=categoria13;
	categorias[14]=categoria14;
	
    return categorias;


}
function dameProductos(idCategoria){

	/*//alert(idpasado);
	    var obj = new Object();
		obj.nombre = "Berlinas rellenas";
		obj.ruta = "img/Berlinas.png";
		obj.precio = 10.00;
		obj.idCategoria = 0;

		var obj2 = new Object();
		obj2.nombre = "Berlinas2";
		obj2.ruta = "img/berlinaChoco_opt.png";
		obj2.precio = 20.50;
		obj2.idCategoria = 1;

		var obj3 = new Object();
		obj3.nombre = "Trufa";
		obj3.ruta = "img/tabletlimon.png";
		obj3.precio = 10.00;
		obj3.idCategoria = 0;

		var obj4 = new Object();
		obj4.nombre = "Palmera";
		obj4.ruta = "img/palmera.png";
		obj4.precio = 20.50;
		obj4.idCategoria = 1;

		var objs = new Array();
		objs[0]=obj;
		objs[1]=obj2;
		objs[2]=obj3;
		objs[3]=obj4;

		var objsSeleccion = new Array();
		var contador = 0;
		for(var v=0;v<objs.length;v++){
			if(objs[v].idCategoria==idpasado){
				objsSeleccion[contador]=objs[v];
				contador++;	
			}
				
		}

	return objsSeleccion;*/	

   return aProductos.getxCategoria(idCategoria);


}


});
