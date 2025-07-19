import { Component, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { Tarea, TareaService } from '../../tasks/services/tarea.service';

interface TareaUI extends Tarea { _dirty?: boolean }

@Component({
  standalone : true,
  selector   : 'app-task',
  templateUrl: './task.component.html',
  styleUrls  : ['./task.component.css'],
  imports    : [CommonModule, FormsModule]
})
export class TaskComponent implements OnInit {

  tareas: TareaUI[] = [];

  /* -------------  Campos del formulario ------------- */
  nuevaTarea: Partial<Tarea> = {
    titulo      : '',
    descripcion : '',
    completada : false
  };

  constructor(private tareaService: TareaService) {}

  /* ------------------------ INIT --------------------- */
  ngOnInit(): void { this.recargar(); }

  /* -------------------- CRUD ------------------------- */
  agregar(): void {
    if (!this.nuevaTarea.titulo?.trim()) { return; }

    // casteamos con “as Tarea” porque el id lo asigna el backend
    this.tareaService.crearTarea(this.nuevaTarea as Tarea).subscribe({
      next : (res) => {
        this.tareas.push(res);          // añade a la lista
        this.resetForm();               // limpia el form
      },
      error: (err) => console.error('Error al crear:', err)
    });
  }

  marcarCambio(t: TareaUI): void { t._dirty = true; }

  guardarCambio(t: TareaUI): void {
    const msg = t.completada
      ? '¿Confirmas que la tarea ya está completada?'
      : '¿Marcar la tarea como pendiente de nuevo?';

    if (!window.confirm(msg)) {          // cancelar → rollback
      t.completada = !t.completada;
      delete t._dirty;
      return;
    }

    this.tareaService.actualizarTarea(t).subscribe({
      next : (res) => { Object.assign(t, res); delete t._dirty; },
      error: (err) => { console.error(err); t.completada = !t.completada; delete t._dirty; }
    });
  }

  eliminar(t: TareaUI): void {
    if (!window.confirm('¿Eliminar la tarea?')) { return; }

    this.tareaService.eliminarTarea(t.id).subscribe({
      next : () => this.tareas = this.tareas.filter(x => x.id !== t.id),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  /* ------------------- helpers ----------------------- */
  private recargar(): void {
    this.tareaService.obtenerTareas().subscribe({
      next : (d) => this.tareas = d,
      error: (e) => console.error(e)
    });
  }

  private resetForm(): void {
    this.nuevaTarea = { titulo:'', descripcion:'', completada:false };
  }
}