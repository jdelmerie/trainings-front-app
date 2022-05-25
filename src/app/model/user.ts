export class User {
  // id: number;
  username: string;
  password: string;
  role: Array<string>;

  constructor(username: string, password: string, role: Array<string>) {
    // this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
