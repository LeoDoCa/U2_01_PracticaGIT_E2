package mx.edu.utez.U2_01_PracticaGIT.Controller;

import mx.edu.utez.U2_01_PracticaGIT.Model.Proveedor;
import mx.edu.utez.U2_01_PracticaGIT.Service.ProveedorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedor")
public class ProveedorController {
    private final ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    @GetMapping("/")
    public List<Proveedor> findAll() {
        return proveedorService.findAll();
    }

    @GetMapping("/{id}")
    public Proveedor findById(@PathVariable Long id) {
        return proveedorService.findById(id);
    }

    @GetMapping("/nombre/{nombre}")
    public Proveedor findByNombre(@PathVariable String nombre) {
        return proveedorService.findByNombre(nombre);
    }

    @PostMapping("/")
    public Proveedor save(@RequestBody Proveedor proveedor) {
        return proveedorService.save(proveedor);
    }

    @PutMapping("/{id}")
    public Proveedor update(@RequestBody Proveedor proveedor, @PathVariable Long id) {
        return proveedorService.update(proveedor, id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        proveedorService.deleteById(id);
    }
}
