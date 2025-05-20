package mx.edu.utez.U2_01_PracticaGIT.Repository;

import mx.edu.utez.U2_01_PracticaGIT.Model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    Proveedor findByNombre(String nombre);
}
