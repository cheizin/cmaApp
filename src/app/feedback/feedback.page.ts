import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(private fb: FormBuilder,public httpClient: HttpClient,private _snackBar: MatSnackBar) { }

  FeedbackForm = this.fb.group({
    'feedback': [
      '',
      Validators.compose([
          Validators.required, Validators.minLength(3), Validators.maxLength(500),
      ])
  ],
  'rating':[],
  'category': [
    '',
    Validators.compose([
        Validators.required,
    ])
],
    
  });

  get FeedbackFormControls(): any {
    return this.FeedbackForm['controls'];
  }


  SubmitFeedback() {
    let formData = this.FeedbackForm.value;
    this.httpClient.post(this.baseApiUrl+'feedback/feedback.php',formData).subscribe(
      data => {
        this._snackBar.open('Thank You! We appreciate your feedback', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.FeedbackForm.reset();

        Object.keys(this.FeedbackForm.controls).forEach(key => {
          this.FeedbackForm.get(key).setErrors(null) ;
        });

       },
       (error) => {
        this._snackBar.open('An error occured. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
       }   
    )

   }

  ngOnInit() {
  }

}
