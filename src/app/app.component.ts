import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style, } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { AuthenticationService } from './shared/authentication-service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userDetail: string;
  authState = null;
  id = null;
  displayName = null;
  email = null;
  phoneNumber = null;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'My Account', url: '/myaccount', icon: 'person' },
    { title: 'News & Alerts', url: '/alerts', icon: 'newspaper' },
    { title: 'Stats', url: '/stats', icon: 'stats-chart' },
    { title: 'Saving Tool', url: '/saving-tool', icon: 'wallet' },
    { title: 'Approved Institutions', url: '/market-intermediaries', icon: 'bar-chart' },
    { title: 'Market Intermediaries', url: '/licencees', icon: 'ribbon' },
    { title: 'Investor Education', url: '/investor-education', icon: 'book' },
    { title: 'Feedback', url: '/feedback', icon: 'chatbubble-ellipses' },
    { title: 'Contact Us', url: '/contact-us', icon: 'call' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor( private platform: Platform,public authService: AuthenticationService,private firebaseAuth: AngularFireAuth) 
  {
      this.platform.backButton.subscribeWithPriority(0, () => {
        navigator['app'].exitApp();
      
    });

    this.platform.ready().then(() => {
      StatusBar.show().catch(()=>{}); // Ok
      StatusBar.setBackgroundColor({color:'#9E7D08'});

      setTimeout(()=>{
        SplashScreen.hide({
          fadeOutDuration: 1000
        });
      }, 2000);

    });

    /*
    this.platform.ready().then(async () => {


      
    });*/

    this.firebaseAuth.authState.subscribe(authState => {
      
      this.authState = true;
      this.authState = authState;

      this.id =  this.authState.uid;
      this.displayName =  this.authState.displayName;
      this.email= this.authState.email;
      this.phoneNumber = this.authState.phoneNumber;

  });

   

  }

  ionViewWillEnter() {

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
    this.firebaseAuth.authState.subscribe(authState => {
      this.authState = true;
      this.authState = authState;
      this.id =  this.authState.uid;
      this.displayName =  this.authState.displayName;
      this.email= this.authState.email;
      this.phoneNumber = this.authState.phoneNumber;
    });
  }



  
}