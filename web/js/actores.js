function listado_actores(pageNumber){
    
    var records=$.getValues("ServletActores?id=getpages");
    var pages= $.getValues("ServletActores?id=getpages");    
    var actores=$.getValues("ServletActores?id=getpage&page="+pageNumber);    
    var tabla=      "<table class='tablaactor table-bordered table-hover'>"
    
    $("#divtabla").empty(); 
    var tabla=      "<table class='table-bordered table-hover'>"
    tabla += "<tr>"
    tabla +=       "<th>Id</th>"
    tabla +=       "<th>Nombre Actor</th>"
    tabla +=       "<th>Apellido</th>"
    tabla +=       "<th>Opciones</th>"
    tabla +=       "<th>Series</th>"
    tabla += "</tr>";
    $.each(actores, function(index, actor) {
        tabla += "<tr>"
                
        tabla +=        "<td>"
        tabla +=        "<p>" +actor.id+"</p>"
        tabla +=        "</td>"
                
        tabla +=        "<td>"
        tabla +=        "<p>" +actor.nombre+"</p>"
        tabla +=        "</td>"
                
        tabla +=        "<td>"
        tabla +=        "<p>" +actor.ape2+"</p>"
        tabla +=        "</td>"
                
        tabla +=        "<td>"
        tabla +=        "<a class='btn ver_actor' href=\"#myModal\" data-toggle=\"modal\" data-id="+actor.id+"><i class='icon-eye-open'></i> <strong>View</strong></a>"
        tabla +=        "<a class='btn editar_actor' href=\"#myModal\" data-toggle=\"modal\" data-id="+actor.id+"><i class='icon-edit'></i> <strong>Edit</strong></a>"
        tabla +=        "<a class='btn eliminar_actor' data-id="+actor.id+"><i class='icon-trash'></i> <strong>Delete</strong></a>"
        tabla +=        "</td>"
                
        tabla +=        "<td>"
        tabla +=        "<a class='btn ver_series_actor' href=\"#myModal\" data-toggle=\"modal\" data-id="+actor.id+"><i class='icon-eye-open'></i> <strong>Series</strong></a>"
        tabla +=        "</td>"
                
        tabla +=  "</tr>";   
    });   
            
    tabla +=    "</table>"; 
            
        
    tabla +=        "<a class='btn nuevo_actor' href=\"#myModal\" data-toggle=\"modal\"><i class='icon-plus'></i> <strong>Nuevo Actor</strong></a>"
                
                
    tabla +=  getNeighborhood("index.jsp?ver=actores&pagenumber=", pageNumber, pages, 10);                                       
    $("#divtabla").append(tabla);                                         
    $(".ver_actor").click(function(){                
        ver_actor($(this).data('id'))                        
    });                 
    $(".editar_actor").click(function(){
        editar_actor($(this).data('id'))       
    });        
    $(".eliminar_actor").click( function(){
        var confirmacion=confirm('Esta seguro que desea eliminar el actor');        
        if (confirmacion){
            eliminar_actor($(this).data('id'))
        }
    });
    $(".ver_series_actor").click( function(){
        ver_series_actor($(this).data('id'))
    });
    $(".nuevo_actor").click( function(){
        nuevo_actor()
    });            
}
    
function ver_actor(id){         
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");    
    $.ajax({                    
        url: 'ServletActores?id='+id, 
        dataType: 'json',
        type: "GET",
        success: 
        function(actor){                                
            if(actor.id == 0){
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>El id no existe.</p>");                
            }else{                    
                $("#modal_cuerpo").empty();                 
                $("#modal_cuerpo").append(                            
                    "<div class='grande-datos'>",                            
                    "<div class='info-datos'>",                   
                    "<strong class='text-success'>Id: "+actor.id+"</strong><br>",
                    "<strong class='text-success'>Nombre: "+actor.nombre+"</strong><br>",
                    "<strong class='text-success'>Apellido 1: "+actor.ape1+"</strong><br>",
                    "<strong class='text-success'>Apellido 2: "+actor.ape2+"</strong><br>",
                    "<strong class='text-success'>Fecha de Nacimiento: "+actor.fecha+"</strong><br>",
                    "<strong class='text-success'>Lugar de Nacimiento: "+actor.lugar+"</strong>",
                    "</div>",
                    "<div>",
                    "<img src='img/himym.jpg' class='img-polaroid foto-serie'>",
                    "</div>",                                    
                    "</div>"
                    );      
            }          
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });    
}


function eliminar_actor(id){   
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='eliminando...' />");
    alert("eliminar:"+id);
    $.ajax({                    
        url: 'EliminarActorServlet?id='+id, 
        dataType: 'text',
        type: "POST",
        success: 
        function(text){                        
            $("#modal_cuerpo").empty(); 
            $("#modal_cuerpo").append("<p>"+text+"</p>");                                                                  
            listado_actores(0);
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });  
 
}

function editar_actor(id){   
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");
    $.ajax({                    
        url: 'ServletActores?id='+id,
        dataType: 'json',
        type: "GET",
        success: 
        function(actor){                                
            if(actor.id == 0){
                $("#modal_cuerpo").empty();                 
                $("#modal_cuerpo").append("<p>El id no existe.</p>");                
            }else{                    
                $("#modal_cuerpo").empty();    
                var form=
                 
                "<form action='ActualizarActorServlet' name='actualiza_actor_form'>"+ 
                    
                "<input name='id' type='hidden' value='"+actor.id+"'/>"+                    									 
                "<label>Nombre</label>"+  
                "<input name='nombre' type='text' value='"+actor.nombre+"' class='input-large'/>"+  											 
                "<label>Apellido 1:</label>"+  
                "<input name='ape1' type='text' value='"+actor.ape1+"' class='input-large'/>"+ 											 
                "<label>Apellido 2:</label>"+  
                "<input name='ape2' type='text' value='"+actor.ape2+"' class='input-large'/>"+  											 
                "<label>Fecha de Nacimiento:</label>"+  
                "<input name='fecha' type='text' value='"+actor.fecha+"' class='input-large'/>"+							 
                "<label>Lugar de Nacimiento:</label>"+  
                "<input name='lugar' type='text' value='"+actor.lugar+"' class='input-large'/>"+ 
                "<div>"+  
                "<button name='save-actor' type='submit' class='btn btn-primary'>Submit</input>"+  
                "</div>"+                     
                "</form>";                                
                $("#modal_cuerpo").append(form);      
            }          
            
        },      
        error: function(){
                
            if(id == ""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");
                    
            }
        }
    });        
}

function nuevo_actor()
{        
    $("#modal_cuerpo").empty();    
    var form=
    "<form action='GuardarActorServlet'>"+             
    "<label>Nombre</label>"+  
    "<input name='nombre' type='text' class='input-large'/>"+  											 
    "<label>Apellido 1:</label>"+  
    "<input name='ape1' type='text' class='input-large'/>"+ 											 
    "<label>Apellido 2:</label>"+  
    "<input name='ape2' type='text' class='input-large'/>"+  											 
    "<label>Fecha de Nacimiento:</label>"+  
    "<input name='fecha' type='text' class='input-large'/>"+							 
    "<label>Lugar de Nacimiento:</label>"+  
    "<input name='lugar' type='text' class='input-large'/>"+ 
    "<div>"+  
    "<button name='save-actor' type='submit' class='btn btn-primary'>Submit</input>"+  
    "</div>"+ 
            
    "</form>";      
        
    $("#modal_cuerpo").append(form);      
}      


      
         
function ver_series_actor(id){
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");    
    $.ajax({                    
        url: 'SeriesActorServlet?id='+id, 
        dataType: 'json',
        type: "GET",
        success: 
        function(series){                                
            if(series.length == 0){
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Este actor no trabaja en ninguna serie.</p>");                
            }else{    
                $("#modal_cuerpo").empty();                
                var tabla=      "<table class='tablaseries table table-hover'>"
                tabla += "<tr>"
                tabla +=       "<th>Id</th>"
                tabla +=       "<th>Nombre</th>"
                tabla +=       "<th>Año</th>"    
                tabla +=       "<th>Opciones</th>" 
                tabla += "</tr>"          
                $.each(series, function(index, serie) {
                   
                    tabla += "<tr>"                
                    tabla +=        "<td>"
                    tabla +=            "<p>" +serie.id+"</p>"
                    tabla +=        "</td>"                   
                    tabla +=        "<td>"
                    tabla +=            "<p>" +serie.nombre+"</p>"
                    tabla +=        "</td>"                                                         
                    tabla +=        "<td>"
                    tabla +=            "<p>" +serie.año+"</p>"
                    tabla +=        "</td>"
                    tabla +=        "<td>"
                    tabla +=          "<a class='btn eliminar_serie_actor' href=\"#myModal\" data-toggle=\"modal\" data-actor_id="+id+" data-serie_id="+serie.id+"><strong>Eliminar</strong></a>"
                    tabla +=        "</td>"
                    tabla += "</tr>"   
                  
                });
                
                tabla +=    "</table>"; 
            
                tabla += "<div>"
           
             
                tabla +=        "<button > Agregar Serie </button>"
                tabla +=         "<form  class='checkboxes'>"  
   
                tabla +=          "<table cellpadding='7' width='40%' border='1' align='center'>"
                tabla +=          "<thead>"
                tabla +=          "<tr>"
                tabla +=          "<th>Nombre</th>"
                tabla +=          "<th>Canal</th>"		
                tabla +=          "<th>Año</th>"
                tabla +=          "<th>Opciones</th>"
                tabla +=          "</tr>"
                tabla +=          "</thead>"
                tabla +=          "<tbody>"
                tabla +=          "<tr>"
                tabla +=          "<td>Jill</td>"
                tabla +=          "<td>Smith</td>"		
                tabla +=          "<td>50</td>"
                tabla +=          "<td><input type='checkbox' name='vehicle' value='Bike'></td>"
                tabla +=          "</tr>"
                tabla +=          "<tr>"
                tabla +=          "<td>Eve</td>"
                tabla +=          "<td>Jackson</td>"
                tabla +=          "<td>94</td>"
                tabla +=          "<td><input type='checkbox' name='vehicle' value='Bike'></td>"
                tabla +=          "</tr>"
                tabla +=          "<tr>"
                tabla +=          "<td>John</td>"
                tabla +=          "<td>Doe</td>	"	
                tabla +=          "<td>80</td>"
                tabla +=          "<td><input type='checkbox' name='vehicle' value='Bike'></td>"
                tabla +=          "</tr>"
                tabla +=          "<tr>"
                tabla +=          "<td>Adam</td>"
                tabla +=          "<td>Johnson</td>"
                tabla +=          "<td>67</td>"
                tabla +=          "<td><input type='checkbox' name='vehicle' value='Bike'></td>"
                tabla +=          "</tr>"
                tabla +=          "</tbody>"
                tabla +=          "</table>"                
                tabla +=                "<input type='submit' value='Submit'>"              
                tabla +=          "</form>"                              
                tabla +=  "</div>"  
                                                                                        
            }
            
            
            
           
            $("#modal_cuerpo").append(tabla);                                         
            $(".agregar_serie_actor").click(function(){                
                agregar_serie_actor($(this).data('id')) 
                
            });                 
            $(".eliminar_serie_actor").click(function(){                
                eliminar_serie_actor($(this).data('actor_id'),$(this).data('serie_id'))
            }); 
            
            
            $(document).ready(function(){
                $(".checkboxes").hide();
                $("button").click(function(event){
                    var desplegable = $(this).next();
                    $('.checkboxes').not(desplegable).slideUp('fast');
                    desplegable.slideToggle('fast');
                    event.preventDefault();
                })
            });
            
            
                     
            
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });            
}        
    
function getNeighborhood(link,  page_number, total_pages, neighborhood) { 
    page_number=parseInt(page_number);
    total_pages=parseInt(total_pages);
    neighborhood=parseInt(neighborhood);
    vector = "<div class=\"pagination\"><ul>";
    if (page_number > 1)
        vector+=("<li><a class=\"pagination_link\" id=\"" + (page_number - 1) + "\" href=\"" + link + (page_number - 1) + "\">prev</a></li>");
    if (page_number > neighborhood + 1)
        vector+=("<li><a class=\"pagination_link\" id=\"1\" href=\"" + link + "1\">1</a></li>");
    if (page_number > neighborhood + 2)
        vector+=("<li>" + "<a href=\"#\">...</a>" + "</li>");
    for (i = (page_number - neighborhood); i <= (page_number + neighborhood); i++){
        if (i >= 1 && i <= total_pages){
            if (page_number == i){
                vector+=("<li class=\"active\"><a class=\"pagination_link\" id=\"" + i + "\" href=\"" + link +     i + "\">" + i + "</a></li>");
            }            
            else
                vector+=("<li><a class=\"pagination_link\" id=\"" + i + "\" href=\"" + link + i + "\">" + i + "</a></li>");
        }
    }
    if (page_number < total_pages - (neighborhood + 1))
        vector+=("<li>" + "<a href=\"#\">...</a>" + "</li>");
    if (page_number < total_pages - (neighborhood))
        vector+=("<li><a class=\"pagination_link\" id=\"" + total_pages + "\" href=\"" + link + total_pages + "\">" + total_pages + "</a></li>");
    if (page_number < total_pages)
        vector+=("<li><a class=\"pagination_link\"  id=\"" + (page_number + 1) + "\" href=\"" + link + (page_number + 1) + "\">next</a></li>");        
    vector += "</ul></div>";
    return vector;
}           

function ajaxCallSync(url, type, data) {
    var result;
    $.ajax({
        type: type,
        url: url,
        datatype: 'json',
        timeout: 30000,
        success: function(data2){
            result=data2;
        }
    }            
    );       
    return {
        getResult : function(){
            if (result) return result;
        }
    };
}; 

jQuery.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
});

//http://www.emenia.es/lista-desplegable-y-plegable-con-jquery/

// http://www.jqueryeasy.com/2012/05/19/filtrar-y-ordenar-una-tabla-mysql-con-ajax/
