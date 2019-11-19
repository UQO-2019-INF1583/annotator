import { RouterModule, Routes } from "@angular/router";

// Components
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

// Project Components
import { AddCorpusComponent, CreateProjectComponent } from "./components";

// Tools
import { AuthGuard } from "./tools";

const appRoutes: Routes = [
  { path: "", component: HomeWelcomeComponent, pathMatch: "full" },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {
    path: "annotation",
    component: AnnotationComponent /*, canActivate: [AuthGuard]*/
  },
  // { path: 'addAnnotator', component: AddAnnotatorComponent },
  // { path: 'addCategory', component: AddCategoryComponent },
  { path: "addCorpus", component: AddCorpusComponent },
  {
    path: "createProject",
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "project", component: ProjectComponent },
  {
    path: "projectManager",
    component: ProjectManagerComponent /*, canActivate: [AuthGuard]*/
  },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "reset", component: ResetPasswordComponent },
  {
    path: "userManager",
    component: UserManagerComponent,
    canActivate: [AuthGuard]
  },
  // otherwise page not found
  { path: "**", component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(
  appRoutes,
  { useHash: false } /*, { enableTracing: true }*/
);
