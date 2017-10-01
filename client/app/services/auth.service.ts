import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  user = {};

  constructor (private userService: UserService, private router: Router) {
    this.userService.auth().map(res=>res.json()).subscribe(res => {
      console.log(res);
      this.setCurrentUser(res.user);
    }, err => {
      console.log(err);
      this.router.navigate(['/auth']);
    });
  }

  login(usernameAndPassword) {
    return this.userService.login(usernameAndPassword).map(res => res.json()).map( res => {
      this.setCurrentUser(res.user);
      return this.loggedIn;
    });
  }

  signup(user) {
    return this.userService.signup(user).map(res => res.json()).map(res => {
      this.setCurrentUser(res.user);
      return this.loggedIn;
    })
  }

  logout() {
    return this.userService.logout().map(res => {
      this.loggedIn = false;
      this.isAdmin = false;
      this.user = {};
      this.router.navigate(['/auth']);
    });
  }

  setCurrentUser(user) {
    console.log(user);
    this.user = user;
    this.loggedIn = true;
    user.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
  }
}