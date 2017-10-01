import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthGuardLogin } from './auth-guard-login.service';
import { AuthGuardAdmin } from './auth-guard-admin.service';
import { HttpModule } from '@angular/http';

@NgModule ({
  imports: [HttpModule],
  providers: [
    AuthService,
    UserService,
    AuthGuardLogin,
    AuthGuardAdmin
  ]
})

export class ServicesModule {

}