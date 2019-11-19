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

  /**************************************************************************************
   *    Relation functions :
   * ***********************************************************************************/

  create() {
    this.ps.getProject(this.projectId).then(project => {
      // Save Project
      this.project.relations.push(JSON.parse(
        JSON.stringify(this.newRelation)
      ) as Relation);

      // Add Relation
      this.addRelationToProject(this.newRelation, this.relationData);

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

  save(index: number) {
    this.ps.getProject(this.projectId).then(project => {
      for (let i = 0; i < project.relations; i++) {
        if (i != index) {
          this.project.relations[i] = project.relations[i];
        }
      }

      // Remove Relation
      this.removeRelationToProject(
        this.project.relations[index],
        this.relationsData[index]
      );

      // Add Relation
      this.addRelationToProject(
        this.project.relations[index],
        this.relationsData[index]
      );

      this.relationsData[index].type = this.project.relations[index].type;
      this.relationsData[index].targets[0] = this.project.relations[
        index
      ].args[0].targets[0];
      this.relationsData[index].targets[1] = this.project.relations[
        index
      ].args[1].targets[0];

      this.ps.saveProject(this.project);
    });
  }

  remove(index: number) {
    this.removeAllRelationToProject(this.project.relations[index], index);

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

  addRelationToProject(relation: RelationType, data: RelationData): void {
    if (relation.args[1].targets[0] != relation.args[0].targets[0]) {
      for (let i = 0; i < relation.args.length; i++) {
        for (let j = 0; j < this.project.entities.length; j++) {
          if (relation.args[i].targets[0] === this.project.entities[j].type) {
            let check: boolean = true;
            for (
              let k = this.project.entities[j].arcs.length - 1;
              k >= 0;
              k--
            ) {
              if (
                data.targets[i] ===
                  this.project.entities[j].arcs[k].targets[0] &&
                data.type === this.project.entities[j].arcs[k].type
              ) {
                this.project.entities[j].arcs.splice(k, 1);
                continue;
              }
              if (relation.type === this.project.entities[j].arcs[k].targets[0])
                check = false;
            }
            if (check) {
              let arc = new Arc();
              arc = {
                arrowHead: "triangle,5",
                color: "black",
                labels: relation.labels,
                dashArray: ",",
                hotkey: "T",
                type: relation.type,
                targets: [relation.args[i].targets[0]]
              };
              this.project.entities[j].arcs.push(arc);
            }
          }
        }
      }
    } else if (relation.args[1].targets[0] == relation.args[0].targets[0]) {
      for (let j = 0; j < this.project.entities.length; j++) {
        if (relation.args[0].targets[0] === this.project.entities[j].type) {
          let check: boolean = true;
          for (let k = this.project.entities[j].arcs.length - 1; k >= 0; k--) {
            if (
              data.targets[0] === this.project.entities[j].arcs[k].targets[0] ||
              data.targets[1] === this.project.entities[j].arcs[k].targets[0]
            ) {
              this.project.entities[j].arcs.splice(k, 1);
              continue;
            }
            if (relation.type === this.project.entities[j].arcs[k].targets[0])
              check = false;
          }
          if (check) {
            let arc = new Arc();
            arc = {
              arrowHead: "triangle,5",
              color: "black",
              labels: relation.labels,
              dashArray: ",",
              hotkey: "T",
              type: relation.type,
              targets: [relation.args[0].targets[0]]
            };
            this.project.entities[j].arcs.push(arc);
          }
        }
      }
    }
  }

  removeRelationToProject(relation: RelationType, data: RelationData): void {
    let relations: string[] = [];
    for (let i = 0; i < this.project.entities.length; i++)
      if (
        !(
          this.project.entities[i].type == relation.args[0].targets[0] ||
          this.project.entities[i].type == relation.args[1].targets[0]
        )
      )
        relations.push(this.project.entities[i].type);

    for (let i = 0; i < relations.length; i++) {
      for (let j = 0; j < this.project.entities.length; j++) {
        if (relations[i] === this.project.entities[j].type) {
          let check: number = -1;
          for (let k = this.project.entities[j].arcs.length - 1; k >= 0; k--) {
            if (
              data.targets[0] === this.project.entities[j].arcs[k].targets[0] ||
              data.targets[1] === this.project.entities[j].arcs[k].targets[0]
            ) {
              this.project.entities[j].arcs.splice(k, 1);
              continue;
            }
            if (
              data.targets[0] === this.project.entities[j].arcs[k].targets[0] ||
              data.targets[1] === this.project.entities[j].arcs[k].targets[0]
            )
              check = k;
          }
          if (check >= 0) this.project.entities[j].arcs.splice(check, 1);
        }
      }
    }
  }

  removeAllRelationToProject(relation: RelationType, index: number): void {
    for (let j = 0; j < this.project.entities.length; j++) {
      for (let k = this.project.entities[j].arcs.length - 1; k >= 0; k--) {
        if (
          this.relationsData[index].targets[0] ===
          this.project.entities[j].arcs[k].targets[0]
        )
          this.project.entities[j].arcs.splice(k, 1);
        else if (
          this.relationsData[index].targets[1] ===
          this.project.entities[j].arcs[k].targets[0]
        )
          this.project.entities[j].arcs.splice(k, 1);
      }
    }
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
  type: string;
  targets: string[];
}
