function listado_series(){        
    $("#divtabla").empty();       
    $.ajax({        
        url: 'Servlet?id=all',
        dataType: "json",       
        type: "GET",
        success:function(series){		            
            
            var tabla=      "<table class='tablaserie table-bordered table-hover'>"
            tabla += "<tr>"
            tabla +=       "<th>Id</th>"
            tabla +=       "<th>Nombre Serie</th>"
            tabla +=       "<th>Año</th>"
            tabla +=       "<th>Opciones</th>"
            tabla +=       "<th>Actores</th>"
            tabla += "</tr>";   
            
            $.each(series, function(index, serie) {
                tabla += "<tr>"                
                tabla +=        "<td>"
                tabla +=            "<p>" +serie.id+"</p>"
                tabla +=        "</td>" 
                
                tabla +=        "<td>"
                tabla +=             "<p>" +serie.nombre+"</p>"
                tabla +=        "</td>" 
                
                tabla +=        "<td>"
                tabla +=             "<p>" +serie.año+"</p>"
                tabla +=        "</td>"  
                
                tabla +=        "<td>"
                tabla +=            "<a class='btn ver_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-eye-open'></i> <strong>View</strong></a>"
                tabla +=            "<a class='btn editar_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-edit'></i> <strong>Edit</strong></a>"
                tabla +=            "<a class='btn eliminar_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-trash'></i> <strong>Delete</strong></a>"
                tabla +=        "</td>"    
                
                tabla +=        "<td>"
                tabla +=             "<a class='btn ver_actores_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-eye-open'></i> <strong>Actores</strong></a>"
                tabla +=        "</td>"                                      
                tabla +=  "</tr>";                   
            });     
            
            tabla +=    "</table>"; 
           
            tabla +=   "<a class='btn nueva_serie' href=\"#myModal\" data-toggle=\"modal\">"
            tabla +=       "<i class='icon-plus'></i>"
            tabla +=       "<strong>Nueva Serie</strong>"
            tabla +=   "</a>"
            
            
       //     tabla +=  getNeighborhood("Servlet", page_number, total_pages, neighborhood) 
        
        
            
        
            
            
            $("#divtabla").append(tabla);                                         
            $(".ver_serie").click(function(){                
                detalle_serie($(this).data('id'))                        
            });                 
            $(".editar_serie").click(function(){
                editar_serie($(this).data('id'))       
            });        
            $(".eliminar_serie").click( function(){
                eliminar_serie($(this).data('id'))
            });
            $(".ver_actores_serie").click( function(){
                ver_actores_serie($(this).data('id'))
            });
            $(".nueva_serie").click( function(){
                crear_serie()
            });
        },                                      
        error: function(){                
            alert("ERROR 1");
                        
        }            
    });
     
}

function detalle_serie(id){            
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");
    $.ajax({                    
        url: 'Servlet?id='+id, 
        dataType: 'json',
        type: "GET",
        success: 
        function(serie){                                
            if(serie.id_serie == 0){
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>El id no existe.</p>");                
            }else{                    
                $("#modal_cuerpo").empty();                 
                $("#modal_cuerpo").append(                            
                    "<div class='grande-datos'>",   
                    
                    "<div class='info-datos'>",                   
                    "<strong class='text-success'>Id: "+serie.id+"</strong><br>",
                    "<strong class='text-success'>Nombre: "+serie.nombre+"</strong><br>",
                    "<strong class='text-success'>Canal: "+serie.canal+"</strong><br>",
                    "<strong class='text-success'>Numero de Temporadas: "+serie.tempordas+"</strong><br>",
                    "<strong class='text-success'>Numero de Capitulos: "+serie.capitulos+"</strong><br>",
                    "<strong class='text-success'>Año: "+serie.año+"</strong>",
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
function eliminar_actor_serie(id_serie,id_actor){ 
     $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='eliminando...' />");
    $.ajax({                    
        url: 'EliminarActorSerieServlet?serie_id='+id_serie+'&actor_id=+'+id_actor, 
        dataType: 'text',
        type: "POST",
        success: 
        function(text){                        
            $("#modal_cuerpo").empty(); 
            $("#modal_cuerpo").append("<p>"+text+"</p>");                                                                  
            listado_series();
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });  
 
    
}

function eliminar_serie(id){   
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='eliminando...' />");
    $.ajax({                    
        url: 'EliminarSerieServlet?id='+id, //8088 casa - 8884clase
        dataType: 'text',
        type: "POST",
        success: 
        function(text){                        
            $("#modal_cuerpo").empty(); 
            $("#modal_cuerpo").append("<p>"+text+"</p>");                                                                  
            listado_series();
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });  
 
}

function editar_serie(id){   
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");
    $.ajax({                    
        url: 'Servlet?id='+id,
        dataType: 'json',
        type: "GET",
        success: 
        function(serie){                                
            if(serie.id_serie == 0){
                $("#modal_cuerpo").empty();                 
                $("#modal_cuerpo").append("<p>El id no existe.</p>");                
            }else{                    
                $("#modal_cuerpo").empty();    
                var form=
                 
                "<form action='ActualizarSerieServlet' name='actualiza_serie_form'>"+ 
                    
                "<input name='id' type='hidden' value='"+serie.id+"'/>"+                    									 
                "<label>Nombre</label>"+  
                "<input name='nombre' type='text' value='"+serie.nombre+"' class='input-large'/>"+  											 
                "<label>Canal</label>"+  
                "<input name='canal' type='text' value='"+serie.canal+"' class='input-large'/>"+ 											 
                "<label>Numero de Temporadas</label>"+  
                "<input name='temporadas' type='text' value='"+serie.temporadas+"' class='input-large'/>"+  											 
                "<label>Numero de Capitulos</label>"+  
                "<input name='capitulos' type='text' value='"+serie.capitulos+"' class='input-large'/>"+							 
                "<label>Año</label>"+  
                "<input name='anyo' type='text' value='"+serie.año+"' class='input-large'/>"+ 

                "<div>"+  
                "<button name='save-serie' type='submit' class='btn btn-primary'>Submit</input>"+  
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

function crear_serie()
{        
    $("#modal_cuerpo").empty();    
    var form =
        
    "<form action='GuardarSerieServlet'>"+     
    "<label>Nombre</label>"+  
    "<input name='nombre' type='text' class='input-large'/>"+  											 
    "<label>Canal</label>"+  
    "<input name='canal' type='text' class='input-large'/>"+ 											 
    "<label>Numero de Temporadas</label>"+  
    "<input name='temporadas' type='text' class='input-large'/>"+  											 
    "<label>Numero de Capitulos</label>"+  
    "<input name='capitulos' type='text' class='input-large'/>"+							 
    "<label>Año</label>"+  
    "<input name='anyo' type='text' class='input-large'/>"+ 

    "<div>"+  
    "<button name='save-serie' type='submit' class='btn btn-primary'>Submit</input>"+  
    "</div>"+ 

    "</form>"; 

    $("#modal_cuerpo").append(form);      
}          
         
         
function ver_actores_serie(id){
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");    
    $.ajax({                    
        url: 'ActoresSerieServlet?id='+id, 
        dataType: 'json',
        type: "GET",
        success: 
        function(actores){                                
            if(actores.length == 0){
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>La serie no tiene actores</p>");                
            }else{    
                $("#modal_cuerpo").empty();                
                var tabla=      "<table class='tablaactores table table-hover'>"
                tabla += "<tr>"
                tabla +=       "<th>Id</th>"
                tabla +=       "<th>Nombre</th>"
                tabla +=       "<th>Apellido</th>"    
                tabla +=       "<th>Opciones</th>" 
                tabla += "</tr>"          
                $.each(actores, function(index, actor) {
                    //   tabla += "<div class='actor_serie'>"
                    tabla += "<tr>"                
                    tabla +=        "<td>"
                    tabla +=            "<p>" +actor.id+"</p>"
                    tabla +=        "</td>"                   
                    tabla +=        "<td>"
                    tabla +=            "<p>" +actor.nombre+"</p>"
                    tabla +=        "</td>"                                                         
                    tabla +=        "<td>"
                    tabla +=            "<p>" +actor.ape2+"</p>"
                    tabla +=        "</td>"
                    tabla +=        "<td>"
                    tabla +=          "<a class='btn eliminar_actor_serie' href=\"#myModal\" data-toggle=\"modal\" data-serie_id="+id+" data-actor_id="+actor.id+"><strong>Eliminar</strong></a>"
                    tabla +=        "</td>"
                    tabla += "</tr>"   
                  
                });
                
                tabla +=    "</table>"; 
            
                tabla += "<div>"
           
             
                tabla +=        "<button > Agregar Actor </button>"
                tabla +=         "<form  class='checkboxes'>"  
                //     tabla +=                "<input type='checkbox' name='vehicle' value='Bike'> I have a bike<br>"
                //   tabla +=                " <input type='checkbox' name='vehicle' value='Car'> I have a car<br>"
                
                tabla +=          "<table cellpadding='7' width='40%' border='1' align='center'>"
                tabla +=          "<thead>"
                tabla +=          "<tr>"
                tabla +=          "<th>Nombre</th>"
                tabla +=          "<th>Apellido</th>"		
                tabla +=          "<th>Serie</th>"
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
            $(".agregar_actor_serie").click(function(){                
                agregar_actor_serie($(this).data('id')) 
                
            });                 
            $(".eliminar_actor_serie").click(function(){                
                eliminar_actor_serie($(this).data('serie_id'),$(this).data('actor_id'))
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
        return $.ajax({
            type: type,
            url: url,
            data: data,
            timeout: 30000
        });       
}; 


//http://www.emenia.es/lista-desplegable-y-plegable-con-jquery/

// http://www.jqueryeasy.com/2012/05/19/filtrar-y-ordenar-una-tabla-mysql-con-ajax/
