import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
  id:          number;
  titulo:      string;
  descripcion: string;
  completada:  boolean;           // ← mismo nombre que el backend
}

@Injectable({ providedIn: 'root' })
export class TareaService {
  private apiUrl = 'http://localhost:8080/api/tareas';

  constructor(private http: HttpClient) {}

  obtenerTareas(): Observable<Tarea[]>         { return this.http.get<Tarea[]>(this.apiUrl); }
  crearTarea(t: Tarea): Observable<Tarea>      { return this.http.post<Tarea>(this.apiUrl, t); }
  actualizarTarea(t: Tarea): Observable<Tarea> { return this.http.put<Tarea>(`${this.apiUrl}/${t.id}`, t); }
  eliminarTarea(id: number): Observable<void>  { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}