/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ClasesDAO;

import Pojos.PojoLogin;
import conexion.Mysql;
import java.sql.ResultSet;

/**
 *
 * @author Sofia Felix
 */
public class LoginDAO {

    public LoginDAO() {
    }

    public static PojoLogin loginUser(PojoLogin autentificacion) throws Exception {
        try {

            Mysql.conexion();
            String consulta = "SELECT * FROM usuario WHERE login ='" + autentificacion.getLogin()
                    + "'  AND PASSWORD ='" + autentificacion.getPassword() + "'";
        
            ResultSet result = Mysql.get(consulta);
            if (result.next()) {



                autentificacion.setPassword(result.getString("password"));
                autentificacion.setLogin(result.getString("login"));
                autentificacion.setId(result.getInt("id"));


            }


        } catch (Exception e) {

            throw new Exception("Datos introducidos invalidos " + e.getMessage());
        }
        return autentificacion;
    }
}
