export class User {
  // id: number;
  name: string;
  password: string;
  role: Array<string>;

  constructor(name: string, password: string, role: Array<string>) {
    // this.id = id;
    this.name = name;
    this.password = password;
    this.role = role;
  }
}
