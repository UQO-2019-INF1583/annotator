import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

// secret de la classe: structure de données utilisée pour représenter un utilisateur

@Injectable()
export class userService {

  constructor() { }

  // Ajoute un nouvel utilisateur dans la base de données.
  // Retourne false si username déjà existe.
  addUser(username: string,
          firstname: string,
          lastname: string,
          password: string,
          email: string) : boolean {
  }


  // Modifie le courriel d'un utilisateur.
  // Retourne false si username n'existe pas.
  modifyUser(username: string, email: string) : boolean {
  }

  // Modifie le mot de passe d'un utilisateur.
  // Retourne false si username n'existe pas.
  modifyPassword(username: string, password: string) : boolean {
  }

  // Supprime un utilisateur.
  // Retourne false si username n'existe pas.
  delUser(username: string) : boolean {
  }

  // Vérifie si username existe.
  checkUser(username: string): boolean {
  }
}