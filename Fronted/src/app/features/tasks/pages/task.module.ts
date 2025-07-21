import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { TaskComponent } from './task.component';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, FormsModule, TaskComponent],
  exports: [TaskComponent]  ,  
  providers: [
    {
      provide : MAT_ICON_DEFAULT_OPTIONS,
      useValue: { fontSet: 'material-symbols-outlined' }   // 👈
    }
  ]      // para poder usarlo en el router u otros módulos
})
export class TaskModule {}