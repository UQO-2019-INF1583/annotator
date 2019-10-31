import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Event } from "../../../models/event.model";
import { availableColorsList } from "../../../models/sharedProperties.model";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  availableColors: string[];

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {}

  ngOnInit() {
    this.availableColors = availableColorsList;
  }
}
