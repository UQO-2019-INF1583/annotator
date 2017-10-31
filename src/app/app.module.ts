import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
//import { FooterComponent } from '../shared/components/footer/footer.component';
//import { HeaderComponent } from '../shared/components/header/header.component';

/*
export const firebaseConfig = {
  apiKey: 'AIzaSyBxyDRCUs3jzK5sfSYj6443htnUaqKBp4w',
  authDomain: 'annotateur-9b363.firebaseapp.com',
  databaseURL: 'https://annotateur-9b363.firebaseio.com',
  storageBucket: 'annotateur-9b363.appspot.com',
  messagingSenderId: '581480444578'
};*/
export const firebaseConfig = {
    apiKey: "AIzaSyB_6_L9gpJ9HOO9OxnIpPOs9k_icrOs7XY",
    authDomain: "projetia-8a0f1.firebaseapp.com",
    databaseURL: "https://projetia-8a0f1.firebaseio.com",
    projectId: "projetia-8a0f1",
    storageBucket: "projetia-8a0f1.appspot.com",
    messagingSenderId: "424733099651"
}


@NgModule({
  declarations: [
    AppComponent,
    //FooterComponent,
    //HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
