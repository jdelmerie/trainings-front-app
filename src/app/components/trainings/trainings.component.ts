import { Component, OnInit } from '@angular/core';

import { Training } from 'src/app/model/training'; // import de la class
import { CartService } from 'src/app/services/cart.service'; //import de la dépendance
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
  listTrainings: Training[] | undefined;

  constructor(private cartService: CartService, private router:Router) {}

  ngOnInit(): void {
    this.listTrainings = [
      {
        id: 1,
        name: 'Java',
        description: 'Formation Java SE 8 sur 5 jours',
        price: 1500,
        quantity: 1,
      },
      {
        id: 2,
        name: 'DotNet',
        description: 'Formation DotNet sur 3 jours',
        price: 1000,
        quantity: 1,
      },
      {
        id: 3,
        name: 'Python',
        description: 'Formation Python/Django sur 5 jours',
        price: 1500,
        quantity: 1,
      },
    ];
  }

  addToCart(training: Training) {
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart')
  }
}
