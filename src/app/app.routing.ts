import { RouterModule, Routes } from '@angular/router';
import { ProjectManagerComponent, UserManagerComponent } from './adm';
import { AnnotationComponent } from './annotation/index';
import { AddCorpusComponent, CreateProjectComponent } from './components';
import { ProjectComponent } from './components/index';
import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
import { HomeComponent } from './home/home.component';
// import { AdminComponent } from './adm';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './shared/security/auth.guard';
import { PopUpMessageComponent } from './pop-up-message/pop-up-message.component';


const appRoutes: Routes = [
  { path: '', component: HomeWelcomeComponent, pathMatch: 'full' },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {
    path: 'annotation',
    component: AnnotationComponent /*, canActivate: [AuthGuard]*/
  },
  // { path: 'addAnnotator', component: AddAnnotatorComponent },
  // { path: 'addCategory', component: AddCategoryComponent },
  { path: 'addCorpus', component: AddCorpusComponent },
  {
    path: 'createProject',
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'project', component: ProjectComponent },
  {
    path: 'projectManager',
    component: ProjectManagerComponent /*, canActivate: [AuthGuard]*/
  },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reset', component: ResetPasswordComponent },
  {
    path: 'userManager',
    component: UserManagerComponent,
    canActivate: [AuthGuard]
  },

  { path: 'popup', component: PopUpMessageComponent },
  // otherwise page not found
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(
  appRoutes, { useHash: false } /*, { enableTracing: true }*/
);
