import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalVariable } from '../globals';
import { IonicSwiper, ToastController } from '@ionic/angular';
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation, SwiperOptions, Swiper, EffectFade,EffectCube,EffectFlip,EffectCoverflow} from "swiper";

import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';

import { NewsService } from '../services/news.service';

import { AuthenticationService } from "../shared/authentication-service";
import { AngularFireAuth } from '@angular/fire/auth';

SwiperCore.use([IonicSwiper,Autoplay, Navigation, Pagination, EffectFade,EffectCube,EffectFlip,EffectCoverflow ]);
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userDetail: string;
  authState = null;
  id = null;
  displayName = null;
  email = null;
  phoneNumber = null;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    autoplay : {
      delay: 1000,
      disableOnInteraction: true
    },
  };

  isReadMore = true

  showText() {
     this.isReadMore = !this.isReadMore
  }


  constructor(public httpClient: HttpClient,private _snackBar: MatSnackBar,public toastController: ToastController, private NewsService: NewsService,
    public authService: AuthenticationService,private firebaseAuth: AngularFireAuth) 
    
    {

      this.firebaseAuth.authState.subscribe(authState => {
      
        this.authState = true;
        this.authState = authState;
  
        this.id =  this.authState.uid;
        this.displayName =  this.authState.displayName;
        this.email= this.authState.email;
        this.phoneNumber = this.authState.phoneNumber;

    });
    }

  ngOnInit() {

    $("ion-segment-button").click(function(){
      $('ion-segment-button').removeClass('segment-button-checked');
      $(this).addClass('segment-button-checked');
    });


  }

  ionViewWillEnter() {

    this.firebaseAuth.authState.subscribe(authState => {
      this.authState = true;
      this.authState = authState;
    });

  }

}
