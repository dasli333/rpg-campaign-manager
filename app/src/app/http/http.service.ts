import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  #http = inject(HttpClient)

  constructor() { }

  get<T>(url: string) {
    return this.#http.get<T>(url);
  }

  post<T>(url: string, data: any) {
    return this.#http.post<T>(url, data);
  }

  put(url: string, data: any) {
    return this.#http.put(url, data);
  }

  delete<T>(url: string) {
    return this.#http.delete<T>(url);
  }

  patch<T>(url: string, data: any) {
    return this.#http.patch<T>(url, data);
  }
}
