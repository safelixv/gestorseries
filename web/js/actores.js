function listado_actores(){
    $("#divtabla").empty(); 
    $.ajax({        
        url: 'ServletActores?id=all',
        dataType: "json",
        
        type: "GET",
        success:function(actores){            
            
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
                tabla +=        "<a class='btn eliminar_actor' href=\"#myModal\" data-toggle=\"modal\" data-id="+actor.id+"><i class='icon-trash'></i> <strong>Delete</strong></a>"
                tabla +=        "</td>"
                
                tabla +=        "<td>"
                tabla +=        "<a class='btn ver' href=\"#myModal\" data-toggle=\"modal\" data-id="+actor.id+"><i class='icon-eye-open'></i> <strong>Series</strong></a>"
                tabla +=        "</td>"
                
                tabla +=  "</tr>";   
            });   
            
            tabla +=    "</table>"; 
            
        
            tabla +=        "<a class='btn nuevo_actor' href=\"#myModal\" data-toggle=\"modal\"><i class='icon-plus'></i> <strong>Nuevo Actor</strong></a>"
                
           
            tabla +=           "<div class='pagination'>"
            tabla +=           "<ul>"
            tabla +=           "<li><a href='#'>Prev</a></li>"
            tabla +=           "<li><a href='#'>1</a></li>"
            tabla +=           "<li><a href='#'>2</a></li>"
            tabla +=           "<li><a href='#'>3</a></li>"
            tabla +=           "<li><a href='#'>4</a></li>"
            tabla +=           "<li><a href='#'>5</a></li>"
            tabla +=           "<li><a href='#'>Next</a></li>"
            tabla +=          " </ul>"
            tabla +=         " </div>"
           
                 
            
            $("#divtabla").append(tabla);                                         
            $(".ver_actor").click(function(){                
                ver_actor($(this).data('id'))                        
            });                 
            $(".editar_actor").click(function(){
                editar_actor($(this).data('id'))       
            });        
            $(".eliminar_actor").click( function(){
                eliminar_actor($(this).data('id'))
            });
            $(".ver_series_actor").click( function(){
                ver_actores_serie($(this).data('id'))
            });
            $(".nuevo_actor").click( function(){
                nuevo_actor()
            });
        },                                      
        error: function(){                
            alert("ERROR 1");
                        
        }            
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
        url: 'EliminarActorServlet?id='+id, //8088 casa - 8884clase
        dataType: 'text',
        type: "POST",
        success: 
        function(text){                        
            $("#modal_cuerpo").empty(); 
            $("#modal_cuerpo").append("<p>"+text+"</p>");                                                                  
            listado_actores();
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
                tabla +=       "<th>Año</th>"    
                tabla +=       "<th>Opciones</th>" 
                tabla += "</tr>"          
                $.each(actores, function(index, serie) {
                   
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
                tabla +=                "<input type='checkbox' name='vehicle' value='Bike'> I have a bike<br>"
                tabla +=                " <input type='checkbox' name='vehicle' value='Car'> I have a car<br>"
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


