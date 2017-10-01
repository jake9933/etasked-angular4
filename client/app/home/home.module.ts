import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServicesModule } from '../services/services.module';

import { HomeComponent } from './home.component'; 
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarLeftComponent } from '../shared/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from '../shared/sidebar-right/sidebar-right.component';
import { ChatboxComponent } from '../shared/chatbox/chatbox.component';

@NgModule({
  declarations:[
    HomeComponent,
    HeaderComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    ChatboxComponent
  ],
  imports: [
    RouterModule,
    ServicesModule
  ]
})
export class HomeModule {
  
}