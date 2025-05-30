import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/Domain/api-response';
import { DashboardService } from 'src/app/Shared/shared/Services/dashboard.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  showLoader: boolean = true;
  data: any;
  options: any;
  chart: any;
  detail = [
    { CashAmount: 'any', CreditCardAmount: 'exp', SalesAmount: 2021, SummaryDateString: "12-02-2018" },
    { CashAmount: 'any', CreditCardAmount: 'exp', SalesAmount: 2022, SummaryDateString: "12-02-2018" },
    // Add more data as needed
  ];
  groupSummary: any[] = [];
  itemSummary: any[] = [];
  dailySummary: any[] = [];
  todayStatus: any[] = [];
  todayTotal: number = 0;
  constructor(private dashboardService: DashboardService,private route: ActivatedRoute,
    private router: Router) { }
  CreateChart(type: string, id: string,outletId:number) {
    var oilCanvas: any = document.getElementById(id);

    var oilData = {
      labels: [
        "Saudi Arabia",
        "Russia",
        "Iraq",
        "United Arab Emirates",
        "Canada"
      ],
      datasets: [
        {
          data: [133.3, 86.2, 52.2, 51.2, 50.2],
          backgroundColor: [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF"
          ]
        }]
    };
    this.showLoader = true;
    this.dashboardService.GetChartsByType(type,outletId).subscribe((response: ApiResponse) => {
      this.showLoader = false;
      if (response.IsSuccess && response.ReturnObject != null) {
        oilData = response.ReturnObject;
      }
      var pieChart = new Chart(oilCanvas, {
        type: type == "pie" ? "pie" : "line",
        data: oilData
      });
    })
  }
  ngOnInit(): void {
    
    this.route.queryParams
    .subscribe((params:any) => {
      // let id=params.outletId
      let id=1;
      if(id){
        this.CreateChart("pie", "oilChart",id);

        this.CreateChart("line", "lineChart",id);
        this.GetGroupSummary(id);
        this.GetTodayStatus(id);
        this.GetDailySummaryByDate(id);
      }
    }
  );

  }
  

  GetDailySummaryByDate(outletId:number) {
    this.dashboardService.GetDailySummaryByDate(outletId).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.detail = response.ReturnObject;
        this.CalculateTodayTotal(this.dailySummary);
      }
    })
  }
  CalculateTodayTotal(data: any[]) {
    data.forEach((x) => {
      this.todayTotal += x.CashAmount;
    })
  }

  GetGroupSummary(outletId:number) {
    this.dashboardService.GetGroupSummary(outletId).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.itemSummary = response.ReturnObject;
      }
    })
  }
  
  GetTodayStatus(outletId:number) {
    this.dashboardService.GetTodayStatus(outletId).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.todayStatus = response.ReturnObject;
      }
    })
  }
  
  RoutePage(pathName: string) {
    this.router.navigate([pathName])
  }


  navigate(path:string){
    this.router.navigateByUrl(path);
  }
  
  
}
