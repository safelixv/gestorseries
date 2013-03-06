

if (ver=='series'){
    window.onload=listado_series(numeroPagina);
}
if (ver=='actores'){
    window.onload=listado_actores(numeroPagina);
}
$(document).ready(function() {          
    $(".lista_actores").click(function() {   
        alert("actores");
        listado_actores(numeroPagina)        
    });
    $(".lista_series").click(function() {    
        listado_series(numeroPagina)        
    });
    
});

// Filtros
// http://www.jqueryeasy.com/2012/05/19/filtrar-y-ordenar-una-tabla-mysql-con-ajax/
// http://www.jqueryeasy.com/demos/filtro_tabla_mysql_ajax/index.php

