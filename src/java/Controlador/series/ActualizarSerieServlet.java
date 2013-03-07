/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador.series;

import ClasesDAO.GestorSeriesDAO;
import ClasesDAO.SeriesDAOjdbc;
import Pojos.Serie;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Sofia Felix
 */
public class ActualizarSerieServlet extends HttpServlet {

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
        String canal = request.getParameter("canal");
        String temporadas = request.getParameter("temporadas");
        String capitulos = request.getParameter("capitulos");
        String anyo = request.getParameter("anyo");        
        String generoId = request.getParameter("genero_id");        
        Serie serie=new Serie();
        serie.setId(Integer.parseInt(id));
        serie.setNombre(nombre);
        serie.setCanal(canal);
        serie.setTemporadas(Integer.parseInt(temporadas));
        serie.setCapitulos(Integer.parseInt(capitulos));
        serie.setAño(Integer.parseInt(anyo));
        serie.setGeneroId(Integer.parseInt(generoId));
        GestorSeriesDAO.getInstance().getSeriesDAO().editarSerie(serie);
        RequestDispatcher d = request.getRequestDispatcher("index.jsp");
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
