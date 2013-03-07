/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador.series.actores;

import ClasesDAO.ActoresDAOjdbc;
import ClasesDAO.GestorSeriesDAO;
import ClasesDAO.SeriesDAOjdbc;
import Pojos.Actor;
import Pojos.Serie;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Sofia Felix
 */
public class ActualizarActorServlet extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");        
        PrintWriter out = response.getWriter();
        String id = request.getParameter("id");
        String nombre = request.getParameter("nombre");
        String ape1 = request.getParameter("ape1");
        String ape2 = request.getParameter("ape2");
        String fecha = request.getParameter("fecha");
        String lugar = request.getParameter("lugar");      
        SimpleDateFormat sdf=new SimpleDateFormat("dd-MM-yyyy");
        Actor actor=new Actor();
        actor.setId(Integer.parseInt(id));
        actor.setNombre(nombre);
        actor.setApe1(ape1);
        actor.setApe2(ape2);
        try {
            actor.setFecha(sdf.parse(fecha));
        } catch (ParseException ex) {
            Logger.getLogger(ActualizarActorServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        actor.setLugar(lugar);
        GestorSeriesDAO.getInstance().getActoresDAO().actualizaActor(actor);
        RequestDispatcher d = request.getRequestDispatcher("index.jsp?ver=actores");
        d.forward(request, response);        
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
