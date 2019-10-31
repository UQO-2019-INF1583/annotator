export class EntityType {
  type: string; // Name of the entity type. ex : "Person"
  labels: string[]; // All possible labels for the entity type that will show on the Brat interface. ex : ["Person", "Per"]
  bgColor: string; // Color of the label on the Brat interface. ex : "#7fa2ff"
  borderColor: string; // Color of the border of the label on the Brat interface. ex : "darken"

  constructor(
    type: string = "",
    labels: string[] = [],
    bgColor: string = "",
    borderColor: string = "darken"
  ) {
    this.type = type;
    this.labels = labels;
    this.bgColor = bgColor;
    this.borderColor = borderColor;
  }
}
