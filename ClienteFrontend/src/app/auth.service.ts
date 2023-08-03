import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from './interfaces/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://localhost:7120/api/Users/'

  constructor(
    private http: HttpClient
  ) { }

  register(user: UserInterface) {
    return this.http.post(this.baseUrl + 'Register', user)
  }

  login(user: UserInterface) {
    return this.http.post(this.baseUrl + 'Login', user)
  }
  
}
