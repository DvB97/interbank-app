import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPushPage } from './chat-push';

@NgModule({
  declarations: [
    ChatPushPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPushPage),
  ],
})
export class ChatPushPageModule {}
