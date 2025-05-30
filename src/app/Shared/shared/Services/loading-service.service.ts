import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  public isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoader() {
      this.isLoadingSubject.next(true);

  }

  hideLoader() {

      this.isLoadingSubject.next(false);
    
  }
}
 
