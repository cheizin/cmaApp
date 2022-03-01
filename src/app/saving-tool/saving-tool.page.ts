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
  selector: 'app-saving-tool',
  templateUrl: './saving-tool.page.html',
  styleUrls: ['./saving-tool.page.scss'],
})
export class SavingToolPage implements OnInit {
  userDetail: string;
  authState = null;
  id = null;
  displayName = null;
  email = null;
  phoneNumber = null;
  photoURL = null;

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

      var email = this.authState.email;
      var uid = this.authState.uid;

      var uid = this.id;


    /*this.httpClient.get(this.baseApiUrl+'saving/saving.php?user='+uid).subscribe(
      data => {
        this.saving_challenges = data;
        this.data_loaded= true;
       },
       (error) => {
        this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
          duration: 5000
        });
       }      
   );

   */


    this.SavingChallengeForm = this.fb.group({
      'start_date': [
        '',
        Validators.compose([
            Validators.required, Validators.minLength(1), Validators.maxLength(20),
        ])
      ],
      'end_date': [
        '',
        Validators.compose([
            Validators.required, Validators.minLength(1), Validators.maxLength(20),
        ])
      ],
      'saving_target': [
        '',
        Validators.compose([
            Validators.required, Validators.min(1), Validators.max(500000),
            Validators.pattern("^[0-9]*$"),
        ])
      ],
      'inspiration': [
        '',
        Validators.compose([
            Validators.required, Validators.minLength(5), Validators.maxLength(100),
        ])
      ],
      'email': [
        email,
      ],
      'uid': [
        uid,
      ],
      
    });

  });



  this.savingsUpdateForm= this.fb.group({
    'savings_update': [
      '',
      Validators.compose([
          Validators.required, Validators.min(1),
          Validators.pattern("^[0-9]*$"),
      ])
    ]
    
  });

  



 }

 getUserSavings()
 {
   var uid = this.id;
   this.httpClient.get(this.baseApiUrl+'saving/saving.php?user='+uid).subscribe(
     data => {
       this.saving_challenges = data;
       this.data_loaded= true;
      },
      (error) => {
       this._snackBar.open('Failed to load saving challenges. Mind trying again?', 'Dismiss', {
         duration: 5000,
         verticalPosition: 'top'
       });
      }      
  );
 }

 closeSavingChallenge(challenge_id)
 {

   const formData = {
       status : 'inactive',
       challenge_id : challenge_id,
   };
   this.httpClient.post(this.baseApiUrl+'saving/close-saving-challenge.php',formData).subscribe(
     data => {
       this._snackBar.open('Challenge Inactivated!', 'Dismiss', {
         duration: 3000,
         verticalPosition: 'top'
       });
       this.getUserSavings();
      },
      (error) => {
       this._snackBar.open('Failed to close challenge. Mind trying again?', 'Dismiss', {
         duration: 5000,
         verticalPosition: 'top'
       });
       console.log(error);
      }      
  );
 }


 deleteSavingChallenge(challenge_id)
 {
   const formData = {
     challenge_id : challenge_id,
 };

 this.httpClient.post(this.baseApiUrl+'saving/delete-saving-challenge.php',formData).subscribe(
   data => {
     this._snackBar.open('Challenge Deleted!', 'Dismiss', {
       duration: 3000,
       verticalPosition: 'top'
     });
     this.getUserSavings();
    },
    (error) => {
     this._snackBar.open('Failed to delete. Mind trying again?', 'Dismiss', {
       duration: 5000,
       verticalPosition: 'top'
     });
     console.log(error);
    }      
);
 }

 openSavingChallenge(challenge_id)
 {
   var formData = {
       'status' : 'active',
       'challenge_id' : challenge_id
   };
   this.httpClient.post(this.baseApiUrl+'saving/open-saving-challenge.php',formData).subscribe(
     data => {
       this._snackBar.open('Challenge Activated!', 'Dismiss', {
         duration: 3000,
         verticalPosition: 'top'
       });
       this.getUserSavings();
      },
      (error) => {
       this._snackBar.open('Failed to create challenge. Mind trying again?', 'Dismiss', {
         duration: 5000,
         verticalPosition: 'top'
       });
      }      
  );
 }

 updateUserSavings(id)
 {


   var formData = {
     saving_challenge_id: id,
     savings_update: $('#update-'+id).val()
   }

   this.httpClient.post(this.baseApiUrl+'saving/update-savings.php',formData).subscribe(
     data => {
       this._snackBar.open('Saving Updated! Keep it up', 'Dismiss', {
         duration: 3000,
         verticalPosition: 'top'
       });

       this.getUserSavings();

       console.log(data)
       
      },
      (error) => {
       this._snackBar.open('Failed to update saving. Mind trying again?', 'Dismiss', {
         duration: 3000,
         verticalPosition: 'top'
       });
       console.log('error '+error);
      }   
   )
 }

 SubmitSavingChallenge() {
  var formData = this.SavingChallengeForm.value;

  console.log(formData);

  this.httpClient.post(this.baseApiUrl+'saving/saving.php',formData).subscribe(
    data => {
      this._snackBar.open('Saving Challenge Saved!', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top'
      });

      this.getUserSavings();
      
     },
     (error) => {
      this._snackBar.open('Failed to create challenge. Mind trying again?', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top'
      });
      console.log('error '+error);
     }   
  )

 }

 

ngOnInit() {

}

ionViewWillEnter() {

  this.firebaseAuth.authState.subscribe(authState => {
    this.authState = true;
    this.authState = authState;
  });
  this.getUserSavings()
}

}
