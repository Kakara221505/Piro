import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
const w = () => {
  return window;
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  get window(): any {
    return w();
  }
  token: any;
  httpOptions: any;
  httpOptionsPost: any;
  constructor(private http: HttpClient) {}
  userSignup(signupDetails: any) {
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      environment.apiUrlUser + 'user/signup',
      signupDetails,
      httpOptionsPost
    );
  }

  userSignupMeetamask(signupDetails: any) {
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      environment.apiUrlUser + 'user/metamaskSignup',
      signupDetails,
      httpOptionsPost
    );
  }

  userLogin(loginDetails: any) {
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      environment.apiUrlUser + 'user/login',
      loginDetails,
      httpOptionsPost
    );
  }

  verifyLoginOtp(loginDetails: any){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      environment.apiUrlUser + 'user/verifyLogin',
      loginDetails,
      httpOptionsPost
    );
  }
  meetamask(loginDetails: any){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      environment.apiUrlUser + 'user/connectMetamask',
      loginDetails,
      httpOptionsPost
    );
  }


  verifySignupOtp(signupDetails: any){
    const httpOptionsPost = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(
      environment.apiUrlUser + 'user/VerifySignup',
      signupDetails,
      httpOptionsPost
    );
  }

}
