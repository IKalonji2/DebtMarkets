import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';
import { UserRegistration } from '../../models/user-registration';
import { UserLogin } from '../../models/user-login';
import { AuthResponse } from '../../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {
  URL: string = environment.AUTH_URL;

  constructor(
    private http: HttpClient,
  ) { }

  createUser(payload: UserRegistration){
    let route: string = "/auth/register";
    return this.http.post<AuthResponse>(this.URL+route,payload);
  }
  loginUser(payload: UserLogin){
    let route: string = "/auth/login";
    return this.http.post<AuthResponse>(this.URL+route,payload);
  }

}
