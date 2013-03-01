/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ClasesDAO;

import Pojos.Actor;
import Pojos.Serie;
import conexion.Mysql;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author al036309 - Sofia Felix
 */
public class DAOActores {

//SELECT * FROM actores WHERE id = 38
    public static ArrayList<Actor> getActores() {

        ArrayList<Actor> listaActores = new ArrayList<>();
        try {
            Mysql.conexion();
            ResultSet rs = Mysql.execSQL("SELECT * FROM actores ");
            do {
                Actor actor = new Actor();
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

    public static Actor getActor(int id) {
        Actor actor = new Actor();
        try {
            Mysql.conexion();
            ResultSet rs = Mysql.execSQL("SELECT * FROM actores WHERE id = " + id);            
            actor.setId(rs.getInt("id"));
            actor.setNombre(rs.getString("nombre_actor"));
            actor.setApe1(rs.getString("ape1_actor"));
            actor.setApe2(rs.getString("ape2_actor"));
            actor.setFecha(rs.getDate("fecha_nac"));
            actor.setLugar(rs.getString("lugar_nac"));
            rs.close();
            Mysql.desconexion();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return actor;
    }

    public static void actualizaActor(Actor Actor) {
        try {
            Mysql.conexion();
            Mysql.updateOne(Actor.getId(), "actores", "nombre_actor", Actor.getNombre());
            Mysql.updateOne(Actor.getId(), "actores", "ape1_actor", Actor.getApe1());
            Mysql.updateOne(Actor.getId(), "actores", "ape2_actor", "" + Actor.getApe2());
            Mysql.updateOne(Actor.getId(), "actores", "fecha_nac", "" + Actor.getFecha());
            Mysql.updateOne(Actor.getId(), "actores", "lugar_nac", "" + Actor.getLugar());
            Mysql.desconexion();
        } catch (Exception ex) {
            Logger.getLogger(DAOActores.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void eliminaActor(Integer id) {
        try {
            Mysql.conexion();
            Mysql.removeOne(id, "actores");
            Mysql.desconexion();
            Mysql.commitTrans();
        } catch (Exception ex) {
            Logger.getLogger(DAOActores.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void guardarActor(Actor actor) {
        try {
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
            String sqlinsertar = "Insert into actores(nombre_actor,ape1_actor,ape2_actor,fecha_nac,lugar_nac) VALUES ('" + actor.getNombre() + "','" + actor.getApe1() + "','" + actor.getApe2() + "','" + sdf.format(actor.getFecha()) + "','" + actor.getLugar() + "')";
            Mysql.conexion();
            Mysql.insertar(sqlinsertar);
            Mysql.desconexion();
        } catch (Exception ex) {
            Logger.getLogger(DAOActores.class.getName()).log(Level.SEVERE, null, ex);
        }

    }



    public static List<Serie> getSeriesActor(String id) {
        ArrayList<Serie> listaSeries = new ArrayList<>();
        try {
            Mysql.conexion(); 
            ResultSet rs = Mysql.execSQL("SELECT * FROM actores,series_actores where series.id=id_serie AND id_actor ="+id);
            do {
                Serie serie=new Serie();
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
    
       public static void eliminarSerieActor(String serieId, String actorId) {
        try {
            Mysql.conexion();
            ResultSet rs = Mysql.execSQL("SELECT id FROM ACTORES_SERIES WHERE id_actor = "+actorId+" and id_serie = "+serieId);
            Mysql.removeOne(rs.getInt("id"),"ACTORES_SERIES");            
            Mysql.desconexion();
        } catch (Exception ex) {
            Logger.getLogger(DAOActores.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
}