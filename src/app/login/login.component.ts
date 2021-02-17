import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  t;
  userL;
  hide = true;
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,30}'
          ),
        ],
      ],
    });
  }
  get f() {
    return this.formGroup.controls;
  }

  loginUser(data) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    } else {
      this.submitted = false;
      console.log(data);
      this._auth.loginUser(data).subscribe(
        (res) => {
          localStorage.setItem('accessToken', res.token);
          console.log(res);
          this._router.navigate(['/booking']);

          // ---------------------------------------------------------------Token Decoder----------------------------------------------------------------------------

          function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
              case 0:
                break;
              case 2:
                output += '==';
                break;
              case 3:
                output += '=';
                break;
              default:
                throw 'Illegal base64url string!';
            }
            return window.atob(output);
          }

          var token = localStorage.getItem('accessToken');
          if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            this.userL = JSON.parse(urlBase64Decode(encoded));
            localStorage.setItem('CurrentUserID', this.userL.DimeruID);
          }
          console.log(this.userL);
          // ---------------------------------------------------------------Token Decoder ends----------------------------------------------------------------------------
        },
        (err) => console.log(err)
      );
    }
  }
}
