import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/Domain/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseurl = environment.apiRootURL
  constructor(private route: Router, private http: HttpClient) { }

  Logout() {
    return this.http.get<ApiResponse>('Authentication/Logout')

  }
  IsLoggedUser() {
    return this.http.get<ApiResponse>('Authentication/IsLoggedUser')

  }
  ForgotPassword(email: any) {
    return this.http.get<ApiResponse>('Authentication/ForgotPassword?email='+ email)
  }
  ResetPassword(data: any) {
    return this.http.post<ApiResponse>('Authentication/ResetPassword?', data)
  }
  Login(model: any) {
    return this.http.post<ApiResponse>('Authentication/Login', model)
  }
  GetUserMenus(id:number) {
    return this.http.get<ApiResponse>('Authentication/GetUserMenus?id='+id)
  }
  GetCurrentUserAccess(entity: string) {
    return this.http.get<ApiResponse>('Authentication/GetUserMenus?entity=' + entity)
  }
}
