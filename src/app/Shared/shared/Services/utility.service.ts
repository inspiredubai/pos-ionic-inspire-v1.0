import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private route: Router, private http: HttpClient,private router: Router) { }

  GetAuthToken() {
    return localStorage.getItem('userToken')
  }
  SetLoginData(authData: any) {
    
    localStorage.setItem('userId', authData?.Id);
    localStorage.setItem('userName', authData?.Name + ' ' + authData.FatherName);
    localStorage.setItem('userEmail', authData?.Email);
    localStorage.setItem('userToken', authData?.Token);
    localStorage.setItem('userRole', authData?.Role);
  }
  GetUserId() {
    return localStorage.getItem('userId')
  }
  GetUserName() {
    return localStorage.getItem('userName')
  }
  GetUserEmail() {
    return localStorage.getItem('userEmail')
  }
  GetUserRole() {
    return localStorage.getItem('userRole')
  }

}
