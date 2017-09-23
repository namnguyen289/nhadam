import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import {ListCustomerPage} from '../pages/list-customer/list-customer';
import {AddOrderPage} from '../pages/add-order/add-order';
import {ListOrderPage} from '../pages/list-order/list-order';
import {OrderDetailPage} from '../pages/order-detail/order-detail';
import {ListCampaignPage} from '../pages/list-campaign/list-campaign';
import {CampaignPage} from '../pages/campaign/campaign';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NumberFunctionProvider } from '../providers/number-function/number-function';
import { CommonDataProvider } from '../providers/common-data/common-data';

export const firebaseConfig = {
  apiKey: "AIzaSyDGsn_tXn0zgzKwHi910GtcG9xmwMuDZE4",
  authDomain: "location-1502939022340.firebaseapp.com",
  databaseURL: "https://location-1502939022340.firebaseio.com",
  projectId: "location-1502939022340",
  storageBucket: "location-1502939022340.appspot.com",
  messagingSenderId: "757804405892"
};
@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage,
    ListCustomerPage,
    AddOrderPage,
    ListOrderPage,
    OrderDetailPage,
    ListCampaignPage,
    CampaignPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    ListCustomerPage,
    AddOrderPage,
    ListOrderPage,
    OrderDetailPage,
    ListCampaignPage,
    CampaignPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NumberFunctionProvider,
    CommonDataProvider
  ]
})
export class AppModule {}
