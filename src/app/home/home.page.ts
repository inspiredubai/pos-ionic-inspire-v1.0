import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { ApiResponse } from '../Domain/api-response';
import { DashboardService } from '../Shared/shared/Services/dashboard.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  showLoader: boolean = true;
  data: any;
  options: any;
  chart: any;
  detail: any[] = [];
  groupSummary: any[] = [];
  itemSummary: any[] = [];
  dailySummary: any[] = [];
  todayStatus: any[] = [];
  todayTotal: number = 0;
  traction: any[] = [];
  constructor(private dashboardService: DashboardService, private route: ActivatedRoute,
    private router: Router) { }

  public linechart: any;
  public pieChart: any;

  ngOnInit(): void {

    this.route.queryParams
      .subscribe((params: any) => {
        let id = params.outletId
        // let id=1;
        if (id) {
          this.createChartPie("pie", "pieChart", id);

          this.createChartLine("line", "lineChart", id);
          this.GetGroupSummary(id);
          this.GetTodayStatus(id);
          this.GetTraction(id);
          this.GetDailySummaryByDate(id);
        }
      }
      );

  }


  createChartLine(type: string, id: string, outletId: number) {
    const ctx = document.getElementById(id) as HTMLCanvasElement;

    this.dashboardService.GetChartsByType(type, outletId).subscribe((response: ApiResponse) => {
      this.showLoader = false;
      if (response.IsSuccess && response.ReturnObject != null) {
        // Assuming apiData has the same structure as your ReturnObject
        this.data = {
          labels: response.ReturnObject.labels,
          datasets: [
            {
              data: response.ReturnObject.datasets[0].data,
              backgroundColor: response.ReturnObject.datasets[0].backgroundColor,
              fill: false, // Specify this to create a line chart without filling the area under the line
            },
          ],
        };

        if (this.linechart) {
          this.linechart.data = this.data;
          this.linechart.update();
        } else {
          this.linechart = new Chart(ctx, {
            type: 'line',
            data: this.data,
            options: {
              // Add any additional options here
            },
          });
        }
      }
    });
  }

  createChartPie(type: string, id: string, outletId: number) {
    const ctx = document.getElementById(id) as HTMLCanvasElement;

    if (!ctx) {
      console.error(`Canvas element with id "${id}" not found.`);
      return;
    }

    this.dashboardService.GetChartsByType(type, outletId).subscribe((response: ApiResponse) => {
      this.showLoader = false;
      if (response.IsSuccess && response.ReturnObject != null) {
        // Assuming apiData has the same structure as your ReturnObject
        this.data = {
          labels: response.ReturnObject.labels,
          datasets: [
            {
              data: response.ReturnObject.datasets[0].data,
              backgroundColor: response.ReturnObject.datasets[0].backgroundColor,
            },
          ],
        };

        if (this.pieChart) {
          // If the chart already exists, update its data
          this.pieChart.data = this.data;
          this.pieChart.update();
        } else {
          // If the chart doesn't exist, create a new pie chart
          this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: this.data,
          });
        }
      }
    });
  }

  GetDailySummaryByDate(outletId: number) {
    this.detail = []
    this.dashboardService.GetDailySummaryByDate(outletId).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.detail = response.ReturnObject;
        console.log('detail', this.detail)
        this.CalculateTodayTotal(this.detail);
      }
    })
  }
  CalculateTodayTotal(data: any[]) {
    this.todayTotal = 0;
    data.forEach((x) => {
      this.todayTotal += x.SalesAmount;
    })
  }

  GetGroupSummary(outletId: number) {
    this.itemSummary = []
    this.dashboardService.GetGroupSummary(outletId).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.itemSummary = response.ReturnObject;
      }
    })
  }

  GetTraction(outletId: number) {
    this.traction = []
    this.dashboardService.GetTraction(outletId).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.traction = response.ReturnObject;
      }
    })
  }

  GetTodayStatus(outletId: number) {
    this.dashboardService.GetTodayStatus(outletId).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.todayStatus = response.ReturnObject;
        console.log('status', this.todayStatus)
      }
    })
  }

  RoutePage(pathName: string) {
    this.router.navigate([pathName])
  }


  navigate(path: string) {
    this.router.navigateByUrl(path);
  }


}
