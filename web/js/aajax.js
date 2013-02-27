
window.onload=listado_series(a);
$(document).ready(function() {          
    $(".lista_actores").click(function() {                    
        listado_actores()        
    });
    $(".lista_series").click(function() {    
        listado_series(a)        
    });
    
});

