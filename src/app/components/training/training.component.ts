import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Training } from 'src/app/model/training';
import { AuthentificationService } from 'src/app/services/authentification.service';
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

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private trainingsService: TrainingsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.myForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    if (this.authService.isAdmin){
       let id = this.route.snapshot.params['id'];
       if (id > 0) {
         this.status = true;
         this.trainingsService.getOneTraining(id).subscribe({
           next: (data) => {
             this.training = data;
             this.myForm.setValue({
               id: this.training.id,
               name: this.training.name,
               description: this.training.description,
               price: this.training.price,
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
        0,
        myForm.value.name,
        myForm.value.description,
        myForm.value.price,
        1,
        new Category(0, '')
      );
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
}
