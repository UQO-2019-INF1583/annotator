import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
import { LoginComponent } from './login';
import { PageNotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'welcome', component: HomeWelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeWelcomeComponent, pathMatch: 'full' },
  // otherwise page not found
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
