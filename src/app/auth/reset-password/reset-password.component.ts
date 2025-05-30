import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiResponse } from 'src/app/Domain/api-response';
import { AuthenticationService } from 'src/app/Shared/shared/Services/authentication.service';
import { UtilityService } from 'src/app/Shared/shared/Services/utility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {
  resetPasswordForm!: FormGroup;
  showLoader: boolean = true;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private utility: UtilityService
  ) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  resetPassword() {

    
    this.resetPasswordForm.markAllAsTouched()
    if (this.resetPasswordForm.invalid) return;
    const email = this.resetPasswordForm.get('Email')?.value;
    this.authService.ResetPassword(this.resetPasswordForm.value).subscribe((response: ApiResponse) => {
      if (response.IsSuccess) {
       
        this.presentSuccessToast('Password Reset Successfully');
        this.router.navigate(['auth/login']);
      } else {
        this.presentErrorToast('Password Reset Fail');
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
