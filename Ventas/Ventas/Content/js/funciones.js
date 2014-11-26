Array.prototype.pagina = 1;

Array.prototype.getProducto = function (index) {
    return this[index]
};

Array.prototype.getProductos = function (num) {

    var aAux = [];

    if (typeof num == "undefined") {
        num = 25;
    }

    if (num < 0) {

        this.pagina -= 1;

        num *= -1;

        var pag = (this.pagina - 2) * num;

        num *= (this.pagina-1);

        if (num < 0) {
            return null;
        }

        for (var i = pag, j = 0; i < num; i++) {
            aAux[j++] = this[i];
        }


    } else {
        var pag = (this.pagina - 1) * num;

        num *= this.pagina;

        if (num > this.length) {
            num = this.length;
        }

        if (pag > num) {
            return null;
        }

        for (var i = pag, j = 0; i < num; i++) {
            aAux[j++] = this[i];
        }

        this.pagina += 1;
    }

    return aAux;

};

Array.prototype.masVendidos = function (num) {

    var aAux = $.parseJSON(JSON.stringify(this));

    aAux.ordenar("Ventas", true);

    return aAux.getProductos(num);
};

Array.prototype.getxCategoria = function (num) {

    var aAux = [];

    for (var i = 0, j = 0; i < this.length; i++) {
        if (this[i].CodCat == num) {
            aAux[j++] = this[i];
        }
    }

    return aAux;
};

Array.prototype.ordenar = function (modo, reverse) {

    var aux = [];
    var aAux = [];
    var aP = this;

    if ($.isNumeric(eval("aP[0]." + modo))) {
        for (var i = 0; i < aP.length; i++) {
            aux[i] = ponCeros(eval("aP[i]." + modo));
        }

        aux.sort();

        if (reverse) {
            aux.reverse();
        }

        for (var i = 0; i < aux.length; i++) {
            aux[i] = parseInt(aux[i]);
        }

    } else if ($.isNumeric(eval("aP[0]." + modo).replace(",", ""))) {
        for (var i = 0; i < aP.length; i++) {
            aux[i] = ponCeros(eval("aP[i]." + modo));
        }

        aux.sort();

        if (reverse) {
            aux.reverse();
        }

        for (var i = 0; i < aux.length; i++) {
            aux[i] = parseFloat(aux[i].replace(",", ".")).toFixed(2).toString().replace(".", ",");
        }
    } else {
        for (var i = 0; i < aP.length; i++) {
            aux[i] = eval("aP[i]." + modo);
        }

        aux.sort();

        if (reverse) {
            aux.reverse();
        }
    }

    for (var i = 0; i < aP.length; i++) {
        aAux[i] = obtenDatos(aux[i], modo);
    }

    for (var i = 0; i < aP.length; i++) {
        aP[i] = aAux[i];
    }

    function obtenDatos(dato, modo) {

        for (var i = 0; i < aP.length; i++) {

            if (dato == eval("aP[i]." + modo)) {
                var aux = [];

                for (var campo in aP[0]) {
                    aux[campo] = eval("aP[i]." + campo);
                }

                eval("aP[i]." + modo + "=''");

                return aux;
            }
        }
    }

};

function ponCeros(dato) {

    var ceros = "";

    for (var i = dato.length ; i <= 10; i++) {
        ceros += "0";
    }

    return ceros + dato;
}

var pro;

function ver_datos(index) {
    
    alert(pro.getProducto(index).Art);
}

function retroceso() {

    pro = productos.getProductos(-10);

    if ($("#btAvance").hide) {
        $("#btAvance").show("slow");
    }

    if (productos.pagina == 2) {
        $("#btRetroceso").hide("slow");
    }

   printProductos(pro);


}
function printProductos(productos){
    $("#solapa1").empty();
    var $thumb = "";
    for(var x=0;x<productos.length;x++){/*recorremos el array y creamos los objetos html*/
        

         $thumb = $( "<div class='thumbnail'>" );
        var $foto = $("<img class='imgfoto' src=../../Content/img/"+productos[x].foto+" alt='imagen'>");
        var $newH3 = $("<h3 class='let tops'>"+productos[x].Art+"</h3>");
        var $newH4 = $("<h4 class='let tick'>"+productos[x].Pvp+" €</h4>");

        /**Añadimos el evento dinamicamente y ya está**/
        $thumb.on("click", function () {
           // alert("tocateloswebos");
            rellenaPopup($(this));
            $("#element_to_pop_up").dialog("open");
        });

        $($thumb).append($foto);
        $($thumb).append($newH3);
        $($thumb).append($newH4);

        $("#solapa1").append($thumb);
    }

  
}

function avance() {

    pro = productos.getProductos(10);

    if (pro.length < 9) {
        $("#btAvance").hide("slow");
    }

    if (productos.pagina == 3) {
        $("#btRestroceso").show("slow");
    }

   printProductos(pro);

}

function cargar_productos() {

    $.getJSON(".../../Content/js/datos.txt").done(function (data) {
        aProductos = data;

        //aProductos.ordenar("Cod", true);

       //avance_pagina();
    }).fail(function (textStatus, error) {
        var err = textStatus + ", " + error;
        alert("Algo ha fallado al cargar los productos: " + err);
    });
}

/********captura del boton/capa seleccionao y rellena la tabla carrito con los datos***********/
function rellenaPopup(boton) {


   var nombre = boton.find("h3:first").text();
    var imagen = boton.find("img").attr("src");
    var precio = boton.find("h4").text();
    precio = precio.replace(/€/g, '');
    //alert(nombre+" "+ imagen +" "+ precio);

    $("#element_to_pop_up #carrito .imagen").html("<img src=../../" + imagen + " alt='imagen' />");
    $("#element_to_pop_up #carrito .nombre").html(nombre);
    $("#element_to_pop_up #carrito .precio").html(precio);
    $("#element_to_pop_up #carrito input #cantidad").html("1");
    $("#element_to_pop_up #carrito .total b").html(precio + " Euros");
}

