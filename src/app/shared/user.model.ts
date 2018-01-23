// structure de données utilisée pour représenter un utilisateur
/*
export class User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;

  constructor() {
  }

}
*/

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  password: string;
}
