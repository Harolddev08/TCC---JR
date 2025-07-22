import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';

import dashboardRoutes   from './dashboard.routes';
import { DashboardComponent } from './pages/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),

    // 👉 se **importa** porque es stand-alone; NO va en declarations
    DashboardComponent
  ]
})
export class DashboardModule {}