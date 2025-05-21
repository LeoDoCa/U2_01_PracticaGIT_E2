package mx.edu.utez.U2_01_PracticaGIT.Controller;

import mx.edu.utez.U2_01_PracticaGIT.Model.Automovil;
import mx.edu.utez.U2_01_PracticaGIT.Service.AutomovilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/automoviles")
@CrossOrigin(origins = "*")
public class AutomovilController {
    @Autowired
    private AutomovilService service;

    @GetMapping("/")
    public List<Automovil> getAll() {
        return service.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Automovil> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public Automovil create(@RequestBody Automovil automovil) {
        return service.guardar(automovil);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Automovil> update(@PathVariable Long id, @RequestBody Automovil automovil) {
        return service.findById(id)
                .map(existing -> {
                    automovil.setId(id);
                    return ResponseEntity.ok(service.save(automovil));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        return service.findById(id)
                .map(existing -> {
                    service.deleteById(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
