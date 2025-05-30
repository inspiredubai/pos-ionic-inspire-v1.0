import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { UtilityService } from '../Services/utility.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingServiceService } from '../Services/loading-service.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoadingServiceService, private toastController: ToastController, private utilityService: UtilityService,
    private route: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: any = this.utilityService.GetAuthToken();

    if (token) {
     
      request = request.clone({
        url: environment.apiRootURL + request.url,
        setHeaders: { Authorization: `bearer ${token}` }
      });
      // alert('in')
    }
    else {
      request = request.clone({
        url: environment.apiRootURL + request.url
       
      });
    }
    this.loaderService.showLoader();
    return next.handle(request).pipe(
      map(event => {

        return event
      }),
      catchError(err => {
        if (err.status === 401) {
          this.presentUnauthorizedToast();
          localStorage.clear();
          this.route.navigate(['login']);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }
  async presentUnauthorizedToast() {
    const toast = await this.toastController.create({
      message: 'You are unauthorized to perform this action.',
      duration: 3000, // Adjust the duration as needed
      position: 'top', // Adjust the position as needed
    });

    await toast.present();
  }
}
