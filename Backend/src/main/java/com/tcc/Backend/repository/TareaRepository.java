// src/main/java/com/tcc/Backend/repository/TareaRepository.java
package com.tcc.Backend.repository;

import com.tcc.Backend.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Long> {}