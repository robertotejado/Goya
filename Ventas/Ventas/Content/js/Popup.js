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
                imagen = $("#element_to_pop_up #carrito .imagen img").attr("src");
                nombre = $("#element_to_pop_up #carrito .nombre").text();
                precio = $("#element_to_pop_up #carrito .precio").text();
                cantidad = $("#element_to_pop_up #carrito #cantidad").val();
                total = (parseFloat(precio.replace(/,/g, '.')).toFixed(2) * parseFloat(cantidad.replace(/,/g, '.')).toFixed(2));

                if (!isNaN(total)) {
                    /* Captura de Productos Ticket y añadido al aceptar*/
                    $('#carrito .productosCarro table tbody').prepend(
                        $('<tr>').prepend("<td class='let tops'>" + nombre + "</td><td class='let tick' class='preciovalor'> " + total.toFixed(2) + " </td> "
                            + "<td class='botonEliminarProducto'><button type='button' class='btn btn-xs ccmini'><span class='glyphicon glyphicon-remove-circle'></span></button></td>"));
                    actualizarTotalTotal(total.toFixed(2));
                } else {

                    alert("La cantidad debe ser un numero válido");
                    //$("#element_to_pop_up #carrito #cantidad").value("");
                     $("#element_to_pop_up #carrito #cantidad").val("0");
                    return false;
                    //$("#element_to_pop_up").dialog("open");
                }

                /**boton  que remueve producto del carrito final*/
  $(".botonEliminarProducto button").on("click", function () {
         
      
      //Restar precio de producto al total
      //Del DOM el precio del boton clickao
      var tbody = $(this).parent().parent().parent().parent();  //Obtiene el tbody desde el boton clikao
      var tbodytrtd = tbody.find("tbody tr td:nth-child(2)").html(); //obtiene la segunda celda del boton clickao (el precio)
      var preciorestar = (parseFloat(tbodytrtd.replace(/,/g, '.')).toFixed(2));//Reemplazo de comas por puntos y redondeo de 2 digitos
      descontarProductoTotal(preciorestar);//Restar precio del producto al total

      //Remover la tupla del boton clicao para eliminar en "Productos Ticket"
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

   

    //Teclao numerico  de el campo Cantidad
    $('#cantidad')
.keyboard({
  
    restrictInput: false, //Evitar que las teclas  en el teclado no se muestren de ser escrito
    autoAccept: true,
    layout: 'custom',
    openOn: focus,
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
    maxLength: 6
}).addTyping();


    // Utilizando disparo de evento  - al cambiar el campo cantidad se dispara y calcula el total seleccionado!
    $('#cantidad').bind('change.keyboard', function (e, keyboard, el) {
        precio = $("#element_to_pop_up #carrito .precio").text();
        cantidad = $("#element_to_pop_up #carrito #cantidad").val();
        total = (parseFloat(precio.replace(/,/g, '.')).toFixed(2) * parseFloat(cantidad.replace(/,/g, '.')).toFixed(2));
        $("#element_to_pop_up #carrito .total b").text(total.toFixed(2) + " Euros");
    });
          

    //Al aceptar en el teclao numarico actualiza el campo Total
  /*  $.keyboard.keyaction.accept = function (base) {
      
        precio = $("#element_to_pop_up #carrito .precio").text();
        cantidad = base.$preview.val();
        total = (parseFloat(precio.replace(/,/g, '.')).toFixed(2) * parseFloat(cantidad.replace(/,/g, '.')).toFixed(2));
        $("#element_to_pop_up #carrito .total b").text(total.toFixed(2) + " Euros");
       
    };
    */

    function actualizarTotalTotal(s2) {
        var cantidadtotalinicial = 0.00;
        var s1 = $('.tuplatotal .PRECIOTOTAL').text();
        cantidadtotalinicial = parseFloat(s1) + parseFloat(s2);
        $('.tuplatotal .PRECIOTOTAL').replaceWith('<td class="let tick PRECIOTOTAL">' + cantidadtotalinicial.toFixed(2) + '</td>');
    }

    function descontarProductoTotal(s2) {
        var cantidadtotalinicial = 0.00;
        var s1 = $('.tuplatotal .PRECIOTOTAL').text();
        cantidadtotalinicial = parseFloat(s1) - parseFloat(s2);
        $('.tuplatotal .PRECIOTOTAL').replaceWith('<td class="let tick PRECIOTOTAL">' + cantidadtotalinicial.toFixed(2) + '</td>');
    }


});