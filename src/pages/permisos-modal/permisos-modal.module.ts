import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PermisosModalPage } from './permisos-modal';

@NgModule({
  declarations: [
    PermisosModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PermisosModalPage),
  ],
})
export class PermisosModalPageModule {}
