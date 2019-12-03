import { DataSource } from "@angular/cdk/collections";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs/Observable";
import { Role } from "../shared/user.model";

export class MembersDataSource extends DataSource<any> {
  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<any[]> {
    return this.afs
      .collection("Users", ref => ref.where("role", ">", Role.Visitor))
      .valueChanges();
  }

  disconnect(): void {}
}
