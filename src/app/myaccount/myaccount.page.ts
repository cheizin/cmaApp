import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalVariable } from '../globals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {
  userDetail: string;
  authState = null;
  id = null;
  displayName = null;
  email = null;
  phoneNumber = null;
  photoURL = null;

  occupation = null;
  gender = null

  user = null;

  saving_challenges:any = [];
  data_loaded = false;

  private baseApiUrl = GlobalVariable.BASE_API_URL;
  private localApirUrl = GlobalVariable.LOCAL_API_URL;
  savingsUpdateForm: FormGroup;

  savings_update:any;

  userProfile: any = null; 

  hide = true;

  SavingChallengeForm : FormGroup;

  constructor(private router: Router, public httpClient: HttpClient, public authService: AuthenticationService,private firebaseAuth: AngularFireAuth,
    public dialog: MatDialog,private _snackBar: MatSnackBar, public toastController: ToastController,
    private fb: FormBuilder)
   { 

    /*
    this.firebaseAuth.auth.onAuthStateChanged(function (user)
    {
        if(user)
        {
          this.user = user.email;

        }
    });
    */

    this.firebaseAuth.authState.subscribe(authState => {
      
        this.authState = true;
        this.authState = authState;
  
        this.id =  this.authState.uid;
        this.displayName =  this.authState.displayName;
        this.email= this.authState.email;
        this.phoneNumber = this.authState.phoneNumber;
        this.photoURL= this.authState.photoURL;

    });

   }

  ngOnInit() {

  }

  UpdateAccountForm = this.fb.group(
    {
    'name': [
      this.displayName,
      Validators.compose([
          Validators.required, Validators.minLength(3), Validators.maxLength(50),
      ])
    ],
    
  });
  
  get UpdateAccountFormControls(): any {
    return this.UpdateAccountForm['controls'];
  }

  UpdatePictureForm = this.fb.group(
    {
    'picture': [
      '',
      Validators.compose([
          Validators.required
      ])
    ],
    
  });

  get UpdatePictureFormControls(): any {
    return this.UpdatePictureForm['controls'];
  }


  UpdatePasswordForm = this.fb.group(
    {
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
    
  });



  get UpdatePasswordFormControls(): any {
    return this.UpdatePasswordForm['controls'];
  }

  updateUsername(name) {
    this.authState.updateProfile({
      displayName: name.value
    })
      .then((data) => {
        this._snackBar.open('Username Updated', 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top'
        });

      })
      .catch(err => {
        console.log(` failed ${err}`);
        this._snackBar.open(err.message, 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

  updatePicture(picture) {

    this.authState.updateProfile({
      photoURL: picture.value
    })
      .then((data) => {
        this._snackBar.open('Profile Picture Updated', 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top'
        });
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this._snackBar.open(err.message, 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

  updatePassword(password) {
    this.user.updatePassword(password.value)
      .then(() => {
        this._snackBar.open('Password Updated', 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top'
        });
      })
      .catch(err => {
        this._snackBar.open(err.message, 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }
    

  ionViewWillEnter() {

    this.firebaseAuth.authState.subscribe(authState => {
      this.authState = true;
      this.authState = authState;
    });

  }

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
