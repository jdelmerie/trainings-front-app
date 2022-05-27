import { Component, OnInit } from '@angular/core';

import { Training } from 'src/app/model/training';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { TrainingsService } from 'src/app/services/trainings.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
  listTrainings: Training[] | undefined;
  error = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private trainingsService: TrainingsService
  ) {}

  ngOnInit(): void {
    this.getAllTrainings();
  }

  getAllTrainings() {
    this.trainingsService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  addToCart(training: Training) {
    if (training.quantity > 0) {
      this.cartService.addTraining(training);
      this.router.navigateByUrl('cart');
    }
  }
}
