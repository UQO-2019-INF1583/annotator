import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { DataSource } from '@angular/cdk/collections';
import { UserDataSource } from '../userDataSource.service';
import { UserManagerService } from './userManager.service';
import { Observable } from 'rxjs/Observable';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { MatDialog } from '@angular/material';
import { YesNoDialogBoxComponent } from '../../components/yes-no-dialog-box/yes-no-dialog-box.component';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-adm-user-manager',
  templateUrl: './userManager.component.html',
  styleUrls: ['./userManager.component.scss']
})

export class UserManagerComponent implements OnInit {

  displayedColumns = ['email', 'firstname', 'lastname', 'role', 'modify'];
  // Sert à dire au composant HTML le colonnes à afficher.
  // Voir https://v7.material.angular.io/components/table/overview#3-define-the-row-templates pour plus de detail
  dataSource: UserDataSource | null;

  constructor(public router: Router,
    private afs: AngularFirestore,
    private um: UserManagerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.afs);
  }
  /*
    modifyUser(user: any) {
      this.router.navigate(['/user', user]);
    }
  */

  // Modification des informations d'un utilisateur
  modifyUser(user: any) {
    // ajouter un pop up pour la modification
    let roleString: string; /* Variable qui va retenir la représentation textuelle du role
    Puisque le rôle de l'utilisateur est représenté comme entier de tel manière que :
     0 -> Visiteur
     1 -> Membre
     2 -> Administrateur
     Alors il suffit de tester user.role et d'affecter la représentation correspondante
     J'utilise un switch parceque c'est plus intuitif.

     Le but de la création de cette variable est de pouvoir la passer au constructeur
     de EditUserComponent pour que, quand il s'instanciera il affichera le rôle de l'utilisateur.
     */
    switch (user.role) {
      case 0: {
        roleString = 'Visiteur';
        break;
      }
      case 1: {
        roleString = 'Membre';
        break;
      }
      case 2: {
        roleString = 'Administrateur';
        break;
      }

    }
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px',
      height: '400px',
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        roleRepresent: roleString, // <-- On la passe comme attribut de l'objet temporaire data
        roles: [
          { valeur: 1, viewValue: 'Membre' },
          { valeur: 2, viewValue: 'Administrateur' },
          { valeur: 0, viewValue: 'Visiteur' }
        ]
      },
    });
    // Fermeture du pop up pour soumettre la modification apportée
    dialogRef.afterClosed().subscribe((result: User) => {
      console.log(result);
      if (result !== undefined) {
        if (result.firstname !== undefined &&
          result.lastname !== undefined &&
          result.email !== undefined &&
          result.role !== undefined) {
          const upd = this.um.modifyUser({
            'firstname': result.firstname,
            'lastname': result.lastname,
            'email': result.email,
            'role': result.role,
            'uid': user.uid
          });
        }
      }
    });
  }

  deleteUser(user: any) {
    // un pop up qui demande si l'administrateur veut vraiment supprimer l'utilisateur
    const dialogRef = this.dialog.open(YesNoDialogBoxComponent, {
      width: '250px',
      data: {
        text: 'User',
        response: undefined
      },
    });
    // Confirmation de la suppression
    dialogRef.afterClosed().subscribe(result => {
      if (result.response === true) {
        this.um.deleteUser(user.uid);
      }
    });
  }

}

/*
export class UserDataSource extends DataSource<any> {

  constructor(private afs: AngularFirestore) {
    super();
  }

  connect(): Observable<any[]> {
    return this.afs.collection("Users", ref => ref.orderBy('email')).valueChanges();
  }

  disconnect(): void {
  }

}
*/
