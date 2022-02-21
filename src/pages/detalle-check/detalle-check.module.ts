import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleCheckPage } from './detalle-check';

@NgModule({
  declarations: [
    DetalleCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleCheckPage),
  ],
})
export class DetalleCheckPageModule {}
