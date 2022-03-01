import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  hide = true;
  
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {}

  SignInForm = this.fb.group(
    {
    'email': [
      '',
      Validators.compose([
          Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.email
      ])
    ],
  
    'password': [
      '',
      Validators.compose([
          Validators.required, Validators.minLength(6), Validators.maxLength(50)
      ])
    ],
    
  }
  );
  
  get SignInFormControls(): any {
    return this.SignInForm['controls'];
  }

  logIn(email, password) {
    
    this.authService.SignIn(email.value, password.value)
      .then((res) => {

        if (res) {
          var isVerified = res.user.emailVerified;
          if (isVerified) {
            this.router.navigate(['myaccount']); 
          } else {
            this._snackBar.open('The Email is not verified. Please check your email', 'Dismiss', {
              duration: 5000,
              verticalPosition: 'top'
            });
            return false;           
          }
        }

        /*
        if(this.authService.isEmailVerified) {
          this.router.navigate(['myaccount']);          
        } else {
          this._snackBar.open('The Email is not verified. Please check your email', 'Dismiss', {
            duration: 5000
          });
          return false;
        }*/
      }).catch((error) => {
        this._snackBar.open(error.message +'error', 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top'
        });
      })
  }

}