import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/Domain/api-response';
import { DashboardService } from 'src/app/Shared/shared/Services/dashboard.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss'],
})
export class OutletComponent  implements OnInit {

  outlets:any[]=[];
  
    constructor(private dashboardService:DashboardService) { }
  
    ngOnInit(): void {
      this.GetOutlets()
    }
    GetOutlets() {
      
      this.dashboardService.GetOutlets().subscribe((response: ApiResponse) => {
        if (response.IsSuccess && response.ReturnObject.length > 0) {
          this.outlets = response.ReturnObject;
        }
      })
    }

}
