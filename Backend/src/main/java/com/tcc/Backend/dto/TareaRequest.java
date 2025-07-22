package com.tcc.Backend.dto;

import com.tcc.Backend.model.Prioridad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TareaRequest {

    @NotBlank
    @Size(max = 120)
    private String titulo;

    @Size(max = 400)
    private String descripcion;

    private boolean completada;

    private Prioridad prioridad = Prioridad.MEDIA;

    private LocalDate dueDate;
}