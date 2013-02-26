/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Pojos;

import java.util.Date;
import java.util.List;

/**
 *
 * @author al036309 - Sofia Felix
 */
public class Actor {
    
    private int id;
    private String nombre;
    private String ape1;
    private String ape2;
    private Date fecha;
    private String lugar;
    private List<Serie> series;

    public String getApe1() {
        return ape1;
    }

    public void setApe1(String ape1) {
        this.ape1 = ape1;
    }

    public String getApe2() {
        return ape2;
    }

    public void setApe2(String ape2) {
        this.ape2 = ape2;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Serie> getSeries() {
        return series;
    }

    public void setSeries(List<Serie> series) {
        this.series = series;
    }

            
   
}
