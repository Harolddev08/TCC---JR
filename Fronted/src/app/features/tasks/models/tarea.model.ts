/** Objeto que devuelve el backend (con id) */
export interface Tareas {
    id:          number;
    titulo:      string;
    descripcion: string;
    completada:  boolean;
  }
  
  /** Objeto que enviamos cuando creamos una tarea (sin id) */
  export type NuevaTarea = Omit<Tareas, 'id'>;