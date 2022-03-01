import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {
  hide = true;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(){}

  SignUpForm = this.fb.group(
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

    'confirm_password': [
      '',
      Validators.compose([
          Validators.required, Validators.minLength(6), Validators.maxLength(50)
      ])
    ],
    
  },
  {validator: this.passwordMatchValidator}
  
  );

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirm_password'].value ? null : {'mismatch': true};
  }

  get SignUpFormControls(): any {
    return this.SignUpForm['controls'];
 }

  signUp(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      // Do something here
      this.authService.SendVerificationMail()
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      this._snackBar.open(error.message, 'Dismiss', {
        duration: 5000,
        verticalPosition: 'top'
      });
    })
}

}