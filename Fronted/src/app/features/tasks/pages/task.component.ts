/* ============================================================
   task.component.ts – versión corregida
   No altera estilos ni lógica anterior, solo quita el id al crear
   ============================================================ */

   import { Component, OnInit } from '@angular/core';
   import { CommonModule } from '@angular/common';
   import { FormsModule } from '@angular/forms';
   import { TareaService, Tarea } from '../services/tarea.service';
   
   import { MatCardModule }      from '@angular/material/card';
import { MatBadgeModule }     from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatButtonModule }    from '@angular/material/button';
import { MatDividerModule }   from '@angular/material/divider';
import { MatListModule }      from '@angular/material/list';
import { MatIconModule }      from '@angular/material/icon';
import { MatTooltipModule }   from '@angular/material/tooltip';
   /* DTO para creación (sin id) */
   type NuevaTarea = Omit<Tarea, 'id'>;
   
   @Component({
    standalone: true,
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],

    imports: [

      CommonModule,
      FormsModule,
  
      /* material */
      MatCardModule,
      MatBadgeModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule,
      MatButtonModule,
      MatDividerModule,
      MatListModule,
      MatIconModule,
      MatTooltipModule,
    ]
  })
   export class TaskComponent implements OnInit {
   
     /* ---------- listado ---------- */
     tareas: Tarea[] = [];
   
     /* ---------- alta ---------- */
     nuevoTitulo      = '';
     nuevaDescripcion = '';
     nuevaCompletada  = false;
   
     /* ---------- edición ---------- */
     editingTaskId: number | null = null;
     editTitulo      = '';
     editDescripcion = '';
   
     constructor(private tareaService: TareaService) {}
   
     /* ---------- ciclo ---------- */
     ngOnInit(): void {
       this.cargarTareas();
     }
   
     /* ---------- helpers ---------- */
     private cargarTareas(): void {
       this.tareaService.obtenerTareas().subscribe({
         next: res  => this.tareas = res,
         error: err => console.error('Error al cargar tareas:', err)
       });
     }
   
     /* ---------- crear ---------- */
     agregarTarea(): void {
       if (!this.nuevoTitulo.trim()) { return; }
   
       const nuevaTarea: NuevaTarea = {
         titulo:       this.nuevoTitulo,
         descripcion:  this.nuevaDescripcion,
         completada:   this.nuevaCompletada
       };

       
   
       this.tareaService.crearTarea(nuevaTarea).subscribe({
         next: res => {
           this.tareas.push(res);          // backend devuelve tarea con id
           this.nuevoTitulo      = '';
           this.nuevaDescripcion = '';
           this.nuevaCompletada  = false;
         },
         error: err => console.error('Error al crear tarea:', err)
       });
     }
   
     /* ---------- toggle ---------- */
     toggleCompletada(tarea: Tarea): void {
       const tareaActualizada: Tarea = { ...tarea, completada: !tarea.completada };
   
       this.tareaService.actualizarTarea(tareaActualizada).subscribe({
         next: res  => tarea.completada = res.completada,
         error: err => console.error('Error al actualizar tarea:', err)
       });
     }
   
     /* ---------- eliminar ---------- */
     eliminarTarea(id: number): void {
       if (!confirm('¿Eliminar esta tarea?')) { return; }
   
       this.tareaService.eliminarTarea(id).subscribe({
         next: ()   => this.tareas = this.tareas.filter(t => t.id !== id),
         error: err => console.error('Error al eliminar tarea:', err)
       });
     }
   
     /* ---------- edición inline ---------- */
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
         titulo:      this.editTitulo,
         descripcion: this.editDescripcion
       };
   
       this.tareaService.actualizarTarea(tareaActualizada).subscribe({
         next: res => {
           t.titulo      = res.titulo;
           t.descripcion = res.descripcion;
           this.editingTaskId = null;
         },
         error: err => console.error('Error al guardar cambios:', err)
       });
     }
   }