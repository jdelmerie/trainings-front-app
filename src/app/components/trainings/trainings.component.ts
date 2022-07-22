import { Component, OnInit } from '@angular/core';

import { Training } from 'src/app/model/training';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from 'src/app/services/trainings.service';
import { Category } from 'src/app/model/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
  listTrainings: Training[] | undefined;
  categories: Category[] | undefined;
  error = null;
  title: string = '';
  catLink:number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private trainingsService: TrainingsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getAllTrainings();
    this.getCategories();
  }

  getByCategories(id: number) {
    this.catLink = id;
    this.trainingsService.getByCategories(id).subscribe({
      next: (data) => (this.listTrainings = data, this.title = 'Catégorie : ' + data[0].category.name),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  getAllTrainings() {
    this.catLink = 0;
    this.trainingsService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.title = 'Toutes les formations';
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => (this.categories = data),
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
