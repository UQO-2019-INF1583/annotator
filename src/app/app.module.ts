import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkTableModule } from "@angular/cdk/table";
import { DataSource } from "@angular/cdk/collections";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
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
} from "@angular/material";

// Main Angular Components
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

// Angular Firebase Components : database
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { NgxFileDropModule } from "ngx-file-drop";

// Interface Components : All views available on the Annotator platform
import {
  AnnotationComponent,
  HomeComponent,
  HomeWelcomeComponent,
  LoginComponent,
  PageNotFoundComponent,
  ProfileComponent,
  ProjectComponent,
  ProjectManagerComponent,
  RegisterComponent,
  ResetPasswordComponent,
  UserComponent,
  UserManagerComponent
} from "./components";

// Services : Database Manipulations
import {
  ProjectManagerService,
  UserService,
  ProjectDataSource,
  UsersDataSource,
  ProjectService,
  CreateProjectService
} from "./services";

// Partial Views Components : header and footer
import { FooterComponent, HeaderComponent } from "./views";

// Tool Components : security
import { AuthGuard } from "./tools/security/auth.guard";
import { AuthService } from "./tools/security/auth.service";

// Project Manager Subcomponents
import {
  AddAdminComponent,
  AddAnnotatorComponent,
  AddAttributeComponent,
  AddCorpusComponent,
  AddEntityComponent,
  AddEventComponent,
  AddRelationComponent,
  YesNoDialogBoxComponent
} from "./components/project";

import { CreateProjectComponent } from "./components/projectManager";

// User Manager Subcomponents
import { EditUserComponent } from "./components/userManager";

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
    UserService,
    ProjectService,
    CreateProjectService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
