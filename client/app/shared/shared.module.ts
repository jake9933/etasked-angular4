import { NgModule } from '@angular/core';

import { ServicesModule } from '../services/services.module';
import { HeaderComponent } from './header/header.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

@NgModule ({
  declarations:[
    HeaderComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    ChatboxComponent
  ],
  imports: [ ServicesModule ]
})

export class SharedModule {

}