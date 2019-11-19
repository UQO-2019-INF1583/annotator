/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";
import { Observable } from "rxjs/Observable";
import { MatDialog } from "@angular/material";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";

import { AddCorpusComponent } from "./../add-corpus/add-corpus.component";
import { YesNoDialogBoxComponent } from "./../yes-no-dialog-box/yes-no-dialog-box.component";
import { User } from "./../../../models/user.model";

/**************************************************************************************
 *    Main :
 * ***********************************************************************************/
@Component({
  selector: "corpus",
  templateUrl: "./corpus.component.html",
  styleUrls: ["./corpus.component.scss"]
})
export class CorpusComponent implements OnInit {
  /**************************************************************************************
   *    Variables :
   * ***********************************************************************************/
  //Firebase
  project: Project = ProjectUtils.generateEmpty();
  sub: any;

  // Project
  projectId: string;
  isConnected: boolean;
  isAdmin: boolean;

  corpus: Observable<any[]>;
  users: Observable<User[]>;
  annotators: any[] = []; // {uid: v1, email: v2}[]
  admin: any[] = []; // {uid: v1, email: v2}[]

  constructor(
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private ps: ProjectService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.isConnected = this.authService.isConnected();
    this.sub = this.activeRouter.params.subscribe(params => {
      this.projectId = params.id;
      this.ps
        .getProjectDocument(this.projectId)
        .valueChanges()
        .subscribe(data => {
          this.project = data;
          this.corpus = this.ps.getCorpus(this.project.id);

          if (this.isConnected) {
            this.users = this.ps.getUsers();
            this.getAnnotatorEmail();
            this.getAdminEmail();
            this.getAdmin();
          }
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**************************************************************************************
   *    Project functions :
   * ***********************************************************************************/

  // ouvre la boîte de dialogue pour ajouter un corpus
  addCorpusDialogBox() {
    const dialogRef = this.dialog.open(AddCorpusComponent, {
      width: "250px",
      data: { corpusTitle: undefined, corpusFile: undefined }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (
          result.corpusTitle !== undefined &&
          result.corpusFile !== undefined
        ) {
          // est-ce qu'il y a une validation ici a faire? (titre du fichier déjà existant?)
          this.ps.addCorpus(result, this.project.id);
        }
      }
    });
  }

  // Supprime un texte
  deleteCorpus(corpus: any) {
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: "250px",
      data: {
        text: "Corpus",
        response: undefined
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.ps.deleteCorpus(corpus.id, corpus.title);
      }
    });
  }

  getAnnotatorEmail() {
    this.annotators = [];
    this.project.annotators.forEach((uid, i) => {
      this.users.forEach(x => {
        x.forEach((u, j) => {
          if (u.uid === uid) {
            this.annotators.push({ email: u.email, uid: u.uid });
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

  // Événement lorsqu'un texte est sélectionné
  documentSelected(doc: any) {
    doc.projectTitle = this.project.title;
    console.log(doc);
    this.router.navigate(["/annotation", doc]);
  }
}
