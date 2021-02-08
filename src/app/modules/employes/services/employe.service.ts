import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  url: string = 'https://procom-interview-employee-test.azurewebsites.net';
  
  constructor(
    private http: HttpClient
  ) { }

  public get(id: string) {
    return this.http.get(`${this.url}/Employee/${id}`)
  }

  public list() {
  }

  public delete(id: string) {
  }

  public edit(form: any) {
    return this.http.put(`${this.url}/Employee/${form.id}`, form);
  }

  public create(form: any) {
    console.log(this.url);
    return this.http.post(`${this.url}/Employee`, form);
  }
}
