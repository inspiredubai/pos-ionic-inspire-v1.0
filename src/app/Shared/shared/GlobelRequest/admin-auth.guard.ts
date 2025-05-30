import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';
import { UtilityService } from '../Services/utility.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private route: Router,
     private utilityService: UtilityService,
     private toastController: ToastController,
     private authService: AuthenticationService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.utilityService.GetAuthToken();
    let role = this.utilityService.GetUserRole();
  
    if (token && role) {
      return true;
    }
  
    this.presentUnauthorizedAlert(state.url);
    return false;
  }
  
  async presentUnauthorizedAlert(returnUrl: string) {
    const toast = await this.toastController.create({
      message: 'You are unauthorized.',
      duration: 3000, // Toast duration in milliseconds (adjust as needed)
      position: 'top', // Position of the toast (adjust as needed)
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.authService.Logout();
            localStorage.clear();
            this.route.navigate(['auth/login']);
          }
        }
      ]
    });
  
    await toast.present();
  }
  
  
  
}
