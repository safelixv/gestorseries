<%-- 
    Document   : index
    Created on : 12-feb-2013, 20:00:50
    Author     : al036309
--%>


<%@page import="Pojos.PojoLogin"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="Pojos.Serie"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>        
        <script>
            var numeroPagina=<% if (request.getParameter("pagenumber") != null) {
                    out.print(request.getParameter("pagenumber"));
                } else {
                    out.print(1);
                }
            %>;
                var ver=<% if (request.getParameter("ver") != null) {
                    out.print("'" + request.getParameter("ver") + "'");
                } else {
                    out.print("'series'");
                }%>;
                       
                       
            <%--        <%

                HttpSession sesion = request.getSession();
                //si no se inicia sesión, redirecciona a la pagina de login
                PojoLogin login = (PojoLogin) sesion.getAttribute("login");
                if (login == null) {
                    response.sendRedirect("index.jsp");

                } else {
         %>  --%> 
                
        </script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Proyecto Series</title>
        <link rel="stylesheet" type="text/css" href="css/jquery-ui-1.7.2.custom.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script>
        <%--  <script src="assets/js/bootstrap-modal.js"></script>--%>
        <script src="js/bootstrap.min.js"></script>           
        <link rel=stylesheet href="css/bootstrap.css" type="text/css" media=screen>
        <link rel=stylesheet href="js/bootstrap.min.js" type="text/css" media=screen>
        <link rel=stylesheet href="js/bootstrap.js" type="text/css" media=screen>
        <link rel=stylesheet href="js/bootstrap-datepicker.js" type="text/css" media=screen>
        <link rel=stylesheet href="css/estilo.css" type="text/css" media=screen>

     <%--  
       	<script type="text/javascript">
jQuery(function($){
	$.datepicker.regional['es'] = {
		closeText: 'Cerrar',
		prevText: '&#x3c;Ant',
		nextText: 'Sig&#x3e;',
		currentText: 'Hoy',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['es']);
});    

        $(document).ready(function() {
           $("#datepicker").datepicker();
        });
    </script> --%> 

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
                            <li><a href="/ProyectoSeries/Login?accion=salir" id="logout"><i class="icon-off icon-white"></i> <strong>LogOut</strong></a></li>
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

        <%--      <%
          }
      %> --%> 

    </body>
</html>