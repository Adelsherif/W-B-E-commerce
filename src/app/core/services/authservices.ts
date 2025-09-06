import { Logininterface } from './../interfaces/logininterface';
import { Authinterface } from './../interfaces/authinterface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseurl } from '../apiroute/baseurl';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Authservices {

  constructor (private _httpclient: HttpClient){}


  register(authinterface: Authinterface) : Observable<any>{

    return this._httpclient.post(`${baseurl}/api/v1/auth/signup`,authinterface)
  }

  login(logininterface :Logininterface ): Observable<any>{
     return this._httpclient.post(`${baseurl}/api/v1/auth/signin`, logininterface)
  }
  authorize() :boolean{
    if(localStorage.getItem('token')){
      return true
    } else {
      return false
    }
  }
}
