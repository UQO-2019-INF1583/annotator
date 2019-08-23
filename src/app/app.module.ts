import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/collections';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableDataSource,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { NgxFileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared/security/auth.guard';
import { AuthService } from './shared/security/auth.service';
import { ProjectManagerService, UserManagerService } from './adm';
import { routing } from './app.routing';
import { FooterComponent, HeaderComponent } from './shared';
import { HomeComponent } from './home/home.component';
import { HomeWelcomeComponent } from './home-welcome';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProjectDataSource } from './data-sources/projectDataSource';
import { ProjectManagerComponent, UserManagerComponent } from './adm';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './adm';
import { UsersDataSource } from './data-sources/usersDataSource';
import { AnnotationComponent } from './annotation/annotation.component';
import {
  CreateProjectComponent,
  ProjectComponent,
  AddEntityComponent,
  AddCorpusComponent,
  AddAdminComponent,
  AddAnnotatorComponent,
  ProjectService
} from './components/index';
import { AddRelationComponent } from './components/add-relation/add-relation.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddAttributeComponent } from './components/add-attribute/add-attribute.component';
import { YesNoDialogBoxComponent } from './components/yes-no-dialog-box/yes-no-dialog-box.component';
import { CreateProjectService } from './components/create-project/create-project.service';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAdminComponent,
    AddAnnotatorComponent,
    AddEntityComponent,
    AddCorpusComponent,
    AnnotationComponent,
    CreateProjectComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    HomeWelcomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProjectComponent,
    ProjectManagerComponent,
    RegisterComponent,
    UserComponent,
    UserManagerComponent,
    AddRelationComponent,
    AddEventComponent,
    AddAttributeComponent,
    YesNoDialogBoxComponent,
    ProfileComponent,
    ResetPasswordComponent,
    EditUserComponent
  ],
  entryComponents: [
    AddAdminComponent,
    AddAnnotatorComponent,
    AddEntityComponent,
    AddRelationComponent,
    AddEventComponent,
    AddAttributeComponent,
    YesNoDialogBoxComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatExpansionModule,
    MatStepperModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    NgxFileDropModule,
    MatPaginatorModule,
    MatSortModule, // MatTableDataSource,
    AngularFireStorageModule,
    CdkTableModule,
    AngularFirestoreModule // imports firebase/firestore, only needed for database features
  ],
  providers: [
    AngularFireDatabaseModule,
    AuthGuard,
    AuthService,
    ProjectDataSource,
    ProjectManagerService,
    UserManagerService,
    ProjectService,
    CreateProjectService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
