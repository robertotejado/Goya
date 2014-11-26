$("<div>", {class: 'box',id: 'trololo'})
  .append($('<div>', {class: 'cuerpo' }).append(
            $('<div>', {class: 'cola'}).append(
                $('<ul>', {
                class: 'lista-colas',
                text: 'Aqui deberia ir un Lorem Ipsum...' 
            })  
        ),
        $('<div>', { class: 'tiempo' }))).hide().appendTo('#otraDiv').fadeIn('slow');