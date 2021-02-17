import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public mainlink = 'http://127.0.0.1:8000/api/rooms-and-bookings/booking';
  private _registerUrl ='http://127.0.0.1:8000/api/auth/register';
  private _loginUrl ='http://127.0.0.1:8000/api/auth/login';
  private _bookurl=this.mainlink ;
  private _getcapacityurl="http://127.0.0.1:8000/api/rooms-and-bookings/capacity/";
  private getcapacityurlf;
  private getallroomsurl="http://127.0.0.1:8000/api/rooms/allrooms/";

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  capacity(user){
    this.getcapacityurlf = this._getcapacityurl+user;
    return this.http.get<any>(this.getcapacityurlf);
  }


  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('CurrentUserID');
    localStorage.removeItem('CurrentUserPageID');

    this._router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  loggedIn() {
    return !!localStorage.getItem('accessToken');
  } 
  bookings(user){
    return this.http.post<any>(this._bookurl, user);
  }
  getallrooms(){

    return this.http.get<any>(this.getallroomsurl);

  }
}
