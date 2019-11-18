/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";
import { Entity } from "../../../models/entity.model";

/**************************************************************************************
 *    Main :
 * ***********************************************************************************/
@Component({
  selector: "entity-type",
  templateUrl: "./entity-type.component.html",
  styleUrls: ["./entity-type.component.scss"]
})
export class EntityTypeComponent implements OnInit {
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
  newEntity: Entity = new Entity();
  newLabel: String = "";
  entityData: EntityData = {
    error: true,
    message: "*Warning!",
    label: "",
    delete: true
  };
  entitiesData: EntityData[] = [];

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

          this.entitiesData = [];
          for (let i = 0; i < this.project.entities.length; i++) {
            this.entitiesData.push({
              error: true,
              message: "*Warning!",
              label: "",
              delete: true
            });
          }
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**************************************************************************************
   *    Entity functions :
   * ***********************************************************************************/

  create() {
    this.ps.getProject(this.projectId).then(project => {
      // Save Project
      this.project.entities.push(JSON.parse(
        JSON.stringify(this.newEntity)
      ) as Entity);
      this.ps.saveProject(this.project);

      // Reset entityData
      this.entityData = {
        error: true,
        message: "*Warning!",
        label: "",
        delete: true
      };

      // Add new entitiesData
      this.entitiesData.push({
        error: true,
        message: "*Warning!",
        label: "",
        delete: true
      });
    });
  }

  save(index: number) {
    this.ps.getProject(this.projectId).then(project => {
      for (let i = 0; i < project.entities; i++) {
        if (i != index) {
          this.project.entities[i] = project.entities[i];
        }
      }
      this.ps.saveProject(this.project);
    });
  }

  remove(index: number) {
    if (
      this.project.entities.length >= 0 ||
      index < this.project.entities.length
    ) {
      this.project.entities.splice(index, 1);
    }
    this.ps.saveProject(this.project);
  }

  reset() {
    this.ps
      .getProjectDocument(this.projectId)
      .valueChanges()
      .subscribe(data => {
        this.project = data;
        this.entitiesData = [];
        for (let i = 0; i < this.project.entities.length; i++) {
          this.entitiesData.push({
            error: true,
            message: "*Warning!",
            label: "",
            delete: true
          });
        }
      });
  }

  addLabel(entity: Entity, data: EntityData): void {
    entity.labels.push(data.label);
    data.label = "";
  }

  removeLabel(entity: Entity, index: number): void {
    entity.labels.splice(index, 1);
  }

  trackBy(index, label) {
    return index;
  }

  isInvalidLabel(data: EntityData): boolean {
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

  isRelated(entity: Entity, data: EntityData): boolean {
    // check if the entity is used by a relation
    for (let i = 0; i < this.project.relations.length; i++) {
      for (let j = 0; j < this.project.relations[i].args.length; j++) {
        if (this.project.relations[i].args[j].targets[0] == entity.type) {
          data.message = "*Entity is used in a relation";
          data.delete = true;
          return true;
        }
      }
    }

    // Check if entity is used by an event
    data.message = "";
    data.delete = false;
    return false;
  }

  isValid(entity: Entity, data: EntityData, index: number): boolean {
    // Check if every entry is valid
    data.error = true;
    if (entity.type === "" || entity.type === null) {
      data.message = "*Missing Type";
      return true;
    } else if (entity.labels.length === 0) {
      data.message = "*Missing Labels";
      return true;
    } else if (entity.labels.length > 0) {
      for (let i = 0; i < entity.labels.length; i++) {
        if (entity.labels[i] === "" || entity.labels[i] === null) {
          data.message = "*Invalid Labels";
          return true;
        }
      }
    }
    if (entity.bgColor === "" || entity.bgColor === null) {
      data.message = "*Missing Background Color";
      return true;
    } else if (entity.borderColor === "" || entity.borderColor === null) {
      data.message = "*Missing Border Color";
      return true;
    }

    // Check for duplicates except for itself
    if (index >= 0) {
      for (let i = 0; i < this.project.entities.length; i++) {
        if (i != index) {
          if (entity.type === this.project.entities[i].type) {
            data.message = "*Type already exist";
            return true;
          } else if (entity.bgColor === this.project.entities[i].bgColor) {
            data.message = "*Background color already exist";
            return true;
          } else if (
            entity.borderColor === this.project.entities[i].borderColor
          ) {
            data.message = "*Border color already exist";
            return true;
          }
        }
      }
    } else {
      for (let i = 0; i < this.project.entities.length; i++) {
        if (entity.type === this.project.entities[i].type) {
          data.message = "*Type already exist";
          return true;
        } else if (entity.bgColor === this.project.entities[i].bgColor) {
          data.message = "*Background color already exist";
          return true;
        } else if (
          entity.borderColor === this.project.entities[i].borderColor
        ) {
          data.message = "*Border color already exist";
          return true;
        }
      }
    }

    data.message = "";
    data.error = false;
    return false;
  }
}

export interface EntityData {
  error: boolean;
  delete: boolean;
  message: string;
  label: string;
}
