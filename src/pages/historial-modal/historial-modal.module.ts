import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialModalPage } from './historial-modal';

@NgModule({
  declarations: [
    HistorialModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialModalPage),
  ],
})
export class HistorialModalPageModule {}
