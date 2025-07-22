// src/main/java/com/tcc/Backend/service/TareaService.java
package com.tcc.Backend.service;

import com.tcc.Backend.model.Tarea;
import com.tcc.Backend.repository.TareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    private final TareaRepository repo;

    public TareaService(TareaRepository repo) { this.repo = repo; }

    public List<Tarea> listar() {
        return repo.findAll();
    }

    public Optional<Tarea> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    public Tarea crear(Tarea tarea) {
        return repo.save(tarea);
    }

    public Tarea actualizar(Long id, Tarea nueva) {
        return repo.findById(id).map(t -> {
            t.setTitulo     (nueva.getTitulo());
            t.setDescripcion(nueva.getDescripcion());
            t.setCompletada (nueva.isCompletada());
            t.setPrioridad  (nueva.getPrioridad());
            t.setDueDate    (nueva.getDueDate());
            return repo.save(t);
        }).orElseThrow();
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}