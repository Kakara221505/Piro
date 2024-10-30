import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookDemoService {
  httpOptions: any;
  httpOptionsPost: any;
  constructor(private http: HttpClient) {}

  submitBookDemo(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.apiUrlUser + 'feedback/demo', body, httpOptions);
  }
}
