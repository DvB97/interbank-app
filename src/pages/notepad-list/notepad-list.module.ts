import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotepadListPage } from './notepad-list';

@NgModule({
  declarations: [
    NotepadListPage,
  ],
  imports: [
    IonicPageModule.forChild(NotepadListPage),
  ],
})
export class NotepadListPageModule {}
