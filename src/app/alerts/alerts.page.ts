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
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertsPage implements OnInit {
  public connected = true;
  networkStatus: any;
  news: any = [];
  business_news: any = [];
  market_news: any = [];

  news_div:boolean=true;
  business_div:boolean=true;
  market_div:boolean=true;

  alerts_div:boolean=true;
  feeds_div:boolean=false;
  stats_div:boolean=false;
  how_to_invest:any = [];
  cma_alerts:any = [];

  books:any = [];

  private baseApiUrl = GlobalVariable.BASE_API_URL;
  private fileApiUrl = GlobalVariable.FILE_API_URL;
  SERVER_URL = this.baseApiUrl+'whistle-blower/whistle-blower.php';
  FILE_URL = this.fileApiUrl;
  investor_education:any = [];


  slideOpts = {  
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true  ,
    pager: true,

  };  

  

  links = ['/licencees', '/contact-us'];
  activeLink = this.links[0];

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

  config_coverflow : SwiperOptions = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows : true,
  }
  
}


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

   this.httpClient.get(this.baseApiUrl+'learn/cma-alerts.php').subscribe(
    data => {
      this.cma_alerts = data;
     },
     (error) => {
      this._snackBar.open('Failed to load CMA Alerts Mind trying again?', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'top'
      });
     });


   var headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set("x-api-key","SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM");
   /* var headers = {
      headers: {"Content-type": "application/json;charset=UTF-8","x-api-key":"SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM"}
    }
    */
   /*
    this.httpClient.get('https://api.newscatcherapi.com/v2/latest_headlines?countries=KE&topic=finance&page_size=20', { 'headers': headers }).subscribe(
      data =>{
        this.news= data;

        this.news_div=true;
        this.business_div=false;
        this.market_div=false;
      },
      (error) => {

          this.presentToastWithOptions();

      },
      
    );
    */

    this.getCMAAlerts(false, "");

  }

  getCMAAlerts(isFirstLoad, event) {

    this.url = '?_page=' + this.page_number + '&_limit=' + this.page_limit;

    this.NewsService.getListItems(this.url)
      .subscribe((data: any) => {

        for (let i = 0; i < data.length; i++) {
          this.itemListData.push(data[i]);
        }

        if (isFirstLoad)
          event.target.complete();

        this.page_number++;
      }, error => {
        console.log(error);
      })
  }

  doInfinite(event) {

    this.getCMAAlerts(true,event);

          //Hide Infinite List Loader on Complete 
          event.target.complete();

      //Rerender Virtual Scroll List After Adding New Data
     // this.virtualScroll.checkEnd();

          // App logic to determine if all data is loaded
          // and disable the infinite scroll
          if (this.itemListData.length >=1) {
            event.target.disabled = true;
          }

          console.log(this.itemListData.length)
    
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

  LoadBooks()
  {
    this.httpClient.get(this.baseApiUrl+'learn/books.php').subscribe(
      data => {
        this.books = data;
       },
       (error) => {
        this._snackBar.open('Failed to load your books. Mind trying again?', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top'
        });
       }      
   );
  }


  LoadNewsFeed()
  {
  
    this.news_div=true;
    this.business_div=false;
    this.market_div=false;

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set("x-api-key","SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM");
   /* var headers = {
      headers: {"Content-type": "application/json;charset=UTF-8","x-api-key":"SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM"}
    }
    */
    this.httpClient.get('https://api.newscatcherapi.com/v2/latest_headlines?countries=KE&topic=finance&page_size=20', { 'headers': headers }).subscribe(
      data =>{
        this.news= data;
      },
      (error) => {

          this.presentToastWithOptions();

      },
    );
    
    
/*
    fetch('https://api.newscatcherapi.com/v2/latest_headlines?countries=KE&topic=business&page_size=20', {
    method: "GET",
    headers: {"Content-type": "application/json;charset=UTF-8","x-api-key":"SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM"}
    })
    .then(data => {
     this.news= data;

      
  })
  .catch(error => {
    this.presentToastWithOptions();
  });
*/
    
  }

  LoadNewsFeedMarketsCategory()
  {
    this.market_div=true;
    this.news_div=false;
    this.business_div=false;
    

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set("x-api-key","SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM");
     /* var headers = {
        headers: {"Content-type": "application/json;charset=UTF-8","x-api-key":"SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM"}
      }
      */
      this.httpClient.get('https://api.newscatcherapi.com/v2/search?q=capital market&countries=KE&page_size=20', { 'headers': headers }).subscribe(
        data =>{
          this.market_news= data;
        },
        (error) => {
  
            this.presentToastWithOptions();
  
        },
      );
  }
  LoadNewsFeedBusinessCategory()
  {
    this.business_div= true;
    this.market_div=false;
    this.news_div=false;
    

    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set("x-api-key","SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM");
   /* var headers = {
      headers: {"Content-type": "application/json;charset=UTF-8","x-api-key":"SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM"}
    }
    */
    this.httpClient.get('https://api.newscatcherapi.com/v2/latest_headlines?countries=KE&topic=business&page_size=20', { 'headers': headers }).subscribe(
      data =>{
        this.business_news= data;
      },
      (error) => {

          this.presentToastWithOptions();

      },
    );
  }

  RefreshNews(event)
  {
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set("x-api-key","SIGeO9vhV2fc2n5SYm14n-mWGSY02zkGt9eEnUjUiSM");

    setTimeout(() => {
      event.target.complete();
    }, 2000);

    this.httpClient.get('https://api.newscatcherapi.com/v2/latest_headlines?countries=KE&topic=finance&page_size=20', { 'headers': headers }).subscribe(
      data =>{
        this.news= data;
      },
      (error) => {

          this.presentToastWithOptions();

      },
    );
  }

  RefreshCMAAlerts(event)
  {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
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
  

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'News Feed Failed to Load',
      position: 'top',
      duration: 6000,
      buttons: [
        {
          icon: 'refresh',
          text: 'Retry',
          handler: () => {
            this.LoadNewsFeed();
          }
        }, {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            //
          }
        }
      ]
    });
    await toast.present();
  }

  LoadImage(url)
  {
    location.replace(url);
  }

  LoadAlerts()
  {
    this.alerts_div=true;
    this.feeds_div=false;
    this.stats_div=false;
  }
  LoadFeeds()
  {
    this.feeds_div=true;
    this.alerts_div=false;
    this.stats_div=false;
  }
  LoadStats()
  {
    this.feeds_div=false;
    this.alerts_div=false;
    this.stats_div=true;
  }

}
