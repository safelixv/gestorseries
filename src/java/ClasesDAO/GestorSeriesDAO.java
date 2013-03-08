/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ClasesDAO;

/**
 *
 * @author Sofia Felix
 */
public class GestorSeriesDAO {
   private static GestorSeriesDAO instance=null;
   private ActoresDAO actoresDAO;
   private SeriesDAO seriesDAO;
            
   public static GestorSeriesDAO getInstance(){
       if (instance == null){
           instance= new GestorSeriesDAO();
       }
       return instance;
   }
   
   private GestorSeriesDAO(){
       actoresDAO=new ActoresDAOjdbc();
       seriesDAO=new SeriesDAOjdbc();
       
   }

    public ActoresDAO getActoresDAO() {
        return actoresDAO;
    }

    public SeriesDAO getSeriesDAO() {
        return seriesDAO;
    }
   
   
    
}
