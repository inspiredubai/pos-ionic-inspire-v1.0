import { Component } from '@angular/core';
import { LoadingServiceService } from './Shared/shared/Services/loading-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  IsLoading: BehaviorSubject<boolean> = this.loadingService.isLoadingSubject;
  constructor(public loadingService : LoadingServiceService) {}
}
