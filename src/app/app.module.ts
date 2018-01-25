import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatListModule, MatTabsModule, MatInputModule,
  MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatProgressBarModule, MatToolbarModule,
  MatExpansionModule, MatStepperModule, MatMenuModule, MatTableModule, MatSelectModule, MatChipsModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore} from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthService } from './shared/security/auth.service';
import { UserManagerService } from './adm/userManager.service';
import { routing } from './app.routing';
import { FooterComponent, HeaderComponent } from './shared';
import { HomeComponent } from './home/home.component';
import { HomeWelcomeComponent } from './home-welcome';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { CreateProjectComponent
       } from './components/index';

@NgModule({
  declarations: [
    AppComponent,
    CreateProjectComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    HomeWelcomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatCardModule, MatGridListModule, MatInputModule, MatListModule, MatAutocompleteModule, MatDatepickerModule, MatProgressBarModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  ],
  providers: [AuthService, AngularFireDatabaseModule, UserManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
