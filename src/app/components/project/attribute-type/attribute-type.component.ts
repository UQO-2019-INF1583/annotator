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
  selector: "attribute-type",
  templateUrl: "./attribute-type.component.html",
  styleUrls: ["./attribute-type.component.scss"]
})
export class AttributeTypeComponent implements OnInit {
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
    glyph: ""
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
              glyph: ""
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
      this.ps.saveProject(this.project);

      // Reset entityData
      this.attributeData = { error: true, message: "*Warning!", glyph: "" };

      // Add new entitiesData
      this.attributesData.push({
        error: true,
        message: "*Warning!",
        glyph: ""
      });
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
      this.ps.saveProject(this.project);
    });
  }

  remove(index: number) {
    if (
      this.project.attributes.length >= 0 ||
      index < this.project.attributes.length
    ) {
      this.project.attributes.splice(index, 1);
    }
    this.ps.saveProject(this.project);
  }

  reset() {
    this.ps
      .getProjectDocument(this.projectId)
      .valueChanges()
      .subscribe(data => {
        this.project = data;
        this.attributesData = [];
        for (let i = 0; i < this.project.entities.length; i++) {
          this.attributesData.push({
            error: true,
            message: "*Warning!",
            glyph: ""
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
  error: boolean;
  message: string;
  glyph: string;
}
