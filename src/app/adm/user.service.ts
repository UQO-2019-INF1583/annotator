import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

// secret de la classe: structure de données utilisée pour représenter un utilisateur

@Injectable()
export class userService {

  constructor() { }

  // Ajoute un nouvel utilisateur dans la base de données
  addUser(username: string,
          firstname: string,
          lastname: string,
          password: string,
          email: string) : boolean {
  }


  // Modifie le courriel d'un utilisateur
  modifyUser(username: string,
             email: string) : boolean {
  }

  // Modifie le mot de passe d'un utilisateur
  modifyUser(username: string,
             password: string) : boolean {
  }

  // Supprime un utilisateur
  delUser(username: string) : boolean {
  }

  // Vérifie si username existe
  checkUser(username: string): boolean {
  }
}