package mx.edu.utez.U2_01_PracticaGIT.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "provedores")
public class Provedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String telefono;
    private String correo;

    /*
    @OneToMany(mappedBy = "provedor")
    private Automovil automovil;

     */
}
