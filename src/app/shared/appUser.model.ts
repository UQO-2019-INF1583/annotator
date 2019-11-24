// Data structure to represent the user's extended features

import { User } from './user.model';

export class AppUser extends User {
  userName: string;
  firstname: string;
  lastname: string;

  constructor(userName: string = '', firstname: string = '', lastname: string = '') {
    super();
    this.userName = userName;
    this.firstname = firstname;
    this.lastname = lastname;
  }

}
