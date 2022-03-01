import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-licencees',
  templateUrl: './licencees.page.html',
  styleUrls: ['./licencees.page.scss'],
})
export class LicenceesPage implements OnInit {
  private baseApiUrl = GlobalVariable.BASE_API_URL;
  filterTerm: string;
  durationInSeconds = 5;
  data_loaded:boolean = false;

  approved_institutions:any = [];
  institutions:any = [];
  licencees:any = [];
  licencee:any = [];
  search_for_licencees:any = [];

  constructor(public httpClient: HttpClient,private _snackBar: MatSnackBar,public navCtrl: NavController,private router: Router) 
  {
    this.httpClient.get(this.baseApiUrl+'learn/institution-type.php').subscribe(
      data =>{
        this.licencees = data;
      },
      (error) => {
        this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
      } 
    );
  }

GetApprovedInsitutions()
{
  this.httpClient.get(this.baseApiUrl+'learn/institution-type.php').subscribe(
    data =>{
      this.licencees = data;
    },
    (error) => {
      this._snackBar.open('Failed to load approved institutions. Mind trying again?', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top'
      });
    } 
  );
}  

ListApprovedInstitutions()
{
  this.httpClient.get(this.baseApiUrl+'learn/approved-institutions.php').subscribe(
    data => {
      this.approved_institutions = data;
      this.data_loaded= true;
     },
     (error) => {
       this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
         duration: 3000,
         verticalPosition: 'top'
       });
     }      
 );
}


  OpenInstitutions(nature_of_operation)
  {
    this.httpClient.get(this.baseApiUrl+'learn/approved-institutions.php?nature_of_operation='+nature_of_operation).subscribe(
     data => {
       this.institutions = data;
       },
       (error)=>{
        this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
       }
   );
   
  }

  getLicencees()
  {

  }

  searchforLicencees()
  {
    this.httpClient.get(this.baseApiUrl+'learn/licencees.php').subscribe(
      data =>{
        this.search_for_licencees = data;
      },
      (error) => {
        this._snackBar.open('Failed to load licencees. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
      } 
    );
  }

  openLicencees(type)
  {
    this.httpClient.get(this.baseApiUrl+'learn/licencees.php?type='+type).subscribe(
      data => {
        this.licencee = data;
            },
        (error)=>{
          this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
    );
    
  }

  ionViewWillEnter() {
    this.ListApprovedInstitutions();
    this.GetApprovedInsitutions();
    this.searchforLicencees();
  }

  ngOnInit() {


  }

}
