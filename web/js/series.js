function listado_series(){        
    $("#divtabla").empty(); 
    $.ajax({        
        url: 'Servlet?id=all',
        dataType: "json",
       
        type: "GET",
        success:function(series){		            
            
            var tabla=      "<table class='tablaserie table table-hover'>"
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
                tabla +=        "<a class='btn ver_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-eye-open'></i> <strong>View</strong></a>"
                tabla +=        "<a class='btn editar_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-edit'></i> <strong>Edit</strong></a>"
                tabla +=        "<a class='btn eliminar_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-trash'></i> <strong>Delete</strong></a>"
                tabla +=        "</td>"    
                
                tabla +=        "<td>"
                tabla +=             "<a class='btn ver_actores_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-eye-open'></i> <strong>Actores</strong></a>"
                tabla +=        "</td>"                                      
                tabla +=  "</tr>";                   
            });                
            tabla +=  "<tr>";   
            tabla +=        "<td>"
            tabla +=            "<a class='btn nueva_serie' href=\"#myModal\" data-toggle=\"modal\"><i class='icon-eye-open'></i> <strong>Nueva Serie</strong></a>"
            tabla +=        "</td>"      
            tabla +=  "</tr>";   
            
            tabla +=    "</table>"; 
            
            
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
                tabla += "</tr>"          
                $.each(actores, function(index, actor) {
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
                tabla +=  "<tr>"   
                tabla +=        "<td>"
                tabla +=            "<a class='btn agregar_actor_serie' href=\"#myModal\" data-toggle=\"modal\" data-id-serie="+id+"><i class='icon-eye-open'></i> <strong>Agregar Actor</strong></a>"
                tabla +=        "</td>"      
                tabla +=  "</tr>"   
            
            
                tabla += "<tr>"
                tabla +=  "<div>" 
                tabla +=         "<form>"  
                tabla +=               "<td>"
                tabla +=                         "<input type='checkbox' name='vehicle' value='Bike'>I have a bike<br>"
                tabla +=                         "<input type='checkbox' name='vehicle' value='Car'>I have a car<br>"
                tabla +=                          "<input type='submit' value='Submit'>"
                tabla +=                "</td>" 
                tabla +=          "</form>" 
                tabla +=  "</div>"  
                tabla += "</tr>"
                tabla +=    "</table>"; 
            
            }
            $("#modal_cuerpo").append(tabla);                                         
            $(".agregar_actor_serie").click(function(){                
                agregar_actor_serie($(this).data('id'))                        
            });                 
            $(".eliminar_actor_serie").click(function(){                
                eliminar_actor_serie($(this).data('serie_id'),$(this).data('actor_id'))
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
    
           

//http://www.emenia.es/lista-desplegable-y-plegable-con-jquery/

// http://www.jqueryeasy.com/2012/05/19/filtrar-y-ordenar-una-tabla-mysql-con-ajax/
