import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {API_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  #http = inject(HttpClient)

  constructor() { }

  get<T>(url: string) {
    return this.#http.get<T>(API_URL + url);
  }

  post<T>(url: string, data: any) {
    return this.#http.post<T>(API_URL + url, data);
  }

  put(url: string, data: any) {
    return this.#http.put(API_URL + url, data);
  }

  delete<T>(url: string) {
    return this.#http.delete<T>(API_URL + url);
  }

  patch<T>(url: string, data: any) {
    return this.#http.patch<T>(API_URL + url, data);
  }
}
