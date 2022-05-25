import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  fakeUsername: string = 'del';
  fakePassword: string = '123';
  user: User | undefined;
  currentUser: Map<string, String> | undefined;
  isLogged: boolean = false;

  private users = [
    { username: 'mohamed', password: '1234', roles: ['ADMIN', 'USER'] },
    { username: 'del', password: '123', roles: ['USER'] },
    { username: 'hugo', password: '1234', roles: ['USER'] },
  ];

  constructor() {
    this.currentUser = new Map<string, String>();
  }

  //save current user in localstorage
  saveCurrentUser(user: User) {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ username: user.username, role: user.role[0] })
    );
  }

  login(username: string, password: string) {
    // for (let u of this.users) {
    //   if (username == u.username && password == u.password) {
    //     this.user = new User(u.username, u.password, u.roles);
    //     this.isLogged = true;
    //   } else {
    //     this.user = new User('unknown', '', []);
    //     this.isLogged = false;
    //   }
    //   this.saveCurrentUser(this.user);
    //   console.log(this.getCurrentUser() + " log : " + this.isLogged);
    // }

    if (username == 'delddddddddddd' && password == '123') {
      this.user = new User(username, password, ['USER']);
      this.isLogged = true;
    } else {
      this.user = new User('unknown', '', []);
    }
    this.saveCurrentUser(this.user);
    console.log(this.getCurrentUser() + ' log : ' + this.isLogged);
  }

  getCurrentUser() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
  }

  getUser() {
    return this.user;
  }
}
