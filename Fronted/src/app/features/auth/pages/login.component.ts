import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { finalize } from 'rxjs/operators'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      correo: ['', [Validators.required]],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit() {
    alert('¡Entró al submit!');
    if (this.form.invalid) return;

    this.loading = true; 
  
    const { correo, contrasena } = this.form.value;
    console.log('Datos del formulario:', correo, contrasena); // 🔥 VERIFICA ESTO
  
    this.authService.login({
      username: correo,
      password: contrasena
    })
    .pipe(finalize(() => (this.loading = false))) 
    .subscribe({
      next: (res: any) => {
        console.log('✅ Token recibido:', res.token); // 💡 VERIFICA SI ENTRA AQUÍ
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tareas']);
      },
      error: (err) => {
        console.error('❌ Error en login:', err); // 💡 VERIFICA SI ENTRA AQUÍ
        alert('Credenciales incorrectas');
      }
    });
  }
}