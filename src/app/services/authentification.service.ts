import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  user: User | undefined;
  currentUser: Map<string, String> | undefined;
  isLogged: boolean = false;
  isAdmin: boolean = false;

  private users = [
    { name: 'mohamed', password: '123', roles: ['ADMIN', 'USER'] },
    { name: 'del', password: '123', roles: ['USER'] },
    { name: 'hugo', password: '123', roles: ['USER'] },
  ];

  constructor() {
    this.currentUser = new Map<string, String>();
  }

  //save current user in localstorage
  saveCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  //check if user existe and login to order
  login(username: string, password: string) {
    if (!this.isLogged) {
      for (let u of this.users) {
        if (username == u.name && password == u.password) {
          this.user = new User(u.name, window.btoa(u.password), u.roles);
          this.saveCurrentUser(this.user);
          this.isLogged = true;

          for (let r of u.roles) {
            if (r == 'ADMIN') {
              this.isAdmin = true;
            }
          }
        }
      }
    }
  }

  getUser(): User {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return new User('', '', []);
  }

  //disconnect user
  logout() {
    localStorage.removeItem('currentUser');
    this.isLogged = false;
  }
}
