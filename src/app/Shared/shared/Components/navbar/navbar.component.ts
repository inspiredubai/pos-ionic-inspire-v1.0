import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { ApiResponse } from 'src/app/Domain/api-response';
import { ToastController } from '@ionic/angular';
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  selectedOutletId: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastController: ToastController,
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.GetOutlets()
    // this.route.paramMap.subscribe(params => {
    //   // Use the paramMap to get the 'outletId' parameter from the route
    //   this.selectedOutletId = params.get('outletId');
    // });
  this.selectedOutletId=  this.route.snapshot.queryParamMap.get('outletId')
  // alert(this.selectedOutletId)
  }

  link(id: any) {
    this.router.navigate(['/dashboard'], { queryParams: { outletId: id } });
  }

  outlets: any[] = [];

  GetOutlets() {
    
    this.dashboardService.GetOutlets().subscribe((response: ApiResponse) => {
      if (response.IsSuccess && response.ReturnObject.length > 0) {
        this.outlets = response.ReturnObject;
      }
    })
  }

  Logout() {
    this.authService.Logout().subscribe((res: ApiResponse) => {
      if (res.IsSuccess) {
        this.presentSuccessToast('Logout Successfully');
        localStorage.clear();
        this.router.navigate(['auth/login']);
      } else {
        this.presentErrorToast('Logout Failed');
      }
    })
  }
  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // Duration in milliseconds
      position: 'top', // 'top', 'bottom', or 'middle'
      color: 'success', // You can set the color to match your app's styling
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // Duration in milliseconds
      position: 'top', // 'top', 'bottom', or 'middle'
      color: 'danger', // You can set the color to match your app's styling
    });
    toast.present();
  }
}
