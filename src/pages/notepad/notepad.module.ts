import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotepadPage } from './notepad';

@NgModule({
  declarations: [
    NotepadPage,
  ],
  imports: [
    IonicPageModule.forChild(NotepadPage),
  ],
})
export class NotepadPageModule {}
