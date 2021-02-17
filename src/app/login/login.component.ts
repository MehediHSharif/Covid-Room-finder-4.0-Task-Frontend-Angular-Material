import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;
  auth2: any;
  t;

  loginUserData = { username: '', password: '' };
  userL;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
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
          localStorage.setItem('CurrentUserPageID', this.userL.pageID);
        }
        console.log(this.userL);
        // ---------------------------------------------------------------Token Decoder ends----------------------------------------------------------------------------
      },
      (err) => console.log(err)
    );
  }
}
