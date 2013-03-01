
window.onload=listado_series(a);
$(document).ready(function() {          
    $(".lista_actores").click(function() {                    
        listado_actores()        
    });
    $(".lista_series").click(function() {    
        listado_series(a)        
    });
    
});

// Filtros
// http://www.jqueryeasy.com/2012/05/19/filtrar-y-ordenar-una-tabla-mysql-con-ajax/
// http://www.jqueryeasy.com/demos/filtro_tabla_mysql_ajax/index.php

