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

  //à revoir après
  // getUsername() {
  //   if (this.authService.isLogged) {
  //     console.log(this.authService.getUser);
  //   }
  // }

  //check if user is connected
  isLogged(): boolean {
    return this.authService.isLogged ? true : false;
  }

  //check if user connected is admin
  isAdmin(): boolean {
    return this.authService.isAdmin ? true : false;
  }

  //to logout and redirect to form login
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
