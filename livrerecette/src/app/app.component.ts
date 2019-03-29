import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  listeCat = [];
  menuItems = [];
  public appPages = [
    {
      title: 'Accueil',
      url: '/home',
      icon: 'home'
    }
  ];

  constructor(
      private http: HttpClient,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.allCat();
  }
  allCat() {
      this.http.get('http://localhost:3000/repas/type').subscribe((response: any[]) => {
          response.forEach((value) => {
            this.appPages.push(
                {
                    title: value.libelleType,
                    url: '/liste/' + value.idTypeRepas,
                    icon: (value.iconType === null || value.iconType === '') ? 'list' : value.iconType
                }
            );
          });
      });
      console.log(this.appPages);
  }
}
