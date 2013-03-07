/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ClasesDAO;

import Pojos.Actor;
import Pojos.Genero;
import Pojos.Serie;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author ACE
 */
public interface SeriesDAO {

    void agregarActorSerie(String serieId, String actorId);

    void editarSerie(Serie serie);

    void eliminaSerie(Integer id);

    void eliminarActorSerie(String serieId, String actorId);

    List<Actor> getActoresSerie(String id);

    Genero getGenero(int id);

    List<Genero> getGeneros();

    Serie getSerie(int id);

    ArrayList<Serie> getSeries();

    void nuevaSerie(Serie serie);
    
}
