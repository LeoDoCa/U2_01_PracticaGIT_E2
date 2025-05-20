package mx.edu.utez.U2_01_PracticaGIT.Repository;

import mx.edu.utez.U2_01_PracticaGIT.Model.Provedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvedorRepository extends JpaRepository<Provedor, Long> {
    Provedor findByNombre(String nombre);
}
