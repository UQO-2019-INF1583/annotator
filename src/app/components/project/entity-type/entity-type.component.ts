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
 *    Entity types
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

  // Data structure used by the DOM
  entityData: EntityData = {
    error: true,
    message: "*Warning!",
    delete: true
  };
  entitiesData: EntityData[] = [];

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

          this.entitiesData = [];
          for (let i = 0; i < this.project.entities.length; i++) {
            this.entitiesData.push({
              error: true,
              message: "*Warning!",
              delete: true
            });
          }
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // used by for loop in html
  trackBy(index, label) {
    return index;
  }

  /**************************************************************************************
   *    Entity methods :
   * ***********************************************************************************/

   // Create a new Entity
  create() : void {
    this.ps.getProject(this.projectId).then(project => {
      // Save Project
      this.project.entities.unshift(JSON.parse(
        JSON.stringify(this.newEntity)
      ) as Entity);
      this.ps.saveProject(this.project);

      // Reset entityData
      this.entityData = {
        error: true,
        message: "*Warning!",
        delete: true
      };

      // Add new entitiesData
      this.entitiesData.push({
        error: true,
        message: "*Warning!",
        delete: true
      });
    });
  }

  // Save all entity modifications
  save(index: number) : void {
    this.ps.getProject(this.projectId).then(project => {
      for (let i = 0; i < project.entities; i++) {
        if (i != index) {
          this.project.entities[i] = project.entities[i];
        }
      }
      this.ps.saveProject(this.project);
    });
  }

  // Delete an Entity
  remove(index: number) : void {
    if (
      this.project.entities.length >= 0 ||
      index < this.project.entities.length
    ) {
      this.project.entities.splice(index, 1);
    }
    this.ps.saveProject(this.project);
  }

  // Reset all entities to their database state
  reset() : void {
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
            delete: true
          });
        }
      });
  }

  // Checks if all entity's input are valid and send the corresponding message if not
  validEntity(entity: Entity, data: EntityData, index: number): boolean {
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

   /**************************************************************************************
   *    Label methods :
   * ***********************************************************************************/

  // Add a label to an entity
  addLabel(entity: Entity): void {
    entity.labels.unshift("");
  }

  // Remove a label from an entity
  removeLabel(entity: Entity, index: number): void {
    entity.labels.splice(index, 1);
  }

  // Checks if all the entity's labels are valid
  validLabels(entity: Entity): boolean {
    for(let i = 0; i < entity.labels.length; i++) {
      if(entity.labels[i] === "" || entity.labels[i] === null) {
        return true;
      }
    }
    return false;
  }

   /**************************************************************************************
   *    Relation methods :
   * ***********************************************************************************/

  // Checks if an entity is used in a relation so as to not make it deletable
  existInRelation(entity: Entity, data: EntityData): boolean {
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
}

export interface EntityData {
  error: boolean;
  delete: boolean;
  message: string;
}
