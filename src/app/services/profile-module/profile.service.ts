import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token: any;
  httpOptions: any;
  httpOptionsPost: any;
  httpOptionsPort: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('X-Custom-Token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Custom-Token': this.token
      })
    };
  }

  getAllDetails() {
    return this.http.get(environment.apiUrlUser + 'user/detail', this.httpOptions);
  }

  updateUserDetails(body:any){
    return this.http.put(environment.apiUrlUser + 'user/update/userDetail', body, this.httpOptions);
  }

  getCountryList(){
    return this.http.get(environment.apiUrlUser + 'user/get/countryList', this.httpOptions);
  }

  getRequestAccess(body:any){
    return this.http.post(environment.apiUrlUser + 'user/requestEarlyAccess', body, this.httpOptions);
  }
}
