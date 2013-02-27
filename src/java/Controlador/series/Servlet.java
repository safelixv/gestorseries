/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador.series;

import ClasesDAO.DAOSeries;
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
public class Servlet extends HttpServlet {
    private static Integer numeroPaginas=5;
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
        String id = request.getParameter("id");        
        Gson gson = new Gson();
        if (id.equalsIgnoreCase("all")) {            
            List<Pojos.Serie> oListaSeries = new ArrayList<>();
            oListaSeries = DAOSeries.getSeries();            
            String json = gson.toJson(oListaSeries);
            out.print(json);
        }         
        if (id.matches("%d")){       
            int idInt = Integer.parseInt(id);
            Serie serie = DAOSeries.getSerie(idInt);
            try {
                Thread.sleep(1000); //se puede variar el retardo
            } catch (InterruptedException e) {
            }            
            String json = gson.toJson(serie);
            out.println(json);
        }
        
        if (id.equalsIgnoreCase("getrecords")){         
            
            List<Pojos.Serie> oListaSeries = DAOSeries.getSeries();             
            out.print(gson.toJson(oListaSeries.size()));
        }
        if (id.equalsIgnoreCase("getpages")){           
            
            List<Pojos.Serie> oListaSeries = new ArrayList<>();            
            oListaSeries = DAOSeries.getSeries();            
            out.print(gson.toJson(oListaSeries.size()/numeroPaginas)); 
        }
        if (id.equalsIgnoreCase("getpage")){
            Integer page = Integer.parseInt(request.getParameter("page"));
            List<Pojos.Serie> oListaSeries = new ArrayList<>();
            oListaSeries = DAOSeries.getSeries();            
            List<Serie> listaSeries = oListaSeries.subList((page*numeroPaginas)-numeroPaginas,(page*numeroPaginas));            
            String json = gson.toJson(listaSeries);
            out.print(json);            
        }
//        
//        else {
//            int idInt = Integer.parseInt(id);
//            Serie serie = DAOSeries.getSerie(idInt);
//            try {
//                Thread.sleep(1000); //se puede variar el retardo
//            } catch (InterruptedException e) {
//            }
//            Gson gson = new Gson();
//            String json = gson.toJson(serie);
//            out.println(json);
//        }
        
        
        
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