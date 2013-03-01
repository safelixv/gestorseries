/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ClasesDAO;

import Pojos.Actor;
import Pojos.Serie;
import conexion.Mysql;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author al036309
 */
public class DAOSeries {

//SELECT * FROM actores WHERE id = 2
    public static ArrayList<Serie> getSeries() {
        
        ArrayList<Serie> listaSeries = new ArrayList<>();
        try {
            Mysql.conexion();
            ResultSet rs = Mysql.execSQL("SELECT * FROM series ");
            do {
                Serie serie = new Serie();
                serie.setId(rs.getInt("id"));
                serie.setNombre(rs.getString("nombre_serie"));
                serie.setCanal(rs.getString("canal"));
                serie.setTemporadas(rs.getInt("temporadas"));
                serie.setCapitulos(rs.getInt("capitulos"));
                serie.setAño(rs.getInt("año"));
                listaSeries.add(serie);
            } while (rs.next());
            rs.close();
            Mysql.desconexion();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listaSeries;
    }

    public static Serie getSerie(int id) {
        Serie serie = new Serie();
        try {
            Mysql.conexion();
            ResultSet rs = Mysql.execSQL("SELECT * FROM series WHERE id = " + id);

            serie.setId(rs.getInt("id"));
            serie.setNombre(rs.getString("nombre_serie"));
            serie.setCanal(rs.getString("canal"));
            serie.setTemporadas(rs.getInt("temporadas"));
            serie.setCapitulos(rs.getInt("capitulos"));
            serie.setAño(rs.getInt("año"));

            Mysql.desconexion();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return serie;
    }

    public static void editarSerie(Serie serie) {
        try {
            Mysql.conexion();
            Mysql.updateOne(serie.getId(), "series", "nombre_serie", serie.getNombre());
            Mysql.updateOne(serie.getId(), "series", "canal", serie.getCanal());
            Mysql.updateOne(serie.getId(), "series", "temporadas", "" + serie.getTemporadas());
            Mysql.updateOne(serie.getId(), "series", "capitulos", "" + serie.getCapitulos());
            Mysql.updateOne(serie.getId(), "series", "año", "" + serie.getAño());
            Mysql.desconexion();
        } catch (Exception ex) {
            Logger.getLogger(DAOSeries.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void eliminaSerie(Integer id) {
        try {
            Mysql.conexion();
            Mysql.removeOne(id, "series");
            Mysql.desconexion();
            Mysql.commitTrans();
        } catch (Exception ex) {
            Logger.getLogger(DAOSeries.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void nuevaSerie(Serie serie) {
        try {
            String sqlinsertar = "Insert into series(nombre_serie,canal,temporadas,capitulos,año) VALUES ('" + serie.getNombre() + "','" + serie.getCanal() + "','" + serie.getTemporadas() + "','" + serie.getCapitulos() + "','" + serie.getAño() + "')";
            Mysql.conexion();
            Mysql.insertar(sqlinsertar);
            Mysql.desconexion();
        } catch (Exception ex) {
            Logger.getLogger(DAOSeries.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public static List<Actor> getActoresSerie(String id) {
        ArrayList<Actor> listaActores = new ArrayList<>();
        try {
            Mysql.conexion();
            ResultSet rs = Mysql.execSQL("SELECT * FROM actores,series_actores where actores.id=id_actor AND id_serie ="+id);
            do {
                Actor actor=new Actor();
                actor.setId(rs.getInt("id"));
                actor.setNombre(rs.getString("nombre_actor"));
                actor.setApe1(rs.getString("ape1_actor"));
                actor.setApe2(rs.getString("ape2_actor"));
                actor.setFecha(rs.getDate("fecha_nac"));
                actor.setLugar(rs.getString("lugar_nac"));
                listaActores.add(actor);
            } while (rs.next());
            rs.close();
            Mysql.desconexion();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listaActores;
    }

    public static void eliminarActorSerie(String serieId, String actorId) {
        try {
            Mysql.conexion();
            ResultSet rs = Mysql.execSQL("SELECT id FROM SERIES_ACTORES WHERE id_serie = "+serieId+" and id_actor = "+actorId);
            Mysql.removeOne(rs.getInt("id"),"SERIES_ACTORES");            
            Mysql.desconexion();
        } catch (Exception ex) {
            Logger.getLogger(DAOSeries.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void agregarActorSerie(String serieId, String actorId) {
           try {
            Mysql.conexion();
            Integer id=Mysql.insertOne("series_actores");
            Mysql.updateOne(id,"series_actores","id_serie",serieId);
            Mysql.updateOne(id,"series_actores","id_actor",actorId);
            Mysql.desconexion();
        } catch (Exception ex) {
            Logger.getLogger(DAOSeries.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
}