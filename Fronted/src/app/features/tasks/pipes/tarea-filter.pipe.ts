import { Pipe, PipeTransform } from '@angular/core';
import { Tarea } from '../models/tarea.model';

@Pipe({ name: 'tareaFilter', standalone: true })
export class TareaFilterPipe implements PipeTransform {
  transform(tareas: Tarea[], texto = ''): Tarea[] {
    if (!texto) return tareas;
    const q = texto.trim().toLowerCase();
    return tareas.filter(t =>
         t.titulo.toLowerCase().includes(q) ||
         (t.descripcion?.toLowerCase().includes(q) ?? false) ||
         t.prioridad.toLowerCase().includes(q)
    );
  }
}