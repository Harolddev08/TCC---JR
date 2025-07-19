package com.tcc.Backend.service;

import com.tcc.Backend.model.Tarea;
import com.tcc.Backend.repository.TareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    private final TareaRepository tareaRepository;

    public TareaService(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    public List<Tarea> listar() {
        return tareaRepository.findAll();
    }

    public Optional<Tarea> obtenerPorId(Long id) {
        return tareaRepository.findById(id);
    }

    public Tarea crear(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    public void eliminar(Long id) {
        tareaRepository.deleteById(id);
    }

    public Tarea actualizar(Long id, Tarea nuevaTarea) {
        return tareaRepository.findById(id).map(t -> {
            t.setTitulo(nuevaTarea.getTitulo());
            t.setDescripcion(nuevaTarea.getDescripcion());
            t.setCompletada(nuevaTarea.isCompletada());
            return tareaRepository.save(t);
        }).orElseThrow();
    }
}