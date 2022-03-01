import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email = '';
  password = '';
  error = '';
  username = '';
  image: number;

  constructor(private fb: FormBuilder,
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  ForgotPasswordForm = this.fb.group(
    {
    'email': [
      '',
      Validators.compose([
          Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.email
      ])
    ],
   
  }
  );
  
  get ForgotPasswordFormControls(): any {
    return this.ForgotPasswordForm['controls'];
  }
  
  recover(email) {
    this.fireauth.auth.sendPasswordResetEmail(email.value)
      .then(data => {
        this.presentToast('Password reset email sent. Please check your email for password reset instructions',  'top', 6000); 
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        this.error = err.message;
        this.presentToast('An error occured. Please try again '+ err.message,  'top', 6000); 
      });
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }
}
