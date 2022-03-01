import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-market-intermediaries',
  templateUrl: './market-intermediaries.page.html',
  styleUrls: ['./market-intermediaries.page.scss'],
})
export class MarketIntermediariesPage implements OnInit {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(public httpClient: HttpClient) { }


  SaveRefferal(link)
  {
    let formData = {
      'link':link
    }
    this.httpClient.post(this.baseApiUrl+'referral/referral.php',formData).subscribe(
      data => {

       },
       (error)=>{
       }
        
    )
  }

  ngOnInit() {
  }



}
