import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from './endpoint.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  constructor(private http: HttpClient, private path: EndpointService) { }
  private _path =  this.path.url +  "users/";
  signUp(user) {
     console.log("user",user) 
  return this.http.post<any>(this._path, user);
  }
  signIn(user) {
    console.log("user",user) 
 return this.http.post<any>(this._path +"signIn/", user);
 }
}
