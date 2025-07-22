// src/main/java/com/tcc/Backend/model/Tarea.java
package com.tcc.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity @Data
public class Tarea {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String titulo;

    @Column(length = 400)
    private String descripcion;

    private boolean completada = false;

    /* NUEVO */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Prioridad prioridad = Prioridad.MEDIA;

    private LocalDate dueDate;          // puede ser null
}