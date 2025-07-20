import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';          // ← para [(ngModel)]
import { TareaService, Tarea } from '../services/tarea.service';

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  /* ---------- listado de tareas ---------- */
  tareas: Tarea[] = [];

  /* ---------- alta de tarea ---------- */
  nuevoTitulo      = '';
  nuevaDescripcion = '';
  nuevaCompletada  = false;

  /* ---------- edición inline ---------- */
  editingTaskId: number | null = null;
  editTitulo      = '';
  editDescripcion = '';

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  /* ---------- helpers ---------- */

  private cargarTareas(): void {
    this.tareaService.obtenerTareas().subscribe({
      next: (res) => (this.tareas = res),
      error: (err) => console.error('Error al cargar tareas:', err)
    });
  }

  /* ---------- crear ---------- */

  agregarTarea(): void {
    if (!this.nuevoTitulo.trim()) { return; }

    const tarea: Tarea = {
      id: 0,                      // el backend asigna id
      titulo: this.nuevoTitulo,
      descripcion: this.nuevaDescripcion,
      completada: this.nuevaCompletada
    };

    this.tareaService.crearTarea(tarea).subscribe({
      next: (res) => {
        this.tareas.push(res);
        this.nuevoTitulo      = '';
        this.nuevaDescripcion = '';
        this.nuevaCompletada  = false;
      },
      error: (err) => console.error('Error al crear tarea:', err)
    });
  }

  /* ---------- toggle completada ---------- */

  toggleCompletada(tarea: Tarea): void {
    const tareaActualizada: Tarea = { ...tarea, completada: !tarea.completada };

    this.tareaService.actualizarTarea(tareaActualizada).subscribe({
      next: (res)  => (tarea.completada = res.completada),
      error: (err) => console.error('Error al actualizar tarea:', err)
    });
  }

  /* ---------- eliminar ---------- */

  eliminarTarea(id: number): void {
    if (!confirm('¿Eliminar esta tarea?')) { return; }

    this.tareaService.eliminarTarea(id).subscribe({
      next: ()    => (this.tareas = this.tareas.filter(t => t.id !== id)),
      error: (e)  => console.error('Error al eliminar tarea:', e)
    });
  }

  /* ---------- editar ---------- */

  startEdit(t: Tarea): void {
    this.editingTaskId = t.id;
    this.editTitulo      = t.titulo;
    this.editDescripcion = t.descripcion;
  }

  cancelEdit(): void {
    this.editingTaskId = null;
  }

  saveEdit(t: Tarea): void {
    if (!this.editTitulo.trim()) { return; }

    const tareaActualizada: Tarea = {
      ...t,
      titulo: this.editTitulo,
      descripcion: this.editDescripcion
    };

    this.tareaService.actualizarTarea(tareaActualizada).subscribe({
      next: (res) => {
        // refleja cambios en la lista
        t.titulo       = res.titulo;
        t.descripcion  = res.descripcion;
        this.editingTaskId = null;
      },
      error: (err) => console.error('Error al guardar cambios:', err)
    });
  }
}