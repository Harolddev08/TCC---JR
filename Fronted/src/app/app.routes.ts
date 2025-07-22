import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  /* 1️⃣  layout raíz (fondo + tarjeta flotante)  */
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component')
        .then(m => m.ShellComponent),          // ⬅️ solo contiene <router-outlet/>

    /* 2️⃣  todo lo demás se muestra DENTRO de la “card” */
    children: [

      /* ---------- públicas ---------- */
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login.component')
            .then(m => m.LoginComponent),
      },

      /* ---------- protegidas ---------- */
      {
        path: 'tareas',
        loadChildren: () =>
          import('./features/tasks/tasks.routes')
            .then(m => m.TASKS_ROUTES),
        canActivate: [authGuard],
      },
      {
        path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module')   // ruta a tu módulo
        .then(m => m.DashboardModule)
  },

      /* ---------- redirección ---------- */
      { path: '', redirectTo: 'tareas', pathMatch: 'full' },
    ],
  },

  /* 3️⃣  wildcard por si escriben algo inexistente */
  { path: '**', redirectTo: '' },
];