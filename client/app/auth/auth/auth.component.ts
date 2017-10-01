import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  signup = {
    role:"",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    birthday: ""
  }

  login = {
    username: "",
    password: ""
  }

  doLogin = () => {
    this.auth.login(this.login).subscribe(
      res => this.router.navigate(['/']),
      err => console.log(err)
    );
  }

  doSignup = () => {
    this.auth.signup(this.signup).subscribe(
      res => this.router.navigate(['/']),
      err => console.log(err)
    )
  }

  constructor (private auth: AuthService, private router: Router) {

  }
}