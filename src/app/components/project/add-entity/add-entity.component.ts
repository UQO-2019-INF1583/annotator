import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Entity } from "../../../models/entity.model";
import { availableColorsList } from "../../../models/sharedProperties.model";

@Component({
  selector: "app-add-entity",
  templateUrl: "./add-entity.component.html",
  styleUrls: ["./add-entity.component.scss"]
})
export class AddEntityComponent implements OnInit {
  availableColors: string[];
  labels: string[];

  constructor(
    public dialogRef: MatDialogRef<AddEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entity
  ) {}

  ngOnInit() {
    this.availableColors = availableColorsList;
    this.labels = [];
    this.addLabel();
  }

  addLabel() {
    this.labels.push("");
  }

  removeLabel() {
    if (this.labels.length >= 2) {
      this.labels.pop();
      this.data.labels.pop();
    }
  }
}
