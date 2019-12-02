/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";
import { Relation } from "../../../models/relation.model";
import { RelationType } from "../../../models/project";
import { Arc } from "../../../models";

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
  relationData: RelationData = {
    error: true,
    message: "*Warning!",
    label: "",
    type: "",
    targets: ["", ""]
  };
  relationsData: RelationData[] = [];

   /**************************************************************************************
   *    Constructor and initialisation :
   * ***********************************************************************************/
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
              label: "",
              type: this.project.relations[i].type,
              targets: [
                this.project.relations[i].args[0].targets[0],
                this.project.relations[i].args[1].targets[0]
              ]
            });
          }
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  trackBy(index, label) {
    return index;
  }

  /**************************************************************************************
   *    Relation functions :
   * ***********************************************************************************/

   // Create a new Relation in a project
  create() {
    this.ps.getProject(this.projectId).then(project => {
      // Save Project
      this.project.relations.push(JSON.parse(
        JSON.stringify(this.newRelation)
      ) as Relation);

      // Add Relation
      this.setRelationsToEntities();

      this.ps.saveProject(this.project);

      // Add new entitiesData
      this.relationsData.push({
        error: true,
        message: "*Warning!",
        label: "",
        type: this.newRelation.type,
        targets: [
          this.newRelation.args[0].targets[0],
          this.newRelation.args[1].targets[0]
        ]
      });

      // Reset entityData
      this.relationData = {
        error: true,
        message: "*Warning!",
        label: "",
        type: "",
        targets: ["", ""]
      };
    });
  }

  // Save all modification made to a Relation
  save(index: number) {
    this.ps
      .getProjectDocument(this.projectId)
      .valueChanges()
      .subscribe(data => {
        let project: Project = JSON.parse(JSON.stringify(data));

        for (let i = 0; i < project.relations.length; i++) {
          if (i != index) {
            this.project.relations[i] = project.relations[i];
          }
        }
        this.setRelationsToEntities();

        this.ps.saveProject(this.project);
      });
  }

  // Remove a relation
  remove(index: number) {
    if (
      this.project.relations.length >= 0 ||
      index < this.project.relations.length
    ) {
      this.project.relations.splice(index, 1);
    }

    this.setRelationsToEntities();

    this.ps.saveProject(this.project);
  }

  // reset all relations to their database state
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
            label: "",
            type: this.project.relations[i].type,
            targets: [
              this.project.relations[i].args[0].targets[0],
              this.project.relations[i].args[1].targets[0]
            ]
          });
        }
      });
  }

  // check if valid Relation
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

    /**************************************************************************************
   *    Entities Methods :
   * ***********************************************************************************/

  // Add the relations arguments to theirs respective entity's arcs
  setRelationsToEntities() : void {

    // Remove all arcs
    for (let i = 0; i < this.project.entities.length; i++) {
      for (let j = this.project.entities[i].arcs.length - 1; j >= 0; j--) {
        this.project.entities[i].arcs.splice(j, 1);
      }
    }

    // Add all arcs
    for (let i = 0; i < this.project.relations.length; i++) {
      for (let j = 0; j < this.project.entities.length; j++) {
        if (
          this.project.relations[i].args[0].targets[0] !=
          this.project.relations[i].args[1].targets[0]
        ) {
          for (let k = 0; k < this.project.relations[i].args.length; k++) {
            if (
              this.project.relations[i].args[k].targets[0] ===
              this.project.entities[j].type
            ) {
              let arc = new Arc();
              arc = {
                arrowHead: "triangle,5",
                color: "black",
                labels: this.project.relations[i].labels,
                dashArray: ",",
                hotkey: "T",
                type: this.project.relations[i].type,
                targets: [this.project.relations[i].args[k].targets[0]]
              };
              this.project.entities[j].arcs.push(arc);
            }
          }
        } else {
          if (
            this.project.relations[i].args[0].targets[0] ===
            this.project.entities[j].type
          ) {
            let arc = new Arc();
            arc = {
              arrowHead: "triangle,5",
              color: "black",
              labels: this.project.relations[i].labels,
              dashArray: ",",
              hotkey: "T",
              type: this.project.relations[i].type,
              targets: [this.project.relations[i].args[0].targets[0]]
            };
            this.project.entities[j].arcs.push(arc);
          }
        }
      }
    }
  }

  /**************************************************************************************
   *    Labels Methods :
   * ***********************************************************************************/

   // Add a new Label
  addLabel(relation: Relation): void {
    relation.labels.unshift("");
  }

  // Remove a label from a Relation
  removeLabel(relation: Relation, index: number): void {
    relation.labels.splice(index, 1);
  }

  // Checks if all the entity's labels are valid
  invalidLabels(relation: Relation): boolean {
    for(let i = 0; i < relation.labels.length; i++) {
      if(relation.labels[i] === "" || relation.labels[i] === null) {
        return true;
      }
    }
    return false;
  }

  // Check if a label is valid
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

  /**************************************************************************************
   *    Other Methods :
   * ***********************************************************************************/

  // Regex function to check valid Dash array
  isValidDashArray(dasharray: string): boolean {
    let regex = new RegExp("^[0-9],[0-9]$");

    if (regex.test(dasharray)) {
      return true;
    } else return false;
  }
}

export interface RelationData {
  error: boolean;
  message: string;
  label: string;
  type: string;
  targets: string[];
}
