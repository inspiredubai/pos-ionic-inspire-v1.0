import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/Domain/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  GetChartsByType(type: string, outletId: number) {
    return this.http.get<ApiResponse>("Dashboard/GetChartsByType?type=" + type + "&outletId=" + outletId)
  }

  GetDailySummary(outletId: number) {
    return this.http.get<ApiResponse>("Dashboard/GetDailySummary?outletId=" + outletId)
  }
  GetTraction(outletId: number) {
    return this.http.get<ApiResponse>("Dashboard/GetTransaction?outletId=" + outletId)
  }

  GetGroupSummary(outletId: number) {
    return this.http.get<ApiResponse>("Dashboard/GetGroupSummary?outletId=" + outletId)
  }

  GetTodayStatus(outletId: number) {
    return this.http.get<ApiResponse>("Dashboard/GetTodayStatus?outletId=" + outletId)
  }

  GetDailySummaryByDate(outletId: number) {
    return this.http.get<ApiResponse>("Dashboard/GetDailySummaryByDate?outletId=" + outletId)
  }
  
  GetOutlets() {
    return this.http.get<ApiResponse>("Dashboard/GetOutlets")
  }
}
