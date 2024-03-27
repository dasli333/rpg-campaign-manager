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

  post(url: string, data: any) {
    return this.#http.post(url, data);
  }

  put(url: string, data: any) {
    return this.#http.put(url, data);
  }

  delete(url: string) {
    return this.#http.delete(url);
  }

  patch(url: string, data: any) {
    return this.#http.patch(url, data);
  }
}
