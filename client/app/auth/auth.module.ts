import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesModule } from '../services/services.module';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    ServicesModule
  ]
})
export class AuthModule {}