import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiResponse } from 'src/app/Domain/api-response';
import { AuthenticationService } from 'src/app/Shared/shared/Services/authentication.service';
import { DashboardService } from 'src/app/Shared/shared/Services/dashboard.service';
import { UtilityService } from 'src/app/Shared/shared/Services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // showPassword: boolean = false;
  // togglePasswordVisibility(value: boolean) {

  //   this.showPassword = value == true ? true : false;
  // }
  loginForm!: FormGroup;
  showLoader: boolean = true;
  ReturnUrl: string = '';
  outlets: any;
  constructor(private router: Router,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private utility: UtilityService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let token = this.utility.GetAuthToken();
    let role = this.utility.GetUserRole();
    // if (token && role) {
    //   this.router.navigate(['dashboard'])
    // }
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      Role: new FormControl('SuperAdmin', [Validators.required])
    });
    this.ReturnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }

  Login() {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.invalid) return;
    this.authService.Login(this.loginForm.value).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
        this.utility.SetLoginData(response?.ReturnObject);
        this.presentSuccessToast('Login Successfully');
        this.dashboardService.GetOutlets().subscribe((response: ApiResponse) => {
         
            this.outlets = response.ReturnObject;
            this.router.navigate([this.ReturnUrl], { queryParams: { outletId: response.ReturnObject[0].Id } })

          
        })

      } else {
        this.presentErrorToast('Invalid credentials');
      }
    });


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
