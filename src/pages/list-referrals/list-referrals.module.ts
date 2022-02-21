import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListReferralsPage } from './list-referrals';

@NgModule({
  declarations: [
    ListReferralsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListReferralsPage),
  ],
})
export class ListReferralsPageModule {}
