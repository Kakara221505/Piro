import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExploreServicesService {
  token: any;
  httpOptions: any;
  httpOptionsPost: any;
  httpOptionsPort: any;
  httpOptionsToken: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('X-Custom-Token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Custom-Token': this.token
      })
    };
  }

  getAllExplores(pageNo: number, pageSize: number, parameter: string) {
    return this.http.get(
      environment.apiUrlEvent + `events/exploreEventsByParameters?pageNo=${pageNo}&pageSize=${pageSize}&parameter=${parameter}`,
      this.httpOptions
    );
  }

  savePasswords(body: any) {
    return this.http.post(environment.apiUrlEvent + `user/events/registerNowEventPasswordBasedAcess`, body, this.httpOptions);
  }

  registerOpenAccess(body: any) {
    this.httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Custom-Token': this.token
      })
    };
    return this.http.post(environment.apiUrlEvent + `user/events/requestEventAcess`, body, this.httpOptionsToken);
  }

  registerPasswordAccess(eventId: number, password: any) {
    return this.http.post(
      environment.apiUrlEvent + `user/events/registerNowEventPasswordBasedAcess?eventId=${eventId}&password=${password}`,
      this.httpOptions
    );
  }

  exploreFilter(body: any, pageNo :number, pageSize :number) {
    return this.http.post(environment.apiUrlEvent + `events/exploreEventBySearchAndFilter?pageNo=${pageNo}&pageSize=${pageSize}`, body, this.httpOptions);
  }

  getRegisterData(eventId:any){
    return this.http.get(
      environment.apiUrlEvent + `user/events/get/UserRegistrationDetailsForEvent/${eventId}`,
      this.httpOptions
    );
  }
}
