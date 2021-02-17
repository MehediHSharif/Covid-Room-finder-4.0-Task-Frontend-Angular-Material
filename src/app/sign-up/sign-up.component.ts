import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerUserData = {
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: 'This',
  };
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      (res) => {
        this._router.navigate(['/login']);
        console.log(res);
        console.log(true);
      },
      (err) => console.log(err)
    );
  }
}
