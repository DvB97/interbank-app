import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchAgentPage } from './search-agent';

@NgModule({
  declarations: [
    SearchAgentPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchAgentPage),
  ],
})
export class SearchAgentPageModule {}
