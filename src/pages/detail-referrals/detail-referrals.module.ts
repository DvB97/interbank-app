import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailReferralsPage } from './detail-referrals';

@NgModule({
  declarations: [
    DetailReferralsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailReferralsPage),
  ],
})
export class DetailReferralsPageModule {}
