<%-- 
    Document   : index
    Created on : 12-feb-2013, 20:00:50
    Author     : al036309
--%>


<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="Pojos.Serie"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>        
        <script>
            var a=  <% if (request.getParameter("pagenumber") != null) {
                        out.print(request.getParameter("pagenumber"));
                    } else {
                        out.print(1);
                    }                
           %>
        </script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script src="assets/js/bootstrap-modal.js"></script>
        <script src="js/bootstrap.min.js"></script>           
        <link rel=stylesheet href="css/bootstrap.css" type="text/css" media=screen>
        <link rel=stylesheet href="js/bootstrap.min.js" type="text/css" media=screen>
        <link rel=stylesheet href="js/bootstrap.js" type="text/css" media=screen>
        <link rel=stylesheet href="js/bootstrap-datepicker.js" type="text/css" media=screen>
        <link rel=stylesheet href="css/estilo.css" type="text/css" media=screen>
    </head>
    <body>     
        <br>
        <div class="navbar navbar-inverse">
            <div class="navbar-inner">
                <div class="container">
                    <a class="brand" href='#'>Proyecto Series</a>
                    <div class="navbar-inner">
                        <ul class="nav pull-right">
                            <li><a href='#' class='lista_series'  id="lista-series">Listado Series</a></li>
                            <li><a href='#' class="lista_actores" id="lista-actores">Listado Actores</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="divtabla" class="table table-bordered">       
        </div>
        <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 id="myModalLabel" id='modal_cabecera'>Series</h4>
            </div>
            <div class="modal-body" id="modal_cuerpo">            
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            </div>
        </div>        
        <script src="js/actores.js"></script>
        <script src="js/series.js"></script>
        <script src="js/aajax.js"></script>

    </body>
</html>