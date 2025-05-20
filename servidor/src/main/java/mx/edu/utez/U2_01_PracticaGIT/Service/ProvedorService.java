package mx.edu.utez.U2_01_PracticaGIT.Service;

import mx.edu.utez.U2_01_PracticaGIT.Model.Provedor;
import mx.edu.utez.U2_01_PracticaGIT.Repository.ProvedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvedorService {
    private final ProvedorRepository provedorRepository;

    public ProvedorService(ProvedorRepository provedorRepository) {
        this.provedorRepository = provedorRepository;
    }

    //CRUD Operations
    public List<Provedor> findAll() {
        return provedorRepository.findAll();
    }

    public Provedor findById(Long id) {
        return provedorRepository.findById(id).orElse(null);
    }

    public Provedor save(Provedor provedor) {
        return provedorRepository.save(provedor);
    }

    public void deleteById(Long id) {
        provedorRepository.deleteById(id);
    }

    public Provedor update(Provedor provedor) {
        return provedorRepository.save(provedor);
    }

    public Provedor findByNombre(String nombre) {
        return provedorRepository.findByNombre(nombre);
    }


}

