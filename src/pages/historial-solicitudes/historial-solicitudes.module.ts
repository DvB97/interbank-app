import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialSolicitudesPage } from './historial-solicitudes';

@NgModule({
  declarations: [
    HistorialSolicitudesPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialSolicitudesPage),
  ],
})
export class HistorialSolicitudesPageModule {}
