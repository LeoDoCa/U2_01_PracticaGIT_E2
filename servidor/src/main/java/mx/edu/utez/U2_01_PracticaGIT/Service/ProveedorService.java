package mx.edu.utez.U2_01_PracticaGIT.Service;

import mx.edu.utez.U2_01_PracticaGIT.Model.Proveedor;
import mx.edu.utez.U2_01_PracticaGIT.Repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProveedorService {
    private final ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    //CRUD Operations
    public List<Proveedor> findAll() {
        return proveedorRepository.findAll();
    }

    public Proveedor findById(Long id) {
        return proveedorRepository.findById(id).orElse(null);
    }

    public Proveedor save(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public void deleteById(Long id) {
        proveedorRepository.deleteById(id);
    }

    public Proveedor update(Proveedor proveedor, Long id) {
        Proveedor existingProveedor = proveedorRepository.findById(id).orElse(null);
        if (existingProveedor != null) {
            existingProveedor.setNombre(proveedor.getNombre());
            existingProveedor.setApellidos(proveedor.getApellidos());
            existingProveedor.setTelefono(proveedor.getTelefono());
            existingProveedor.setCorreo(proveedor.getCorreo());
            return proveedorRepository.save(existingProveedor);
        }
        return null;
    }

    public Proveedor findByNombre(String nombre) {
        return proveedorRepository.findByNombre(nombre);
    }


}

