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
 * @author ACE
 */
public class ActoresDAOJPA implements ActoresDAO{
    private EntityManager em;
    

    @Override
    public void actualizaActor(Actor actor) {
        em.update(actor);        
    }
    
    @Override
    public void agregarSerieActor(String serieId, String actorId) {
        getActor(actorId).getSeries().add(getSerie(serieId));
    }

    @Override
    public void eliminaActor(Integer id) {
        em.remove(getActor(id));        
    }

    @Override
    public void eliminarSerieActor(String serieId, String actorId) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Actor getActor(int id) {
        return em.find(Actor.class,id);
    }

    @Override
    public ArrayList<Actor> getActores() {
         return em.find(Actor.class);
    }

    @Override
    public List<Serie> getSeriesActor(String id) {
        getActor(Integer.parseInt(id)).getSeries();
    }

    @Override
    public void guardarActor(Actor actor) {
        em.persist(actor);
    }
    
    
}
