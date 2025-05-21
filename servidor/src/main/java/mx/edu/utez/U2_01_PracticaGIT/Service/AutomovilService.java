package mx.edu.utez.U2_01_PracticaGIT.Service;

import mx.edu.utez.U2_01_PracticaGIT.Model.Automovil;
import mx.edu.utez.U2_01_PracticaGIT.Repository.AutomovilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AutomovilService {
    @Autowired
    private AutomovilRepository repository;

    public List<Automovil> buscarTodos() {
        return repository.findAll();
    }

    public Automovil guardar(Automovil automovil) {
        return repository.save(automovil);
    }

    public void eliminar(Long id){
        repository.deleteById(id);
    }

    public java.util.Optional<Automovil> findById(Long id) {
        return repository.findById(id);
    }

    public Automovil save(Automovil automovil) {
        return repository.save(automovil);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

}
