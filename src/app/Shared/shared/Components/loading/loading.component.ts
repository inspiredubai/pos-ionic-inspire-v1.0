import { Component, OnInit } from '@angular/core';
import { LoadingServiceService } from '../../Services/loading-service.service';
 
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent  implements OnInit {

  constructor( public loadingservice : LoadingServiceService) { }

  ngOnInit() {}

}
