import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepmapPage } from './stepmap';

@NgModule({
  declarations: [
    StepmapPage,
  ],
  imports: [
    IonicPageModule.forChild(StepmapPage),
  ],
})
export class StepmapPageModule {}
