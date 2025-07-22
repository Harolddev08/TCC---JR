/* --- modelo único para toda la app --------------------------- */

/** Valores que acepta el backend */
export type Prioridad = 'BAJA' | 'MEDIA' | 'ALTA';

/** Objeto que devuelve el backend (con id) */
export interface Tarea {
  id?: number;                 // ← opcional porque al crear aún no existe
  titulo: string;
  descripcion?: string;
  completada: boolean;

  /* NUEVOS CAMPOS */
  prioridad: Prioridad;
  /** ISO-8601 yyyy-MM-dd  (null => sin fecha) */
  dueDate?: string | null;
}

/** Objeto que enviamos cuando creamos (sin id)  */
export type NuevaTarea = Omit<Tarea, 'id'>;