import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<{ token: string }> {
    console.log('[AuthService] Enviando login:', data);
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // También puedes validar expiración si quieres
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }
}