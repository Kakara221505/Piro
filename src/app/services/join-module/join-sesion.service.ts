import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class JoinSesionService {
  token: any;
  httpOptions: any;
  httpOptionsPost: any;
  httpOptionsPort: any;
  httpOptionsWithoutToken: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('X-Custom-Token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Custom-Token': this.token
      })
    };
    this.httpOptionsWithoutToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  joinByAccess(body: any) {
    return this.http.post(environment.apiUrlEvent + 'user/events/joinNow/openAcess/whenUserLoggedIn', body, this.httpOptions);
  }

  joinByPassword(body: any) {
    return this.http.post(
      environment.apiUrlEvent + 'user/events/joinNow/passwordProtectedAcess/userLoggedIn',
      body,
      this.httpOptions
    );
  }

  joinByOtp(body: any) {
    return this.http.post(environment.apiUrlEvent + 'user/events/validateOtp/EmailAndOtpBased', body, this.httpOptions);
  }

  joinByEmailOtp(body: any) {
    return this.http.post(environment.apiUrlEvent + 'user/events/verifyEmail/EmailAndOtpBased', body, this.httpOptions);
  }

  joinByEmailVerify(body: any) {
    return this.http.post(environment.apiUrlEvent + 'user/events/validateOtp/EmailAndOtpBased', body, this.httpOptions);
  }

  joinWithoutEmailOtp(eventIdentifier: any, body: any) {
    return this.http.post(
      environment.apiUrlEvent + `user/events/joinNow/emailandotp/whenUserLoggedIn/${eventIdentifier}`,
      body,
      this.httpOptions
    );
  }

  nftLogin(eventIdentifier: any, body: any) {
    return this.http.post(
      environment.apiUrlEvent + `user/events/joinNow/nftBased/whenUserLoggedIn/${eventIdentifier}`,
      body,
      this.httpOptions
    );
  }

  nftNotLogin(eventIdentifier: any, signature:any ,body: any) {
    return this.http.post(
      environment.apiUrlEvent + `user/events/joinNow/nftBased/whenUserWithoutLoggedIn/${eventIdentifier}?signature=${signature}`,
      body,
      this.httpOptionsWithoutToken
    );
  }

  joinByRegistrationBased(body: any) {
    return this.http.post(
      environment.apiUrlEvent + 'user/events/joinNow/registrationBased/whenUserLoggedIn',
      body,
      this.httpOptions
    );
  }

  getEventsList(parameter: string, pageNo: number, pageSize: number) {
    return this.http.get(
      environment.apiUrlEvent + `user/events/myEvents?parameter=${parameter}&pageNo=${pageNo}&pageSize=${pageSize}`,
      this.httpOptions
    );
  }

  getIdentifierWhenLogin(eventIdentifier: string) {
    return this.http.get(
      environment.apiUrlEvent + `user/events/get/AcessTypeByIdentifier/WhenUserLoggedIn/${eventIdentifier}`,
      this.httpOptions
    );
  }

  getIdentifierWhenNotLogin(eventIdentifier: string) {
    return this.http.get(
      environment.apiUrlEvent + `user/events/get/AcessTypeByIdentifier/WhenUserNotLoggedIn/${eventIdentifier}`,
      this.httpOptionsWithoutToken
    );
  }

  //when user not login
  notLoginSavePassword(body: any) {
    return this.http.post(
      environment.apiUrlEvent + `user/events/joinNow/passwordProtectedAcess/userNotLoggedIn`,
      body,
      this.httpOptionsWithoutToken
    );
  }

  meetamask1(body: any){
    return this.http.post(
      environment.apiUrlUser + 'user/connectMetamaskSpaceJoining',
      body,
      this.httpOptions
    );
  }

  meetamask(body: any){
    return this.http.post(
      environment.apiUrlUser + 'user/connectMetamaskAfterLogin',
      body,
      this.httpOptions
    );
  }

  //NOT LOGGED IN OPEN ACCESS
  notLoginOpenAccess(body: any) {
    return this.http.post(
      environment.apiUrlEvent + `user/events/joinNow/openAcess/whenUserNotLoggedIn`,
      body,
      this.httpOptionsWithoutToken
    );
  }

  //NOT LOGGED IN Required EMAIL ACCESS
  notLoginAskEmail(body: any) {
    return this.http.post(
      environment.apiUrlEvent + `user/events/joinNow/emailandotp/whenUserNotLoggedIn`,
      body,
      this.httpOptionsWithoutToken
    );
  }

  joinByEmailVerifyNotLogin(body: any) {
    return this.http.post(
      environment.apiUrlEvent + 'user/events/validateOtp/EmailAndOtpBased',
      body,
      this.httpOptionsWithoutToken
    );
  }
}
