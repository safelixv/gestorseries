/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package modelojpa;

import java.io.Serializable;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ACE
 */
@Entity
@Table(name = "series")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Serie.findAll", query = "SELECT s FROM Serie s"),
    @NamedQuery(name = "Serie.findById", query = "SELECT s FROM Serie s WHERE s.id = :id"),
    @NamedQuery(name = "Serie.findByNombreSerie", query = "SELECT s FROM Serie s WHERE s.nombreSerie = :nombreSerie"),
    @NamedQuery(name = "Serie.findByCanal", query = "SELECT s FROM Serie s WHERE s.canal = :canal"),
    @NamedQuery(name = "Serie.findByTemporadas", query = "SELECT s FROM Serie s WHERE s.temporadas = :temporadas"),
    @NamedQuery(name = "Serie.findByCapitulos", query = "SELECT s FROM Serie s WHERE s.capitulos = :capitulos"),
    @NamedQuery(name = "Serie.findByA\u00f1o", query = "SELECT s FROM Serie s WHERE s.a\u00f1o = :a\u00f1o"),
    @NamedQuery(name = "Serie.findByGeneroId", query = "SELECT s FROM Serie s WHERE s.generoId = :generoId")})
public class Serie implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "nombre_serie")
    private String nombreSerie;
    @Basic(optional = false)
    @Column(name = "canal")
    private String canal;
    @Basic(optional = false)
    @Column(name = "temporadas")
    private int temporadas;
    @Basic(optional = false)
    @Column(name = "capitulos")
    private int capitulos;
    @Basic(optional = false)
    @Column(name = "a\u00f1o")
    private int año;
    @Column(name = "genero_id")
    private Integer generoId;

    public Serie() {
    }

    public Serie(Integer id) {
        this.id = id;
    }

    public Serie(Integer id, String nombreSerie, String canal, int temporadas, int capitulos, int año) {
        this.id = id;
        this.nombreSerie = nombreSerie;
        this.canal = canal;
        this.temporadas = temporadas;
        this.capitulos = capitulos;
        this.año = año;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreSerie() {
        return nombreSerie;
    }

    public void setNombreSerie(String nombreSerie) {
        this.nombreSerie = nombreSerie;
    }

    public String getCanal() {
        return canal;
    }

    public void setCanal(String canal) {
        this.canal = canal;
    }

    public int getTemporadas() {
        return temporadas;
    }

    public void setTemporadas(int temporadas) {
        this.temporadas = temporadas;
    }

    public int getCapitulos() {
        return capitulos;
    }

    public void setCapitulos(int capitulos) {
        this.capitulos = capitulos;
    }

    public int getAño() {
        return año;
    }

    public void setAño(int año) {
        this.año = año;
    }

    public Integer getGeneroId() {
        return generoId;
    }

    public void setGeneroId(Integer generoId) {
        this.generoId = generoId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Serie)) {
            return false;
        }
        Serie other = (Serie) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "modelojpa.Serie[ id=" + id + " ]";
    }
    
}
