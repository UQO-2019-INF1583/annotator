/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";
import { Observable } from "rxjs/Observable";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";

import { User } from "./../../../models/user.model";
import { ProjectState, StateEnum } from "../../../models/state.model";

/**************************************************************************************
 *    Main :
 * ***********************************************************************************/
@Component({
  selector: "project-information",
  templateUrl: "./project-information.component.html",
  styleUrls: ["./project-information.component.scss"]
})
export class ProjectInformationComponent implements OnInit {
  /**************************************************************************************
   *    Variables :
   * ***********************************************************************************/
  //Firebase
  project: Project = ProjectUtils.generateEmpty();
  sub: any;

  // Project
  projectId: string;
  isConnected: boolean;
  isAdmin: boolean = false;

  users: Observable<User[]>;
  annotators: any[] = []; // {uid: v1, email: v2}[]
  admin: any[] = []; // {uid: v1, email: v2}[]

  //used to display all the choices of states
  states = [
    new ProjectState(0, "New project"),
    new ProjectState(1, "In progress"),
    new ProjectState(2, "Review"),
    new ProjectState(3, "Finish")
  ];

  constructor(
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private ps: ProjectService
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

  save() {
    this.ps.getProject(this.projectId).then(project => {
      if (
        this.project.title != null &&
        this.project.title !== "" &&
        this.project.description != null &&
        this.project.description !== "" &&
        this.project.state > -1 && //this makes sure that a value is associated with a state
        this.project.state < this.states.length
      ) {
        this.ps.saveProject(this.project);
      }
    });
  }

  reset() {
    this.ps
      .getProjectDocument(this.projectId)
      .valueChanges()
      .subscribe(data => {
        this.project = data;
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
}
