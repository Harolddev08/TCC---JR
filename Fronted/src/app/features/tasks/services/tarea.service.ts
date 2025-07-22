// src/app/features/tasks/services/tarea.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }  from 'rxjs';
import { Tarea, NuevaTarea } from '../models/tarea.model';

/* ① reexporta para que otros imports no rompan */
export type { Tarea } from '../models/tarea.model';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private readonly api = 'http://localhost:8080/api/tareas';
  constructor(private http: HttpClient) {}

  listar()             : Observable<Tarea[]> { return this.http.get<Tarea[]>(this.api); }
  /** ② alias para compatibilidad retro         */
  obtenerTareas()      : Observable<Tarea[]> { return this.listar(); }

  crear(t: NuevaTarea) : Observable<Tarea>   { return this.http.post<Tarea>(this.api, t); }
  actualizar(t: Tarea) : Observable<Tarea>   { return this.http.put<Tarea>(`${this.api}/${t.id}`, t); }
  eliminar(id: number) : Observable<void>    { return this.http.delete<void>(`${this.api}/${id}`); }
}