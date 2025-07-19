import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [CommonModule, FormsModule, TaskComponent],
  exports: [TaskComponent]          // para poder usarlo en el router u otros módulos
})
export class TaskModule {}