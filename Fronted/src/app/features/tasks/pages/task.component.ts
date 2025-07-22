import { Component, OnInit } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { TareaService }  from '../services/tarea.service';
import { Tarea, NuevaTarea, Prioridad } from '../models/tarea.model';

/* ---------- Angular Material ---------- */
import { MatCardModule }       from '@angular/material/card';
import { MatBadgeModule }      from '@angular/material/badge';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatSelectModule }     from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule }   from '@angular/material/checkbox';
import { MatButtonModule }     from '@angular/material/button';
import { MatDividerModule }    from '@angular/material/divider';
import { MatListModule }       from '@angular/material/list';
import { MatIconModule }       from '@angular/material/icon';
import { MatTooltipModule }    from '@angular/material/tooltip';

import { TareaFilterPipe } from '../pipes/tarea-filter.pipe';

@Component({
  standalone: true,
  selector   : 'app-task',
  templateUrl: './task.component.html',
  styleUrls  : ['./task.component.css'],
  imports: [
    CommonModule, FormsModule,
    /* material */
    MatCardModule, MatBadgeModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatCheckboxModule, MatButtonModule, MatDividerModule, MatListModule,
    MatIconModule, MatTooltipModule,
    /* pipes */
    TareaFilterPipe
  ]
})
export class TaskComponent implements OnInit {

  /* ---------- listado ---------- */
  tareas: Tarea[] = [];
  filtro = '';

  /* ---------- alta ---------- */
  nuevoTitulo      = '';
  nuevaDescripcion = '';
  nuevaCompletada  = false;
  nuevaPrioridad: Prioridad = 'MEDIA';
  nuevaDueDate   : Date | null = null;

  /* ---------- edición (inline) ---------- */
  editingId: number | null = null;
  editTitulo = '';
  editDescripcion = '';

  constructor(private tareaSvc: TareaService) {}

  /* ciclo */
  ngOnInit() { this.cargar(); }

  /* helpers */
  cargar() {
    this.tareaSvc.listar().subscribe({
      next: t => this.tareas = t,
      error: e => console.error('[GET] tareas', e)
    });
  }

  /* ---------- crear ---------- */
  agregarTarea() {
    if (!this.nuevoTitulo.trim()) return;

    const body: NuevaTarea = {
      titulo     : this.nuevoTitulo,
      descripcion: this.nuevaDescripcion,
      completada : this.nuevaCompletada,
      prioridad  : this.nuevaPrioridad,
      dueDate    : this.nuevaDueDate ? this.nuevaDueDate.toISOString().substring(0,10) : null
    };

    this.tareaSvc.crear(body).subscribe({
      next: r => { this.tareas.push(r); this.resetAlta(); },
      error: e => console.error('[POST] crear', e)
    });
  }
  private resetAlta() {
    this.nuevoTitulo = this.nuevaDescripcion = '';
    this.nuevaCompletada = false;
    this.nuevaPrioridad  = 'MEDIA';
    this.nuevaDueDate    = null;
  }

  /* ---------- toggle ---------- */
  toggleCompletada(t: Tarea) {
    const upd: Tarea = { ...t, completada: !t.completada };
    this.tareaSvc.actualizar(upd).subscribe({
      next: r => t.completada = r.completada,
      error: e => console.error('[PUT] toggle', e)
    });
  }

  /* ---------- eliminar ---------- */
  eliminar(id: number) {
    if (!confirm('¿Eliminar tarea?')) return;
    this.tareaSvc.eliminar(id).subscribe({
      next: () => this.tareas = this.tareas.filter(x => x.id !== id),
      error: e => console.error('[DELETE]', e)
    });
  }

  /* ---------- edición ---------- */
  startEdit(t: Tarea) {
    this.editingId = t.id!;
    this.editTitulo = t.titulo;
    this.editDescripcion = t.descripcion ?? '';
  }
  cancelEdit() { this.editingId = null; }

  guardar(t: Tarea) {
    if (!this.editTitulo.trim()) return;
    const upd: Tarea = { ...t, titulo: this.editTitulo, descripcion: this.editDescripcion };
    this.tareaSvc.actualizar(upd).subscribe({
      next: r => {
        Object.assign(t, r);          // actualiza referencia en el array
        this.editingId = null;
      },
      error: e => console.error('[PUT] editar', e)
    });
  }
}