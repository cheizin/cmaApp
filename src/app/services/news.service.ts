import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from '../globals';

@Injectable({
  providedIn: 'root'
})


export class NewsService {

private baseApiUrl = GlobalVariable.BASE_API_URL;

  // API path 
  base_path = this.baseApiUrl+'learn/investor-education.php';

  constructor(
    private http: HttpClient
  ) { }

  getListItems(params) {
    console.log(this.base_path + params);
    return this.http.get(this.base_path + params);
  }

}