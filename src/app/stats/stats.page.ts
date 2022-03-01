import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { IonicSwiper } from '@ionic/angular';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation, SwiperOptions, Swiper, EffectFade,EffectCube,EffectFlip} from "swiper";


// install Swiper modules

//SwiperCore.use([Autoplay, Pagination, Navigation]);
SwiperCore.use([IonicSwiper,Autoplay, Navigation, Pagination, EffectFade,EffectCube,EffectFlip ]); 
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatsPage implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
