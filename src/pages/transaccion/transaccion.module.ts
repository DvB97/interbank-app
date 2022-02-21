import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransaccionPage } from './transaccion';

@NgModule({
  declarations: [
    TransaccionPage,
  ],
  imports: [
    IonicPageModule.forChild(TransaccionPage),
  ],
})
export class TransaccionPageModule {}
