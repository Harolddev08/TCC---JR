import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';

import { TaskComponent } from './task.component';
import { TareaFilterPipe } from '../pipes/tarea-filter.pipe'; // ✅

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskComponent,
    TareaFilterPipe // ✅ importar aquí porque es standalone
  ],
  exports: [
    TaskComponent,
    TareaFilterPipe // ✅ si lo vas a usar fuera
  ],
  providers: [
    {
      provide: MAT_ICON_DEFAULT_OPTIONS,
      useValue: { fontSet: 'material-symbols-outlined' }
    }
  ]
})
export class TaskModule {}