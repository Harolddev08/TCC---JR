import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({

  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LoginComponent,
  ]
})
export class AuthModule {}