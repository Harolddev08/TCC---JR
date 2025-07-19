import { Routes } from '@angular/router';
import { TaskComponent } from './features/tasks/pages/task.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' }, // Redirección por defecto
  { path: 'tareas', component: TaskComponent },
];