$(function () {

    /****Variables Globales pal Producto seleccionao*****/
    var nombre = "";
    var imagen = "";
    var precio = "";
    var cantidad = "";
    var total = "";

    actualizarTotalTotal(0.00);

    //Capa elemento a popupear con su tabla de producto
    $("#element_to_pop_up").dialog({
        autoOpen: false,
        show: {
            effect: "scale",
            duration: 10
        },
        hide: {
            effect: "scale",
            duration: 10
        },
        resizable: true,
        height: 500,
        width: 800,
        modal: true,
        buttons: {
            "Aceptar": function () {
                nombre = $("#element_to_pop_up #carrito .nombre").text();
                precio = $("#element_to_pop_up #carrito .precio").text();
                cantidad = $("#element_to_pop_up #carrito #cantidad").val();
                 total = (parseFloat(precio.replace(/,/g, '.')).toFixed(2) * parseFloat(cantidad.replace(/,/g, '.')).toFixed(2));
                /// alert("nombre:" + nombre + " precio: " + precio + " cantidad: " + cantidad + " total: " + total);

                 /* Captura de Productos Ticket y añadido al aceptar*/
  $('#carrito .productosCarro table tbody').prepend(
  $('<tr>').prepend("<td class='let tops'>" + nombre + "</td><td class='let tick' class='preciovalor'> " + total.toFixed(2) + " </td> "
  +"<td class='botonEliminarProducto'><button type='button' class='btn btn-xs ccmini'><span class='glyphicon glyphicon-remove-circle'></span></button></td>"));


  actualizarTotalTotal(total.toFixed(2));

                /**boton  que remueve producto del carrito final*/
  $(".botonEliminarProducto button").on("click", function () {
      //Obtiene el nombre de etiqueta del padre var td = $(this).parent().get(0).tagName;
      //Obtiene el nombre de la clase del padre var td = $(this).parent().get(0).className;
     
      
      //Restar precio de producto al total
      //Valorar opcion del array pa sumatorio y restorio
      //var clase = $(this).parent().get(0).className;
      //var tabla = $(this).parent().parent().parent().parent().get(0).className;
     //var tbody = $(this).parent().parent().parent().parent().html();
        //alert(  tbody  );//this will alert the value in the 1st column.
      var tbody = $(this).parent().parent().parent().parent();  //Obtiene el tbody desde el boton clikao
      var tbodytrtd = tbody.find("tbody tr td:nth-child(2)").html(); //obtiene la segunda celda del boton clickao 
      //alert(tbodytrtd);
      var preciorestar = (parseFloat(tbodytrtd.replace(/,/g, '.')).toFixed(2));
      DescontarProductoTotal(preciorestar);//Restar precio del producto al total

      var td = $(this).parent().get(0);
      var tr = $(td).parent().get(0);
      tr.remove();

  });

                $(this).dialog("close");
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }

    });

   
    
    //Evento Click de Cada uno de las capas de los productos
    /**/$("#opcion1 #solapa1 .thumbnail").on("click", function () {
        rellenaPopup($(this));
       $("#element_to_pop_up").dialog("open");
    });

    

  /***Esto va en funciones.js*****captura del boton/capa seleccionao y rellena la tabla carrito con los datos*******
    function rellenaPopup(boton) {
        
         nombre = boton.find("h3:first").text();
         imagen = boton.find("img").attr("src");
         precio = boton.find("h4").text();
        precio = precio.replace(/€/g, '');
        //alert(nombre+" "+ imagen +" "+ precio);

        $("#element_to_pop_up #carrito .imagen").html("<img src=../../" + imagen + " alt='imagen' />");
        $("#element_to_pop_up #carrito .nombre").html(nombre);
        $("#element_to_pop_up #carrito .precio").html(precio);
        $("#element_to_pop_up #carrito input #cantidad").html("1");
        $("#element_to_pop_up #carrito .total b").html(precio + " Euros");
    }****/


    //Teclao numerico  pa´ el campo Cantidad
    $('#cantidad')
.keyboard({
    //layout: 'num',
    //restrictInput: true, // Prevent keys not in the displayed keyboard from being typed in
    //preventPaste: true,  // prevent ctrl-v and right click
    autoAccept: true,
    layout: 'custom',
    openOn: true,
    display: {
        'bksp': "\u2190", //<-flechita
        'accept': 'return',
        'default': 'ABC',
        'meta1': '.?123',
        'meta2': '#+='
    },
    customLayout: {
        'default': [
           '8 9 . {bksp}',
         '4 5 6 7',
         '0 1 2 3'
        ]
    },
    maxLength: 6,
}).addTyping();

    //Al aceptar en el teclao numarico actualiza el campo Total
    $.keyboard.keyaction.accept = function (base) {
       // var cantidad = $("#element_to_pop_up #carrito input #cantidad").val();
        precio = $("#element_to_pop_up #carrito .precio").text();
         cantidad = base.$preview.val();
        // alert("precio:" + parseFloat(precio.replace(/,/g, '.')) + " cant: " + parseFloat(cantidad.replace(/,/g, '.')));
        total = (parseFloat(precio.replace(/,/g, '.')).toFixed(2) * parseFloat(cantidad.replace(/,/g, '.')).toFixed(2));
        $("#element_to_pop_up #carrito .total b").text(total.toFixed(2) + " Euros");
       
    };


    function actualizarTotalTotal(s2) {
        var cantidadtotalinicial = 0.00;
        var s1 = $('.tuplatotal .PRECIOTOTAL').text();
        cantidadtotalinicial = parseFloat(s1) + parseFloat(s2);
        $('.tuplatotal .PRECIOTOTAL').replaceWith( '<td class="let tick PRECIOTOTAL">'+cantidadtotalinicial+'</td>');
    }

    function DescontarProductoTotal(s2) {
        var cantidadtotalinicial = 0.00;
        var s1 = $('.tuplatotal .PRECIOTOTAL').text();
        cantidadtotalinicial = parseFloat(s1) - parseFloat(s2);
        $('.tuplatotal .PRECIOTOTAL').replaceWith('<td class="let tick PRECIOTOTAL">' + cantidadtotalinicial.toFixed(2) + '</td>');
    }


});