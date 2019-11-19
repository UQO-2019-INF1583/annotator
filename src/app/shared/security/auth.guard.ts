import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { AuthService } from "./auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class AuthGuard implements CanActivate {
  // ne pas effacer
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }*/
  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    private afs: AngularFirestore
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("currentUser")) {
      //verification du role
      let good = -1;
      if (route.data.roles) {
        const userId: string = this.authService.authState.uid;
        this.afs
          .collection("Users")
          .ref.where("uid", "==", userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let role = doc.get("role");
              for (let i = 0; i < route.data.roles.length; i++) {
                if (route.data.roles[i] === role) {
                  good = 1;
                }
              }
              if (good === -1) {
                this.router.navigate(["/index"]);
                return false; 
              }
            });
          });
      }
      // logged in so return true
      // HeaderComponent.isUserLoggedIn = true;
      HeaderComponent.updateUserStatus.next(true);
      return true;
    } else {
      // not logged in so redirect to home page
      this.router.navigateByUrl("/index", { queryParams: { path: "" } });
      return false;
    }
  }
}
