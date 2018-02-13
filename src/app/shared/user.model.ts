// structure de données utilisée pour représenter un utilisateur

export class User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  password: string;

  username?: string;
  firstname?: string;
  lastname?: string;

  constructor(username: string, firstname: string,
  lastname: string,
  password: string,
  email: string) {this.username = username}

}
/*

export interface User {
  uuid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  password: string;

  constructor(username: string,
  firstname: string,
  lastname: string,
  password: string,
  email: string): void;
}
*/
