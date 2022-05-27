import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'trainings-front-app';

  username: string = '';

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  getUsername() {
    // if (this.authService.isLogged) {
    //   console.log(this.authService.getUser);
    // }
  }

  isLogged(): boolean {
    return this.authService.isLogged ? true : false;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin ? true : false;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
