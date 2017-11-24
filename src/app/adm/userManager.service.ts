import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/user.model.ts';

// secret de la classe: structure de données utilisée pour représenter l'ensemble des utilisateurs

@Injectable()
export class UserManagerService {
  static currentUser: User = null;

  constructor() { }

  // Ajoute un nouvel utilisateur dans la base de données.
  // Retourne false si son username existe déjà.
  addUser(user: User): boolean {
  }

  // Supprime un utilisateur.
  // Retourne false si username n'existe pas.
  delUser(username: string): boolean {
  }

  // Modifie un utilisateur.
  // Retourne false si username n'existe pas.
  replaceUser(user: User): boolean {
  }

  // Vérifie si username existe.
  checkUser(username: string): boolean {
  }

}
