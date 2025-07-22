package com.tcc.Backend.dto;

import com.tcc.Backend.model.Prioridad;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TareaResponse {

    private Long id;
    private String titulo;
    private String descripcion;
    private boolean completada;
    private Prioridad prioridad;
    private LocalDate dueDate;
}