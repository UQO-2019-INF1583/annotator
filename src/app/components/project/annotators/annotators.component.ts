/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";
import { Observable } from "rxjs/Observable";
import { MatDialog } from "@angular/material";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";
import { User } from "./../../../models/user.model";

import { AddAdminComponent } from "./../add-admin/add-admin.component";
import { AddAnnotatorComponent } from "./../add-annotator/add-annotator.component";
import { YesNoDialogBoxComponent } from "./../yes-no-dialog-box/yes-no-dialog-box.component";

/**************************************************************************************
 *    Main :
 * ***********************************************************************************/
@Component({
  selector: "annotators",
  templateUrl: "./annotators.component.html",
  styleUrls: ["./annotators.component.scss"]
})
export class AnnotatorsComponent implements OnInit {
  /**************************************************************************************
   *    Variables :
   * ***********************************************************************************/
  //Firebase
  project: Project = ProjectUtils.generateEmpty();
  sub: any;

  // Project
  projectId: string;
  isConnected: boolean = false;
  isAdmin: boolean = false;

  users: Observable<User[]>;
  annotators: any[] = []; // {uid: v1, email: v2}[]
  admin: any[] = []; // {uid: v1, email: v2}[]

  // Create New Entity

  newLabel: String = "";

  constructor(
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private ps: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    this.sub = this.activeRouter.params.subscribe(params => {
      this.ps.getProject(params.id).then(doc => {
        this.project = doc.data();

        if (this.isConnected) {
          this.users = this.ps.getUsers();
          this.getAnnotatorEmail();
          this.getAdminEmail();
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAnnotatorEmail() {
    this.annotators = [];
    this.project.annotators.forEach((uid, i) => {
      this.users.forEach(x => {
        x.forEach((u, j) => {
          if (u.uid === uid) {
            this.annotators.push({ email: u.email, uid: u.uid });
            //console.log(this.annotators[1].email);  
          }
        });
      });
    });
  }

  getAdminEmail() {
    this.admin = [];
    this.project.admin.forEach((uid, i) => {
      this.users.forEach(x => {
        x.forEach((u, j) => {
          if (u.uid === uid) {
            this.admin.push({ email: u.email, uid: u.uid });
            //console.log(this.admin[1].email);
          }
        });
      });
    });
  }

  getAdmin(): boolean {
    let a = false;
    this.admin.forEach((user, i) => {
      if (user.uid === this.authService.getUser().uid) {
        this.isAdmin = true;
        a = true;
      }
    });
    return a;
  }

  isOnlyAdmin(): boolean {
    return this.admin.length > 1
  }

  // ouvre la boîte de dialogue pour ajouter un administrateur
  addAdminDialogBox() {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: "600px",
      height: "600px",
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addAdminAfterClosedHandler(result);
    });
  }

  addAdminAfterClosedHandler(result: any) {
    let adminExists = false;
    if (result !== undefined) {
      this.project.admin.forEach(item => {
        if (item === result.uid) {
          adminExists = true;
        }
      });
      if (!adminExists) {
        this.project.admin.push(result.uid);
        this.admin.push({ uid: result.uid, email: result.email });
      } else {
        alert("This admin already exists");
      }
    }
  }

  // Supprime l'admin spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAdmin(uid: string) {
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: "250px",
      data: {
        text: "Administrator",
        response: undefined
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.project.admin.forEach((item, index) => {
          if (item === uid) {
            this.project.admin.splice(index, 1);
          }
        });
        this.admin.forEach((item, index) => {
          if (item.uid === uid) {
            this.admin.splice(index, 1);
          }
        });
      }
    });
  }

  // ouvre la boîte de dialogue pour ajouter un annotateur
  addAnnotatorDialogBox() {
    const dialogRef = this.dialog.open(AddAnnotatorComponent, {
      width: "600px",
      height: "600px",
      data: { UserId: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addAnnotatorAfterClosedHandler(result);
    });
  }

  addAnnotatorAfterClosedHandler(result: any) {
    let annotatorExists = false;
    if (result !== undefined) {
      this.project.annotators.forEach(item => {
        if (item === result.uid) {
          annotatorExists = true;
        }
      });
      if (!annotatorExists) {
        this.project.annotators.push(result.uid);
        this.annotators.push({ uid: result.uid, email: result.email });
      } else {
        alert("This annotator already exists");
      }
    }
  }

  // Supprime l'annotateur spécifié dans l'écran du projet (pas de sauvegarde dans firestore).
  deleteAnnotator(uid: string) {
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: "250px",
      data: {
        text: "Annotator",
        response: undefined
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.project.annotators.forEach((item, index) => {
          if (item === uid) {
            this.project.annotators.splice(index, 1);
          }
        });
        this.annotators.forEach((item, index) => {
          if (item.uid === uid) {
            this.annotators.splice(index, 1);
          }
        });
      }
    });
  }
}
