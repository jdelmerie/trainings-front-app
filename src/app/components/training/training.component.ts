import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Training } from 'src/app/model/training';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TrainingsService } from 'src/app/services/trainings.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  error = null;
  myForm: FormGroup;
  training: Training | undefined;
  displayForm: boolean = false;
  status: boolean = false;
  isAdmin: boolean = false;
  title: string = 'Ajouter une formation';
  categories: Category[] | undefined;
  category: Category = new Category(0, '');

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private trainingsService: TrainingsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.myForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.authService.isAdmin) {
      this.getCategories();
      let id = this.route.snapshot.params['id'];
      if (id > 0) {
        this.status = true;
        this.title = 'Modifier cette formation';
        this.trainingsService.getOneTraining(id).subscribe({
          next: (data) => {
            this.training = data;
            this.myForm.setValue({
              id: this.training.id,
              name: this.training.name,
              description: this.training.description,
              price: this.training.price,
              category: this.training.category.id,
            });
          },
          error: (err) => (this.error = err),
        });
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onSaveTraining(myForm: FormGroup) {
    if (myForm.valid) {
      this.training = new Training(
        myForm.value.id,
        myForm.value.name,
        myForm.value.description,
        myForm.value.price,
        1,
        new Category(myForm.value.category, '')
      );
      console.log(myForm.value);
      if (this.status) {
        this.updateTraining(this.training);
      } else {
        this.addTraining(this.training);
      }
    }
  }

  addTraining(training: Training) {
    this.trainingsService.add(training).subscribe({
      next: (data) => console.log(data),
      error: (err) => (this.error = err.message),
      complete: () => this.router.navigateByUrl('admin'),
    });
  }

  updateTraining(training: Training) {
    this.trainingsService.update(training).subscribe({
      next: (data) => console.log(data),
      error: (err) => (this.error = err.message),
      complete: () => this.router.navigateByUrl('admin'),
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  getOneCategory(id: number) {
    this.categoriesService.getOneCategory(id).subscribe({
      next: (data) => (this.category = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}
