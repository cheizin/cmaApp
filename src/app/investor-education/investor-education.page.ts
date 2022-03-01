import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupName, Validators} from '@angular/forms';
import { GlobalVariable } from '../globals';

import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation, SwiperOptions, Swiper } from "swiper";
import { IonicSwiper } from '@ionic/angular';

// install Swiper modules
//SwiperCore.use([Autoplay, Pagination, Navigation]);
SwiperCore.use([IonicSwiper,Autoplay, Navigation, Pagination]);

@Component({
  selector: 'app-investor-education',
  templateUrl: './investor-education.page.html',
  styleUrls: ['./investor-education.page.scss'],
})
export class InvestorEducationPage implements OnInit {
  slideOpts = {  
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true  
  };

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    autoplay : {
      delay: 1500,
      disableOnInteraction: true
    },
  };
  
    private baseApiUrl = GlobalVariable.BASE_API_URL;
    private fileApiUrl = GlobalVariable.FILE_API_URL;
    SERVER_URL = this.baseApiUrl+'whistle-blower/whistle-blower.php';
    FILE_URL = this.fileApiUrl;
    
    durationInSeconds = 5;
    data_loaded:boolean = false;
    investment_products:any = [];

    savings_goal: number;
    initial_savings_balance: number;
    monthly_income_from_employment: number;
    monthly_income_from_other_sources:number;
    all_monthly_expenses:number;
    monthly_investment_returns:number;


    net_monthly_income_after_expenses:any;
    monthly_savings_shortfall:any;
    total_annual_income:any;
    annual_savings:any;

    isLinear = false;
    FormGroup: FormGroup;

    form_saved: any ;


    investor_education:any = [];
    how_to_invest:any = [];

  FinancialSavingsReport:boolean=false;
  youtubeVideoURL : any;

  constructor(public httpClient: HttpClient,private _snackBar: MatSnackBar,private _formBuilder: FormBuilder) 
  {
    //start whistle blower form
    this.FormGroup= this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          whistle_blower_name: [''],
          whistle_blower_phone: [''],
          whistle_blower_email: ['', Validators.email],
        }),
        this._formBuilder.group({
          suspect_name: ['', Validators.required],
          suspect_phone: [''],
          suspect_email: ['', Validators.email],
        }),
        this._formBuilder.group({
          details: ['', Validators.required],
          place_of_occurence: [''],
          date_of_occurence: [''],
        }),

        this._formBuilder.group({
          //file: [''],
        }),

      ])
    });

    //end whistle blower form
  }

  GetInvestmentProducts()
  {
    this.httpClient.get(this.baseApiUrl+'learn/investment-products.php').subscribe(
      data => {
        this.investment_products = data;
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

  getEducationalMaterials()
  {
    this.httpClient.get(this.baseApiUrl+'learn/investor-education.php').subscribe(
      data => {
        this.investor_education = data;
       },
       (error) => {
        this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
       }      
   );
  }

  FetchInvestmentGuide()
  {
    this.httpClient.get(this.baseApiUrl+'learn/how-to-invest.php').subscribe(
      data => {
        this.how_to_invest = data;
       },
       (error) => {
        this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
       }      
   );
  }


  openSnackBar() {
    this._snackBar.open('Unable to load. Please try again');
    duration: this.durationInSeconds * 1000;
    verticalPosition: 'top'
  }

  FinancialCalculator()
  {

    var monthly_expenses = (this.monthly_income_from_employment + this.monthly_income_from_other_sources) - this.all_monthly_expenses;
    this.net_monthly_income_after_expenses = monthly_expenses.toLocaleString();

    var shortfall = (this.savings_goal - ( (this.monthly_income_from_employment + this.monthly_income_from_other_sources) - this.all_monthly_expenses))
    this.monthly_savings_shortfall = shortfall.toLocaleString();

    var annual_save = ((this.monthly_income_from_employment + this.monthly_income_from_other_sources)*12);
    this.annual_savings = annual_save.toLocaleString();

    var investment_returns = this.monthly_investment_returns * 12;
    var annual_inc = (((this.monthly_income_from_employment + this.monthly_income_from_other_sources) - monthly_expenses) * 12) + (investment_returns);
    this.total_annual_income = annual_inc.toLocaleString();

    this.FinancialSavingsReport=true;

  }

  get formArray(): AbstractControl | null {
    return this.FormGroup.get('formArray');
  }


SubmitWhistleBlowerForm()
{
 
  let formData = this.FormGroup.controls.formArray.value;


  this.httpClient.post(this.SERVER_URL,formData).subscribe(
    data => {
      this.form_saved = data;
      this._snackBar.open('Thank You! Information Submitted Successfully', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.FormGroup.reset();

      Object.keys(this.FormGroup.controls).forEach(key => {
        this.FormGroup.get(key).setErrors(null) ;
      });

     },
     (error) => {
      this._snackBar.open('Something happened. Mind trying again?', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top'
      });
     }   
  )

}

  ngOnInit() {
  }

}
