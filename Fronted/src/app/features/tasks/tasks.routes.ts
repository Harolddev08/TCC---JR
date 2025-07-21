import { Routes } from '@angular/router';
import { TaskComponent } from './pages/task.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TaskComponent,
  },
];