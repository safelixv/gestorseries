/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package conexion;

/**
 *
 * @author al036309 - Sofia Felix
 */
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import java.sql.PreparedStatement;

public class Mysql {

    private static Connection conexion = null;
    private static String url = "jdbc:mysql://localhost:3308/gestorseries"; //(3307clase y casa3308)  3306(an)

    public static void conexion() throws Exception {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String urlOdbc = url;
            conexion = (Connection) (java.sql.DriverManager.getConnection(
                    urlOdbc, "gestorseries", "gestorseries")); //daw2013(rafa) administrador(sofia) 
                   //   urlOdbc, "root", "administrador")); //daw2013(rafa) administrador(sofia) 
        } catch (Exception e) {
            throw new Exception("Mysql.conexion: Error al abrir la conexion:"
                    + e.getMessage());
        }
    }

    public static void desconexion() throws Exception {
        try {
            if (conexion != null) {
                conexion.close();
            }
        } catch (SQLException e) {
            throw new Exception(
                    "MySQL.CerrarConexion: Error al cerrar la conexion"
                    + e.getMessage());
        }
    }

    public static void initTrans() throws Exception {
        try {
            conexion.setAutoCommit(false);
        } catch (SQLException e) {
            throw new Exception(
                    "Mysql.initTrans: Error al iniciar transacción: "
                    + e.getMessage());
        }
    }

    public static void commitTrans() throws Exception {
        try {
            conexion.commit();
        } catch (SQLException e) {
            throw new Exception("Mysql.commitTrans: Error en commit: "
                    + e.getMessage());
        }
    }

    public static void rollbackTrans() throws Exception {
        try {
            conexion.rollback();
        } catch (SQLException e) {
            throw new Exception("Mysql.rollbackTrans: Error en rollback: "
                    + e.getMessage());
        }
    }

    public static void removeOne(int id, String tabla) throws Exception {
        Statement s = null;
        try {
            s = (Statement) conexion.createStatement();
            s.executeUpdate("DELETE FROM " + tabla + " WHERE id = " + id);
        } catch (Exception e) {
            throw new Exception(
                    "mysql.deleteOne: Error al eliminar el registro: "
                    + e.getMessage());
        }
    }

    public static void insertar(String sql) throws Exception {
        Statement s = null;
        try {
            s = (Statement) conexion.createStatement();
            s.executeUpdate(sql);
        } catch (Exception e) {
            throw new Exception(
                    "mysql.insertar: Error al insertar el registro: "
                    + e.getMessage());
        }
    }

    public static void updateOne(int id, String tabla, String campo,
            String valor) throws Exception {
        Statement st = null;
        try {
            st = (Statement) conexion.createStatement();
            String sql = "UPDATE " + tabla + " SET " + campo + " = '" + valor
                    + "' WHERE id = " + Integer.toString(id);
            st.executeUpdate(sql);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(
                    "mysql.updateOne: Error al modificar el registro: "
                    + e.getMessage());
        }
    }

    public static int insertOne(String tabla) throws Exception {
        ResultSet rs = null;
        java.sql.PreparedStatement stmt = null;
        int id = 0;
        try {
            String sql = "INSERT INTO " + tabla + " (id) VALUES (null) ";
            stmt = conexion.prepareStatement(sql,
                    Statement.RETURN_GENERATED_KEYS);
            int returnLastInsertId = stmt.executeUpdate();
            if (returnLastInsertId != -1) {
                rs = stmt.getGeneratedKeys();
                rs.next();
                id = rs.getInt(1);
            }
            return id;
        } catch (Exception e) {
            throw new Exception(
                    "mysql.insertOne: Error al insertar el registro: "
                    + e.getMessage());
        }
    }

    public static String getOne(String tabla, String campo, int id)
            throws Exception {
        Statement stmt = null;
        ResultSet rs = null;
        try {
            stmt = (Statement) conexion.createStatement();
            String sql = "SELECT " + campo + " FROM  " + tabla + " WHERE  id="
                    + Integer.toString(id);
            rs = stmt.executeQuery(sql);
            rs.first();
            return rs.getString(campo);
        } catch (Exception ex) {
            throw new Exception(
                    "mysql.getOne: No se ha podido realizar la consulta: "
                    + ex.getMessage());
        }
    }

    public static ResultSet execSQL(String sql)
            throws Exception {

        System.out.print("\nEjecutando " + sql);
        Statement stmt = null;
        ResultSet rs = null;

        try {
            stmt = (Statement) conexion.createStatement();

            rs = stmt.executeQuery(sql);
            rs.first();
            return rs;
        } catch (Exception ex) {
            throw new Exception(
                    "mysql.getOne: No se ha podido realizar la consulta: "
                    + ex.getMessage());
        }

    }

    public static int getPages(String tabla, int rpp) throws Exception {
        int result = 0;
        Statement stmt = null;
        try {
            stmt = (Statement) conexion.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT count(*) FROM " + tabla
                    + " WHERE 1=1");
            while (rs.next()) {
                result = rs.getInt("COUNT(*)") / rpp;
                if ((rs.getInt("COUNT(*)") % rpp) > 0) {
                    result++;
                }
            }
            return result;
        } catch (Exception e) {
            throw new Exception("mysql.getPages: Error en la consulta: "
                    + e.getMessage());
        }
    }

    public static ArrayList<Integer> getPage(String tabla, int rpp, int page)
            throws Exception {
        ArrayList<Integer> vector = new ArrayList<Integer>();
        int offset = 0;
        Statement stmt = null;
        try {
            stmt = (Statement) conexion.createStatement();
            offset = Math.max(((page - 1) * rpp), 0);
            String sql = "SELECT id FROM " + tabla + " WHERE 1=1 LIMIT "
                    + offset + " , " + rpp;
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                vector.add(rs.getInt("id"));
            }
            return vector;
        } catch (Exception e) {
            throw new Exception("mysql.getPage: Error en la consulta: "
                    + e.getMessage());
        }
    }

    public static ResultSet get(String tabla, String campo, String condiciones)
            throws Exception {
        Statement stmt = null;
        ResultSet rs = null;

        try {
            stmt = (Statement) conexion.createStatement();
            String sql = "SELECT " + campo + " FROM " + tabla + " WHERE  "
                    + condiciones;

            rs = stmt.executeQuery(sql);
            rs.first();
            return rs;
        } catch (Exception ex) {
            throw new Exception(
                    "mysql.getOne: No se ha podido realizar la consulta: "
                    + ex.getMessage());
        }

    }

    
    
     public static ResultSet Get(String sql) throws Exception {
       ResultSet resultset = null;
       PreparedStatement stmt = null;
       String SqlGet = sql;
       try {

           stmt = conexion.prepareStatement(SqlGet);
           resultset = stmt.executeQuery();
           return resultset;



       } catch (SQLException e) {


           e.getStackTrace();
           throw new Exception("No va el Get " + e.getMessage());
       }

   }
 
    
    
    
    
}

