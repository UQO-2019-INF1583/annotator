/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";
import {
  EntityAttributeTypes,
  EntityAttributeValues
} from "../../../models/entityAttribute.model";

/**************************************************************************************
 *    Main :
 * ***********************************************************************************/
@Component({
  selector: "entity-attribute-type",
  templateUrl: "./entity-attribute-type.component.html",
  styleUrls: ["./entity-attribute-type.component.scss"]
})
export class EntityAttributeTypeComponent implements OnInit {
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
  newAttribute: EntityAttributeTypes = new EntityAttributeTypes();
  newGlyph: String = "";
  attributeData: AttributeData = {
    error: true,
    message: "*Warning!",
    glyph: "",
    entity: "",
    oldName: ""
  };
  attributesData: AttributeData[] = [];

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

          this.attributesData = [];
          for (let i = 0; i < this.project.attributes.length; i++) {
            this.attributesData.push({
              error: true,
              message: "*Warning!",
              glyph: "",
              entity: "",
              oldName: this.project.attributes[i].type
            });
          }
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**************************************************************************************
   *    Attribute functions :
   * ***********************************************************************************/

  create() {
    this.ps.getProject(this.projectId).then(project => {
      // Save Project
      this.newAttribute.bool = this.newAttribute.type;
      this.project.attributes.push(JSON.parse(
        JSON.stringify(this.newAttribute)
      ) as EntityAttributeTypes);

      // Add Entities
      this.addAttributeToProject(this.newAttribute, this.attributeData.oldName);

      this.ps.saveProject(this.project);

      // Add new entitiesData
      this.attributesData.push({
        error: true,
        message: "*Warning!",
        glyph: "",
        entity: "",
        oldName: this.newAttribute.type
      });

      // Reset entityData
      this.attributeData = {
        error: true,
        message: "*Warning!",
        glyph: "",
        entity: "",
        oldName: ""
      };
    });
  }

  save(index: number) {
    this.ps.getProject(this.projectId).then(project => {
      for (let i = 0; i < project.attributes; i++) {
        if (i != index) {
          this.project.attributes[i] = project.attributes[i];
        } else {
          this.project.attributes[i].bool = this.project.attributes[i].type;
        }
      }

      // Remove Entities
      this.removeAttributeToProject(this.project.attributes[index], index);

      // Add Entities
      this.addAttributeToProject(
        this.project.attributes[index],
        this.attributesData[index].oldName
      );

      this.attributesData[index].oldName = this.project.attributes[index].type;

      this.ps.saveProject(this.project);
    });
  }

  remove(index: number) {
    // Remove Entities
    this.removeAllAttributeToProject(this.project.attributes[index], index);

    if (
      this.project.attributes.length >= 0 ||
      index < this.project.attributes.length
    ) {
      this.project.attributes.splice(index, 1);
      this.attributesData.splice(index, 1);
    }

    this.ps.saveProject(this.project);
  }

  addAttributeToProject(
    attribute: EntityAttributeTypes,
    oldName: string
  ): void {
    for (let i = 0; i < attribute.entities.length; i++) {
      for (let j = 0; j < this.project.entities.length; j++) {
        if (attribute.entities[i] === this.project.entities[j].type) {
          let check: boolean = true;
          for (
            let k = this.project.entities[j].attributes.length - 1;
            k >= 0;
            k--
          ) {
            if (oldName === this.project.entities[j].attributes[k]) {
              this.project.entities[j].attributes.splice(k, 1);
              continue;
            }
            if (attribute.type === this.project.entities[j].attributes[k])
              check = false;
          }
          if (check) this.project.entities[j].attributes.push(attribute.type);
        }
      }
    }
  }

  removeAttributeToProject(
    attribute: EntityAttributeTypes,
    index: number
  ): void {
    let entities: string[] = [];
    for (let i = 0; i < this.project.entities.length; i++)
      if (!attribute.entities.includes(this.project.entities[i].type))
        entities.push(this.project.entities[i].type);

    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < this.project.entities.length; j++) {
        if (entities[i] === this.project.entities[j].type) {
          let check: number = -1;
          for (let k = 0; k < this.project.entities[j].attributes.length; k++) {
            if (
              this.attributesData[index].oldName ===
              this.project.entities[j].attributes[k]
            ) {
              this.project.entities[j].attributes.splice(k, 1);
              continue;
            }
            if (
              this.attributesData[index].oldName ===
              this.project.entities[j].attributes[k]
            )
              check = k;
          }
          if (check >= 0) this.project.entities[j].attributes.splice(check, 1);
        }
      }
    }
  }

  removeAllAttributeToProject(
    attribute: EntityAttributeTypes,
    index: number
  ): void {
    for (let j = 0; j < this.project.entities.length; j++)
      for (let k = this.project.entities[j].attributes.length - 1; k >= 0; k--)
        if (
          this.attributesData[index].oldName ===
          this.project.entities[j].attributes[k]
        )
          this.project.entities[j].attributes.splice(k, 1);
  }

  reset() {
    this.ps
      .getProjectDocument(this.projectId)
      .valueChanges()
      .subscribe(data => {
        this.project = data;
        this.attributesData = [];
        for (let i = 0; i < this.project.attributes.length; i++) {
          this.attributesData.push({
            error: true,
            message: "*Warning!",
            glyph: "",
            entity: "",
            oldName: this.project.attributes[i].type
          });
        }
      });
  }

  addGlyph(attribute: EntityAttributeTypes, data: AttributeData): void {
    let g: EntityAttributeValues = new EntityAttributeValues();
    g.glyph = data.glyph;

    attribute.values.push(JSON.parse(JSON.stringify(g)));
    data.glyph = "";
  }

  removeGlyph(attribute: EntityAttributeTypes, index: number): void {
    attribute.values.splice(index, 1);
  }

  getEntities(attribute: EntityAttributeTypes) {
    let entities: string[] = [];

    for (let i = 0; i < this.project.entities.length; i++)
      if (!attribute.entities.includes(this.project.entities[i].type))
        entities.push(this.project.entities[i].type);

    return entities;
  }

  getEntitiesWithSelf(attribute: EntityAttributeTypes, index: number) {
    let entities: string[] = [];

    for (let i = 0; i < this.project.entities.length; i++)
      if (!attribute.entities.includes(this.project.entities[i].type))
        entities.push(this.project.entities[i].type);

    entities.push(attribute.entities[index]);
    return entities;
  }

  isInvalidEntity(
    attribute: EntityAttributeTypes,
    data: AttributeData
  ): boolean {
    let entities: string[] = [];

    for (let i = 0; i < this.project.entities.length; i++)
      if (!attribute.entities.includes(this.project.entities[i].type))
        entities.push(this.project.entities[i].type);

    if (!entities.includes(data.entity)) return true;
    else return false;
  }

  addEntity(attribute: EntityAttributeTypes, data: AttributeData): void {
    attribute.entities.push(data.entity);
    data.entity = "";
  }

  removeEntity(attribute: EntityAttributeTypes, index: number): void {
    attribute.entities.splice(index, 1);
  }

  trackBy(index, label) {
    return index;
  }

  isInvalidGlyph(data: AttributeData): boolean {
    if (data != null) {
      if (data.glyph === "" || data.glyph === null) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  isValid(
    attribute: EntityAttributeTypes,
    data: AttributeData,
    index: number
  ): boolean {
    // Check if every entry is valid
    data.error = true;
    if (attribute.type === "" || attribute.type === null) {
      data.message = "*Missing Type";
      return true;
    } else if (attribute.values.length === 0) {
      data.message = "*Missing Glyphs";
      return true;
    } else if (attribute.values.length > 0) {
      for (let i = 0; i < attribute.values.length; i++) {
        if (
          attribute.values[i].glyph === "" ||
          attribute.values[i].glyph === null
        ) {
          data.message = "*Invalid Glyphs";
          return true;
        }
      }
    } else if (attribute.entities.length == 0 || attribute.entities == null) {
      data.message = "*Invalid Entities";
      return true;
    }

    // Check for duplicates except for itself
    if (index >= 0) {
      for (let i = 0; i < this.project.attributes.length; i++) {
        if (i != index) {
          if (attribute.type === this.project.attributes[i].type) {
            data.message = "*Type already exist";
            return true;
          }
        }
      }
    } else {
      for (let i = 0; i < this.project.attributes.length; i++) {
        if (attribute.type === this.project.attributes[i].type) {
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

export interface AttributeData {
  oldName: string;
  error: boolean;
  message: string;
  glyph: string;
  entity: string;
}
