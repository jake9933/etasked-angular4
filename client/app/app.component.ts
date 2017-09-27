import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor (private http: HttpClient) {
    //
  }

  doLogin () {debugger;
  	this.http.post('/api/auth/login', {username: 'sample@user.com', hashed_password: 'password'}).subscribe(data => {
      debugger;
    }, err => {
      debugger;
    });
  	return false;
  }
}
