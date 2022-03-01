import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalVariable } from '../globals';
import { IonicSwiper, ToastController } from '@ionic/angular';
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation, SwiperOptions, Swiper, EffectFade,EffectCube,EffectFlip} from "swiper";

import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';

import { NewsService } from '../services/news.service';

// install Swiper modules

//SwiperCore.use([Autoplay, Pagination, Navigation]);
SwiperCore.use([IonicSwiper,Autoplay, Navigation, Pagination, EffectFade,EffectCube,EffectFlip ]);

@Component({
  selector: 'app-how-to-invest',
  templateUrl: './how-to-invest.page.html',
  styleUrls: ['./how-to-invest.page.scss'],
})
export class HowToInvestPage implements OnInit {
  public connected = true;
  networkStatus: any;
  how_to_invest:any = [];
  cma_alerts:any = [];

  books:any = [];

  private baseApiUrl = GlobalVariable.BASE_API_URL;
  private fileApiUrl = GlobalVariable.FILE_API_URL;
  SERVER_URL = this.baseApiUrl+'whistle-blower/whistle-blower.php';
  FILE_URL = this.fileApiUrl;
  investor_education:any = [];

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    autoplay : {
      delay: 2000,
      disableOnInteraction: true
    },
  };



  isReadMore = true

  showText() {
     this.isReadMore = !this.isReadMore
  }


  url: string;
  itemListData = [];
  page_number = 1;
  page_limit = 2;
  investment_products:any = [];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  constructor(public httpClient: HttpClient,private _snackBar: MatSnackBar,public toastController: ToastController, private NewsService: NewsService) 
  {}

  
  ngOnInit() {

    this.httpClient.get(this.baseApiUrl+'learn/how-to-invest.php').subscribe(
      data => {
        this.how_to_invest = data;
       },
       (error) => {
        this._snackBar.open('Failed to load investment tips. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
       }      
   );


  }

  

}
