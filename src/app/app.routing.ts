import {
  AddAnnotatorComponent,
  AddEntityComponent,
  AddCorpusComponent,
  CreateProjectComponent
} from './components';
import { ProjectManagerComponent, UserManagerComponent } from './adm';
import { RouterModule, Routes } from '@angular/router';

import { AnnotationComponent } from './annotation/index';
import { AuthGuard } from './shared/security/auth.guard';
import { HomeComponent } from './home/home.component';
import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
// import { AdminComponent } from './adm';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ProjectComponent } from './components/index';
import { RegisterComponent } from './register';
import { UserComponent } from './adm';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
  // otherwise page not found
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(
  appRoutes, { useHash: false } /*, { enableTracing: true }*/
);
