import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tareas',
    loadChildren: () =>
      import('./features/tasks/tasks.routes').then(m => m.TASKS_ROUTES),
    canActivate: [authGuard], // Protege la ruta
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'tareas',
    pathMatch: 'full',
  },
];