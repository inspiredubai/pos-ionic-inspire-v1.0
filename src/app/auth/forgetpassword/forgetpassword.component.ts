import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiResponse } from 'src/app/Domain/api-response';
import { AuthenticationService } from 'src/app/Shared/shared/Services/authentication.service';
import { UtilityService } from 'src/app/Shared/shared/Services/utility.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent  implements OnInit {
  ForgetForm!: FormGroup;
  showLoader: boolean = true;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private utility: UtilityService
  ) { }

  ngOnInit() {
    this.ForgetForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  forget() {

    
    this.ForgetForm.markAllAsTouched()
    if (this.ForgetForm.invalid) return;
    const email = this.ForgetForm.get('Email')?.value;
    this.authService.ForgotPassword(email).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
       
        this.presentSuccessToast('Mail Send Successfully');
        this.router.navigate(['auth/login']);
      } else {
        this.presentErrorToast('Mail not send');
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
