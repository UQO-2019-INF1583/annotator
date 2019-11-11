/**************************************************************************************
 *    Imports :
 * ***********************************************************************************/
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../tools/security/auth.service";

import { Project, ProjectUtils } from "../../../models/project.model";
import { ProjectService } from "../../../services/project/project.service";
import { Event } from "../../../models/event.model";
import { Arc } from "../../../models";

/**************************************************************************************
 *    Main :
 * ***********************************************************************************/
@Component({
  selector: "event-type",
  templateUrl: "./event-type.component.html",
  styleUrls: ["./event-type.component.scss"]
})
export class EventTypeComponent implements OnInit {
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
  newEvent: Event = new Event();
  eventData: EventData = {
    error: true,
    message: "*Warning!",
    label: "",
    newArc: new Arc(),
    newLabel: "",
    arcLabels: []
  };
  eventsData: EventData[] = [];

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

          this.eventsData = [];
          for (let i = 0; i < this.project.events.length; i++) {
            let arcLabels = [];
            for (let j = 0; j < this.project.events[i].arcs.length; j++)
              arcLabels.push("");

            this.eventsData.push({
              error: true,
              message: "*Warning!",
              label: "",
              newArc: new Arc(),
              newLabel: "",
              arcLabels: arcLabels.slice()
            });
          }
        });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**************************************************************************************
   *    Event functions :
   * ***********************************************************************************/

  create() {
    this.ps.getProject(this.projectId).then(project => {
      // Save Project
      this.project.events.push(JSON.parse(
        JSON.stringify(this.newEvent)
      ) as Event);
      this.ps.saveProject(this.project);

      // Reset eventType
      this.eventData = {
        error: true,
        message: "*Warning!",
        label: "",
        newArc: new Arc(),
        newLabel: "",
        arcLabels: []
      };

      // Add new eventsData
      this.eventsData.push({
        error: true,
        message: "*Warning!",
        label: "",
        newArc: new Arc(),
        newLabel: "",
        arcLabels: []
      });

      for (
        let i = 0;
        i < this.project.events[this.project.events.length - 1].arcs.length;
        i++
      )
        this.eventsData[this.project.events.length - 1].arcLabels.push("");
    });
  }

  save(index: number) {
    this.ps.getProject(this.projectId).then(project => {
      for (let i = 0; i < project.events; i++) {
        if (i != index) {
          this.project.events[i] = project.events[i];
        }
      }
      this.ps.saveProject(this.project);
    });
  }

  remove(index: number) {
    if (this.project.events.length >= 0 || index < this.project.events.length) {
      this.project.events.splice(index, 1);
    }
    this.ps.saveProject(this.project);
  }

  reset() {
    this.ps
      .getProjectDocument(this.projectId)
      .valueChanges()
      .subscribe(data => {
        this.project = data;

        this.eventsData = [];
        for (let i = 0; i < this.project.events.length; i++) {
          let arcLabels = [];
          for (let j = 0; j < this.project.events[i].arcs.length; j++)
            arcLabels.push("");

          this.eventsData.push({
            error: true,
            message: "*Warning!",
            label: "",
            newArc: new Arc(),
            newLabel: "",
            arcLabels: arcLabels.slice()
          });
        }
      });
  }

  // Labels
  addLabel(event: Event, data: EventData): void {
    event.labels.push(data.label);
    data.label = "";
  }

  removeLabel(event: Event, index: number): void {
    event.labels.splice(index, 1);
  }

  isInvalidLabel(data: EventData): boolean {
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

  // Arc
  addArc(event: Event, data: EventData): void {
    event.arcs.push(data.newArc);
    data.newArc = new Arc();
  }

  removeArc(event: Event, index: number): void {
    event.arcs.splice(index, 1);
  }

  isInvalidArc(arc: Arc): boolean {
    if (arc != null) {
      if (arc.type === "" || arc.type === null) return true;
      else if (arc.color === "" || arc.color === null) return true;
      else if (arc.labels === null) return true;
      else if (arc.labels.length === 0) return true;
      for (let i = 0; i < arc.labels.length; i++)
        if (arc.labels[i] === "" || arc.labels[i] === null) return true;

      return false;
    } else {
      return true;
    }
  }

  // Arc Labels
  addArcLabel(arc: Arc, data: EventData, index: number): void {
    arc.labels.push(data.arcLabels[index]);
    data.arcLabels[index] = "";
  }

  addArcNewLabel(data: EventData): void {
    data.newArc.labels.push(data.newLabel);
    data.newLabel = "";
  }

  removeArcLabel(arc: Arc, data: EventData, index: number): void {
    arc.labels.splice(index, 1);
    data.arcLabels.splice(index, 1);
  }

  isValid(event: Event, data: EventData, index: number): boolean {
    // Check if every entry is valid

    data.error = true;
    if (event.type === "" || event.type === null) {
      data.message = "*Missing Type";
      return true;
    } else if (event.labels.length === 0) {
      data.message = "*Missing Labels";
      return true;
    } else if (event.labels.length > 0) {
      for (let i = 0; i < event.labels.length; i++) {
        if (event.labels[i] === "" || event.labels[i] === null) {
          data.message = "*Invalid Labels";
          return true;
        }
      }
    }
    if (event.bgColor === "" || event.bgColor === null) {
      data.message = "*Missing Background Color";
      return true;
    } else if (event.borderColor === "" || event.borderColor === null) {
      data.message = "*Missing Border Color";
      return true;
    } else if (event.arcs.length === 0) {
      data.message = "*Missing Arcs";
      return true;
    } else if (event.arcs.length > 0) {
      for (let i = 0; i < event.arcs.length; i++) {
        if (event.arcs[i].type === "" || event.arcs[i].type === null) {
          data.message = "*Invalid Arcs Type";
          return true;
        } else if (event.arcs[i].color === "" || event.arcs[i].color === null) {
          data.message = "*Invalid Arcs Color";
          return true;
        } else {
          for (let j = 0; j < event.arcs[i].labels.length; j++) {
            if (
              event.arcs[i].labels[j] === "" ||
              event.arcs[i].labels[j] === null
            ) {
              data.message = "*Missing Labels";
              return true;
            }
          }
        }
      }
    }

    // Check for duplicates except for itself
    /*
    if (index >= 0) {
      for (let i = 0; i < this.project.events.length; i++) {
        if (i != index) {
          if (relation.type === this.project.events[i].type) {
            data.message = "*Type already exist";
            return true;
          }
        }
      }
    } else {
      for (let i = 0; i < this.project.events.length; i++) {
        if (relation.type === this.project.events[i].type) {
          data.message = "*Type already exist";
          return true;
        }
      }
    }
    */

    data.message = "";
    data.error = false;
    return false;
  }

  trackBy(index, label) {
    return index;
  }
}

export interface EventData {
  error: boolean;
  message: string;
  label: string;

  newArc: Arc; // New Arc being created
  newLabel: string; // New Label to be added to the new Arc
  arcLabels: string[]; // New Labels to added to existing Arcs
}
