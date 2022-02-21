import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialPermisosPage } from './historial-permisos';

@NgModule({
  declarations: [
    HistorialPermisosPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialPermisosPage),
  ],
})
export class HistorialPermisosPageModule {}
