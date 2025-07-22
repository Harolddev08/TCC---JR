/* ==============================================================
   DashboardComponent – versión extendida con estadísticas extra
   ============================================================== */
   import { Component, OnInit }        from '@angular/core';
   import { CommonModule }             from '@angular/common';
   import { TareaService, Tarea }      from '../../tasks/services/tarea.service';
   
   import { MatCardModule }            from '@angular/material/card';
   import { MatProgressBarModule }     from '@angular/material/progress-bar';
   import { MatIconModule }            from '@angular/material/icon';
   import { MatDividerModule }         from '@angular/material/divider';
   
   interface Stats {
     total:       number;
     completas:   number;
     pendientes:  number;
     alta:        number;
     media:       number;
     baja:        number;
   }
   
   @Component({
     standalone : true,
     selector   : 'app-dashboard',
     templateUrl: './dashboard.component.html',
     styleUrls  : ['./dashboard.component.css'],
     imports: [
       CommonModule,
       /* Material */
       MatCardModule,
       MatProgressBarModule,
       MatIconModule,
       MatDividerModule
     ],
   })
   export class DashboardComponent implements OnInit {
   
     stats: Stats = {
       total: 0, completas: 0, pendientes: 0,
       alta: 0, media: 0, baja: 0
     };
   
     /* % auxiliares para las barras */
     get pctCompletas() { return this.percent(this.stats.completas); }
     get pctPendientes(){ return this.percent(this.stats.pendientes);}
     get pctAlta()      { return this.percent(this.stats.alta);      }
     get pctMedia()     { return this.percent(this.stats.media);     }
     get pctBaja()      { return this.percent(this.stats.baja);      }
   
     constructor(private tareaSrv: TareaService) {}
   
     ngOnInit(): void {
       this.tareaSrv.listar().subscribe(t => this.computeStats(t));
     }
   
     /* ---------- helpers ---------- */
   
     private computeStats(tareas: Tarea[]) {
       const s: Stats = {
         total      : tareas.length,
         completas  : tareas.filter(t =>  t.completada).length,
         pendientes : tareas.filter(t => !t.completada).length,
         alta       : tareas.filter(t => t.prioridad === 'ALTA').length,
         media      : tareas.filter(t => t.prioridad === 'MEDIA').length,
         baja       : tareas.filter(t => t.prioridad === 'BAJA').length,
       };
       this.stats = s;
     }
   
     private percent(valor: number): number {
       return this.stats.total ? Math.round((valor * 100) / this.stats.total) : 0;
     }
   }