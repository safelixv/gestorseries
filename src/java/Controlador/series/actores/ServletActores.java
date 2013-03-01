/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador.series.actores;

import ClasesDAO.DAOActores;
import ClasesDAO.DAOSeries;
import Pojos.Actor;
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
        System.out.println("id:" + idact);

        if (idact.equalsIgnoreCase("all")) {
            List<Pojos.Actor> oListaActores = new ArrayList<>();
            oListaActores = DAOActores.getActores();
            Gson gson = new Gson();
            String json = gson.toJson(oListaActores);
            out.print(json);

        } else {
            int idInt = Integer.parseInt(idact);
            Actor actor = DAOActores.getActor(idInt);
            try {
                Thread.sleep(1000); //se puede variar el retardo
            } catch (InterruptedException e) {
            }
            Gson gson = new Gson();
            String json = gson.toJson(actor);
            out.println(json);
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
    /*    response.setContentType("application/json");
        PrintWriter out = response.getWriter();


        String idact = request.getParameter("id");

        if (idact.equalsIgnoreCase("all")) {
            List<Actor> oListaActores = new ArrayList<>();

            oListaActores = DAOActores.getActores();

            Gson gson = new Gson();
            String json = gson.toJson(oListaActores);
            out.print(json);

        } else {

            int idf = Integer.parseInt(idact);
            Actor lista = new Actor();
            lista = DAOActores.getActor(idf);
            try {
                Thread.sleep(1000); //se puede variar el retardo
            } catch (InterruptedException e) {
            }
            Gson gson = new Gson();
            String json = gson.toJson(lista);
            out.println(json);
        }*/

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