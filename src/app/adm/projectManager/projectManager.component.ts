import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/security/auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { ProjectDataSource } from "../../data-sources/projectDataSource";
import { YesNoDialogBoxComponent } from "../../components/yes-no-dialog-box/yes-no-dialog-box.component";
import "rxjs/add/observable/of";
import { MatDialog } from "@angular/material";
import { ProjectManagerService } from "./projectManager.service";

import { Project } from "../../shared/project.model";

@Component({
  selector: "app-adm-project-manager",
  templateUrl: "./projectManager.component.html",
  styleUrls: ["./projectManager.component.scss"]
})
export class ProjectManagerComponent implements OnInit {
  displayedColumns = [];
  dataSource: ProjectDataSource | null;
  projects: Project[];
  displayedProjects: Project[];
  isConnected = false;
  idUser: string;

  searchValue: string;
  sortValue: string;
  viewValue: string;

  constructor(
    private authService: AuthService,
    public router: Router,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private pms: ProjectManagerService
  ) {}

  ngOnInit() {
    this.idUser = this.authService.currentUserId;
    this.isConnected = this.authService.isConnected();
    this.displayedColumns = ["title", "description", "actions"];
    this.dataSource = new ProjectDataSource(this.afs);

    this.searchValue = "";
    this.sortValue = "A - Z";
    this.viewValue = "simplified";

    this.dataSource.connect().subscribe(data => {
      this.viewValue = "simplified";
      this.projects = data;
      this.displayedProjects = this.projects.slice(0);
    });
  }

  modifyProject(project: any) {
    this.router.navigate(["/project", { id: project.id }]);
  }

  deleteProject(project: any) {
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: "250px",
      data: {
        text: "Project and all its data",
        response: undefined
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.pms.deleteProject(project.id);
      }
    });
  }

  updateDisplay() {
    this.displayedProjects = this.projects.slice(0);

    /* search filter */
    if (!(this.searchValue === ""))
      for (let i = this.displayedProjects.length - 1; i >= 0; i--) {
        let check = false;
        if (
          this.displayedProjects[i].title.includes(this.searchValue) ||
          this.displayedProjects[i].description.includes(this.searchValue)
        )
          check = true;
        else
          for (let j = 0; j < this.displayedProjects[i].annotators.length; j++)
            if (
              this.displayedProjects[i].annotators[j].includes(this.searchValue)
            )
              check = true;

        if (!check) this.displayedProjects.splice(i, 1);
      }

    /* sort by */
    if (this.sortValue === "A - Z")
      this.displayedProjects.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        else return 0;
      });
    else if (this.sortValue === "Z - A")
      this.displayedProjects.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        else if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        else return 0;
      });
    else if (this.sortValue === "Most annotators")
      this.displayedProjects.sort((a, b) => {
        if (a.annotators.length < b.annotators.length) return 1;
        else if (a.annotators.length > b.annotators.length) return -1;
        else return 0;
      });
  }

  changeDisplay(value: string) {
    this.viewValue = value;
  }

  isAdmin(project: any) {
    this.idUser = this.authService.currentUserId;
    for (let i = 0; i < project.admin.length; i++)
      if (this.idUser == project.admin[i]) return true;
    return false;
  }
}
