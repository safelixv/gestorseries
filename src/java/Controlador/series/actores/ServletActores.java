/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador.series.actores;

import ClasesDAO.DAOActores;
import ClasesDAO.DAOSeries;
import Pojos.Actor;
import Pojos.Serie;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author al036309 - Sofia Felix
 */
public class ServletActores extends HttpServlet {

    private static final Integer numeroItemsPaginas = 5;
    private Gson gson = new Gson();

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        String idact = request.getParameter("id");

        if (idact.equalsIgnoreCase("all")) {

            List<Pojos.Actor> oListaActores = new ArrayList<>();
            oListaActores = DAOActores.getActores();
            String json = gson.toJson(oListaActores);
            out.print(json);

        }
        if (idact.matches("^[0-9]*")) {
            try {
                Thread.sleep(1000); //se puede variar el retardo
            } catch (InterruptedException e) {
            }
            int idInt = Integer.parseInt(idact);
            Actor actor = DAOActores.getActor(idInt);
            Gson gson = new Gson();
            String json = gson.toJson(actor);
            out.println(json);
        }
        if (idact.equalsIgnoreCase("getrecords")) {

            List<Pojos.Actor> oListaActores = DAOActores.getActores();
            out.print(gson.toJson(oListaActores.size()));
        }
        if (idact.equalsIgnoreCase("getpages")) {

            List<Pojos.Actor> oListaActores = new ArrayList<>();
            oListaActores = DAOActores.getActores();
            int div = oListaActores.size() / numeroItemsPaginas;
            int resto = oListaActores.size() % numeroItemsPaginas;
            if (resto > 0) {
                div++;
            }
            out.print(gson.toJson(div));
        }
        if (idact.equalsIgnoreCase("getpage")) {
            Integer page = Integer.parseInt(request.getParameter("page"));
            List<Pojos.Actor> oListaActores = new ArrayList<>();
            oListaActores = DAOActores.getActores();
            int desde = (page - 1) * numeroItemsPaginas;
            int hasta = (page * numeroItemsPaginas);
            if (hasta > oListaActores.size()) {
                hasta = oListaActores.size();
            }
            List<Actor> listaActores = oListaActores.subList(desde, hasta);
            String json = gson.toJson(listaActores);
            out.print(json);
        }
        out.flush();
        out.close();
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}