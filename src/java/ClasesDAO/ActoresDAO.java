/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ClasesDAO;

import Pojos.Actor;
import Pojos.Serie;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Sofia Felix
 */
public interface ActoresDAO {

    void actualizaActor(Actor Actor);

    void agregarSerieActor(String serieId, String actorId);

    void eliminaActor(Integer id);

    void eliminarSerieActor(String serieId, String actorId);

    Actor getActor(int id);

    ArrayList<Actor> getActores();

    List<Serie> getSeriesActor(String id);

    void guardarActor(Actor actor);
    
}
