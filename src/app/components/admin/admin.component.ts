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
  isAdmin: boolean = false;

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
    if (localStorage.getItem('userConnected') != null) {
      console.log('peut se connecter');
      this.isAdmin = true;
    } else {
      console.log('doit se login');
    }

    this.getAllTrainings();
    if (!this.authService.isAdmin) {
      this.router.navigateByUrl('/login');
    }
  }

  getAllTrainings() {
    this.trainingsService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  deleteTraining(id: number) {
    if (confirm('Vous êtes sur de vouloir supprimer cette formation ?')) {
      this.trainingsService.deleteTr(id).subscribe({
        next: (data) => console.log(data),
        error: (err) => (this.error = err.message),
        complete: () => this.getAllTrainings(),
      });
      console.log(id);
    }
  }

  onUpdateTraining(training: Training) {
    this.router.navigateByUrl('training/' + training.id);
  }
}
