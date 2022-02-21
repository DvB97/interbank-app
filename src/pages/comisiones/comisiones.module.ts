import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComisionesPage } from './comisiones';

@NgModule({
  declarations: [
    ComisionesPage,
  ],
  imports: [
    IonicPageModule.forChild(ComisionesPage),
  ],
})
export class ComisionesPageModule {}
