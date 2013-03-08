<%-- 
    Document   : index
    Created on : 05-mar-2013, 18:09:45
    Author     : al036309
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="login">

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="css/estilo.css" />
        <link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.min.css" />
    </head>
    <%

        String login = "";
        if (session.getAttribute("login") != null) {
            login = session.getAttribute("login").toString();
        }
        System.out.println(login);
    %> 
    <body class="login">
        
        <div class="well">
        <div id="cabecera">
            <h4 class="ja"> Introduce tu usuario y contraseña.</h4> <br>
        </div>
        <div id="formulario">
                   
            <form class="form-horizontal" action="/ProyectoSeries" method="post">
                <div class="control-group">
                    <label class="control-label">Nombre de Usuario</label>
                    <div class="controls">
                        <input type="text" placeholder="Nombre" name="login" value="<%=login%>">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">Password</label>
                    <div class="controls">
                        <input type="password" placeholder="Password" name="password">
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <button type="submit" class="btn">Enviar</button>
                    </div>
                </div>
            </form>

        </div>
        </div>
    </body>
</html>
