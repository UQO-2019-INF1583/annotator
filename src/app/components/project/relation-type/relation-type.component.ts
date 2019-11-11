/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";
import { Relation } from "../../../models/relation.model";

/**************************************************************************************
 *    Main :
 * ***********************************************************************************/
@Component({
  selector: "relation-type",
  templateUrl: "./relation-type.component.html",
  styleUrls: ["./relation-type.component.scss"]
})
export class RelationTypeComponent implements OnInit {
  /**************************************************************************************
   *    Variables :
   * ***********************************************************************************/
  //Firebase
  project: Project = ProjectUtils.generateEmpty();
  sub: any;

  // Project
  projectId: string;
  isConnected: boolean;

  // Create New Entity
  newRelation: Relation = new Relation();
  newLabel: String = "";
  relationData: RelationData = { error: true, message: "*Warning!", label: "" };
  relationsData: RelationData[] = [];

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

          this.relationsData = [];
          for (let i = 0; i < this.project.relations.length; i++) {
            this.relationsData.push({
              error: true,
              message: "*Warning!",
              label: ""
            });
          }
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**************************************************************************************
   *    Relation functions :
   * ***********************************************************************************/

  create() {
    this.ps.getProject(this.projectId).then(project => {
      // Save Project
      this.project.relations.push(JSON.parse(
        JSON.stringify(this.newRelation)
      ) as Relation);
      this.ps.saveProject(this.project);

      // Reset entityData
      this.relationData = { error: true, message: "*Warning!", label: "" };

      // Add new entitiesData
      this.relationsData.push({ error: true, message: "*Warning!", label: "" });
    });
  }

  save(index: number) {
    this.ps.getProject(this.projectId).then(project => {
      for (let i = 0; i < project.relations; i++) {
        if (i != index) {
          this.project.relations[i] = project.relations[i];
        }
      }
      this.ps.saveProject(this.project);
    });
  }

  remove(index: number) {
    if (
      this.project.relations.length >= 0 ||
      index < this.project.relations.length
    ) {
      this.project.relations.splice(index, 1);
    }
    this.ps.saveProject(this.project);
  }

  reset() {
    this.ps
      .getProjectDocument(this.projectId)
      .valueChanges()
      .subscribe(data => {
        this.project = data;
        this.relationsData = [];
        for (let i = 0; i < this.project.relations.length; i++) {
          this.relationsData.push({
            error: true,
            message: "*Warning!",
            label: ""
          });
        }
      });
  }

  addLabel(relation: Relation, data: RelationData): void {
    relation.labels.push(data.label);
    data.label = "";
  }

  removeLabel(relation: Relation, index: number): void {
    relation.labels.splice(index, 1);
  }

  trackBy(index, label) {
    return index;
  }

  isInvalidLabel(data: RelationData): boolean {
    if (data != null) {
      if (data.label === "" || data.label === null) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  isValidDashArray(dasharray: string): boolean {
    let regex = new RegExp("^[0-9],[0-9]$");

    if (regex.test(dasharray)) {
      return true;
    } else return false;
  }

  isValid(relation: Relation, data: RelationData, index: number): boolean {
    // Check if every entry is valid

    data.error = true;
    if (relation.type === "" || relation.type === null) {
      data.message = "*Missing Type";
      return true;
    } else if (relation.labels.length === 0) {
      data.message = "*Missing Labels";
      return true;
    } else if (relation.labels.length > 0) {
      for (let i = 0; i < relation.labels.length; i++) {
        if (relation.labels[i] === "" || relation.labels[i] === null) {
          data.message = "*Invalid Labels";
          return true;
        }
      }
    }
    if (relation.dashArray === "" || relation.dashArray === null) {
      data.message = "*Missing Dash Array";
      return true;
    } else if (!this.isValidDashArray(relation.dashArray)) {
      data.message = "*Invalid Dash Array";
      return true;
    } else if (
      relation.args[0].role === "" ||
      relation.args[0].role === null ||
      relation.args[1].role === "" ||
      relation.args[1].role === null
    ) {
      data.message = "*Missing Arg Role";
      return true;
    } else if (
      relation.args[0].targets[0] === "" ||
      relation.args[0].targets[0] === null ||
      relation.args[1].targets[0] === "" ||
      relation.args[1].targets[0] === null
    ) {
      data.message = "*Missing Arg Target";
      return true;
    }

    // Check for duplicates except for itself
    if (index >= 0) {
      for (let i = 0; i < this.project.relations.length; i++) {
        if (i != index) {
          if (relation.type === this.project.relations[i].type) {
            data.message = "*Type already exist";
            return true;
          }
        }
      }
    } else {
      for (let i = 0; i < this.project.relations.length; i++) {
        if (relation.type === this.project.relations[i].type) {
          data.message = "*Type already exist";
          return true;
        }
      }
    }

    data.message = "";
    data.error = false;
    return false;
  }
}

export interface RelationData {
  error: boolean;
  message: string;
  label: string;
}
