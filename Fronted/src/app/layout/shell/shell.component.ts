// src/app/layout/shell/shell.component.ts
import { Component }       from '@angular/core';
import { Router, NavigationEnd,
         RouterModule,
         RouterOutlet }    from '@angular/router';
import { filter }          from 'rxjs/operators';

import { NgClass }         from '@angular/common';          // 👈  AQUÍ
import { MatIconModule }   from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule }from '@angular/material/tooltip';

import { AuthService }     from '../..//features/auth/services/auth.service';

@Component({
  standalone : true,
  selector   : 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls  : ['./shell.component.css'],
  imports    : [
    /* Angular */
    RouterModule, RouterOutlet,
    NgClass,                     // 👈  y la añades al array
    /* Material */
    MatIconModule, MatButtonModule, MatTooltipModule
  ],
})
export class ShellComponent {
  isDashboard = false;

  constructor(private router: Router,
              private auth  : AuthService) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) =>
      this.isDashboard = e.urlAfterRedirects.startsWith('/dashboard')
    );
  }

  logout() {
    this.auth.cerrarSesion();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}