/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package modelojpa;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sofia Felix
 */
@Entity
@Table(name = "actores")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Actor.findAll", query = "SELECT a FROM Actor a"),
    @NamedQuery(name = "Actor.findById", query = "SELECT a FROM Actor a WHERE a.id = :id"),
    @NamedQuery(name = "Actor.findByNombreActor", query = "SELECT a FROM Actor a WHERE a.nombreActor = :nombreActor"),
    @NamedQuery(name = "Actor.findByApe1Actor", query = "SELECT a FROM Actor a WHERE a.ape1Actor = :ape1Actor"),
    @NamedQuery(name = "Actor.findByApe2Actor", query = "SELECT a FROM Actor a WHERE a.ape2Actor = :ape2Actor"),
    @NamedQuery(name = "Actor.findByFechaNac", query = "SELECT a FROM Actor a WHERE a.fechaNac = :fechaNac"),
    @NamedQuery(name = "Actor.findByLugarNac", query = "SELECT a FROM Actor a WHERE a.lugarNac = :lugarNac")})
public class Actor implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "nombre_actor")
    private String nombreActor;
    @Basic(optional = false)
    @Column(name = "ape1_actor")
    private String ape1Actor;
    @Basic(optional = false)
    @Column(name = "ape2_actor")
    private String ape2Actor;
    @Basic(optional = false)
    @Column(name = "fecha_nac")
    @Temporal(TemporalType.DATE)
    private Date fechaNac;
    @Basic(optional = false)
    @Column(name = "lugar_nac")
    private String lugarNac;

    public Actor() {
    }

    public Actor(Integer id) {
        this.id = id;
    }

    public Actor(Integer id, String nombreActor, String ape1Actor, String ape2Actor, Date fechaNac, String lugarNac) {
        this.id = id;
        this.nombreActor = nombreActor;
        this.ape1Actor = ape1Actor;
        this.ape2Actor = ape2Actor;
        this.fechaNac = fechaNac;
        this.lugarNac = lugarNac;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreActor() {
        return nombreActor;
    }

    public void setNombreActor(String nombreActor) {
        this.nombreActor = nombreActor;
    }

    public String getApe1Actor() {
        return ape1Actor;
    }

    public void setApe1Actor(String ape1Actor) {
        this.ape1Actor = ape1Actor;
    }

    public String getApe2Actor() {
        return ape2Actor;
    }

    public void setApe2Actor(String ape2Actor) {
        this.ape2Actor = ape2Actor;
    }

    public Date getFechaNac() {
        return fechaNac;
    }

    public void setFechaNac(Date fechaNac) {
        this.fechaNac = fechaNac;
    }

    public String getLugarNac() {
        return lugarNac;
    }

    public void setLugarNac(String lugarNac) {
        this.lugarNac = lugarNac;
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
        if (!(object instanceof Actor)) {
            return false;
        }
        Actor other = (Actor) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "modelojpa.Actor[ id=" + id + " ]";
    }
    
}
