import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { Element } from '../_interfaces/element';

const API_URL = 'http://127.0.0.1:3000/api/v1/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getheader() {
    const dataData = this.storageService.getUser();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${dataData.token}`
      }),
    };
  }



  async createForm(name: string, status: string, action: string, method: string, isEncrypt: boolean = false, fileds?: [Element]): Promise<Observable<any>> {
    const httpOptions = this.getheader();
    console.log(httpOptions);
    return this.http.post(
      API_URL,
      {
        name,
        status,
        action,
        method,
        isEncrypt,
        fileds,

      },
      httpOptions
    );
  }

  async updateForm(id: string, status?: string, action?: string, method?: string, isEncrypt: boolean = false, fields?: [Element]): Promise<Observable<any>> {
    return this.http.put(
      API_URL + `/${id}`,
      {
        status,
        action,
        method,
        isEncrypt,
        fields,
      },
      this.getheader()
    );
  }

  async deleteForm(id: string) {
    return this.http.delete(
      API_URL + `/${id}`, this.getheader());
  }

  async getForms(start: number = 0, size: number = 15): Promise<Observable<any>> {

    return this.http.get(
      API_URL + `/all?start=${start}&size=${size}`, this.getheader());
  } 

  async getFormById(id: string): Promise<Observable<any>> {

    return this.http.get(
      API_URL + `/${id}`, this.getheader());
  }

  async saveForm(formId: string, data: any): Promise<Observable<any>> {
    return this.http.post(
      API_URL + '/save',
      {
        formId,
        data,
      },
      this.getheader(),
    )
  }
}
