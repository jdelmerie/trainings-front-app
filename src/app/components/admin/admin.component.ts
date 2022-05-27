import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { TrainingsService } from 'src/app/services/trainings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  listTrainings: Training[] | undefined;
  error = null;
  myForm: FormGroup;
  training: Training | undefined;
  displayForm: boolean = false;
  typeForm: string = '';

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private trainingsService: TrainingsService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllTrainings();
    if (!this.authService.isAdmin) {
      this.router.navigateByUrl('');
    }
  }

  getAllTrainings() {
    this.trainingsService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  onSaveTraining(myForm: FormGroup) {
    if (myForm.valid) {
      this.training = new Training(
        0,
        myForm.value.name,
        myForm.value.description,
        myForm.value.price
      );
      this.addTraining(this.training);
    }
  }

  addTraining(training: Training) {
    this.trainingsService.add(training).subscribe((data) => {
      training = data;
    });
  }

  deleteTraining(training: Training) {
    this.trainingsService.deleteTr(training).subscribe((data) => {
      alert('Formation supprimée');
      //TODO : confirmation message
    });
  }

  //à revoir
  updateTraining(tr: Training) {
    this.trainingsService.getOneTraining(tr).subscribe((data) => {
      this.training = data;
    });
    this.myForm = this.formBuilder.group({
      name: [this.training?.name, [Validators.required]],
      description: [this.training?.description, [Validators.required]],
      price: [this.training?.price, [Validators.required]],
    });
  }

  // displayFormOnClick() {
  //   this.displayForm = this.displayForm ? false : true;
  // }
}
