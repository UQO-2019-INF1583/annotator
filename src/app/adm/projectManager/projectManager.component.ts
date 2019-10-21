import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/security/auth.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { ProjectDataSource } from "../../data-sources/projectDataSource";
import { YesNoDialogBoxComponent } from "../../components/yes-no-dialog-box/yes-no-dialog-box.component";
import "rxjs/add/observable/of";
import { MatDialog } from "@angular/material";
import { ProjectManagerService } from "./projectManager.service";
import { CreateProjectComponent } from "../../components/create-project/create-project.component";

import { Project } from "../../shared/project.model";

@Component({
  selector: "app-adm-project-manager",
  templateUrl: "./projectManager.component.html",
  styleUrls: ["./projectManager.component.scss"]
})
export class ProjectManagerComponent implements OnInit {
  displayedColumns = [];
  projectDataSource: ProjectDataSource | null;
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
    this.projectDataSource = new ProjectDataSource(this.afs);

    this.searchValue = "";
    this.sortValue = "A - Z";
    this.viewValue = "simplified";

    this.projectDataSource.connect().subscribe(data => {
      this.viewValue = "simplified";
      this.projects = data;
      this.displayedProjects = this.projects.slice(0);
    });
  }

  /*  Title : Create Project Dialog Box
      Description : Creates the dialog box for the creation of the project when "Create" button is pressed*/
  createProjectDialogBox() {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: "250px"
    });
  }

  /*  Title : Modify Project
      Description : Navigate to the specific project by pressing the corresponding "View" Button*/
  modifyProject(project: any) {
    this.router.navigate(["/project", { id: project.id }]);
  }

  /*  Title : Delete Project
      Description : Pressing the delete button opens a dialog box asking the user if they want to delete this project*/
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

  /*  Title : Update Display
      Description : Any changes made in the menu updates the project display correspondingly*/
  updateDisplay() {
    // Get all projects
    this.displayedProjects = this.projects.slice(0);

    // Search Filter : Compares the value of each project's title, description and annotators with the search input.
    // if no value matches, the project is removed from the list.
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

    // Sort by : order the project array according to the chosen sort method.
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
    else if (this.sortValue === "Least annotators")
      this.displayedProjects.sort((a, b) => {
        if (a.annotators.length > b.annotators.length) return 1;
        else if (a.annotators.length < b.annotators.length) return -1;
        else return 0;
      });
  }

  /*  Title : Change Display
      Description : Affects the value of the chosen display method either simplified or detailed*/
  changeDisplay(value: string) {
    console.log(value);
    this.viewValue = value;
  }

  /*  Title : Is Admin
      Description : Verify if the user is an admin in this project*/
  isAdmin(project: any) {
    this.idUser = this.authService.currentUserId;
    for (let i = 0; i < project.admin.length; i++)
      if (this.idUser == project.admin[i]) return true;
    return false;
  }
}
