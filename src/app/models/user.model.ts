// structure de données utilisée pour représenter un utilisateur

export const enum Role {
  Visitor,
  Member,
  Adm
}

export class User {
  uid: string;
  email: string;
  displayName?: string;
  password: string;
  role?: Role = Role.Visitor;

  username?: string;
  firstname?: string;
  lastname?: string;

  constructor(
    uid: string = "",
    email: string = "",
    displayName: string = "",
    password: string = "",
    role: Role = Role.Visitor,

    username: string = "",
    firstname: string = "",
    lastname: string = ""
  ) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.password = password;
    this.role = Role.Visitor;

    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
