package mx.edu.utez.U2_01_PracticaGIT.Repository;

import mx.edu.utez.U2_01_PracticaGIT.Model.Automovil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutomovilRepository extends JpaRepository <Automovil, Long> {
}
